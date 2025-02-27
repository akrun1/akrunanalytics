import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from datetime import datetime, timedelta
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/bitcoin/predict', methods=['GET'])
def predict_bitcoin():
    try:
        # Get forecast period from query param (default 30 days)
        forecast_period = int(request.args.get('days', 30))
        
        # Download Historical Data
        end_date = datetime.today()
        start_date = end_date - timedelta(days=5*365)  # approx. 5 years
        df = yf.download('BTC-USD', start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
        
        # Use the 'Close' column as our time series
        data = df[['Close']].copy()
        
        # Data Preprocessing
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(data)
        
        # We'll use 80% of the data for training
        training_data_len = int(np.ceil(len(scaled_data) * 0.8))
        train_data = scaled_data[0:training_data_len, :]
        
        # Create the dataset with a sliding window
        look_back = 60  # number of past days used for prediction
        
        def create_dataset(dataset, look_back=60):
            X, y = [], []
            for i in range(look_back, len(dataset)):
                X.append(dataset[i - look_back:i, 0])
                y.append(dataset[i, 0])
            return np.array(X), np.array(y)
        
        X_train, y_train = create_dataset(train_data, look_back)
        X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
        
        # Build and Train the LSTM Model
        model = Sequential()
        model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
        model.add(LSTM(50, return_sequences=False))
        model.add(Dense(25))
        model.add(Dense(1))
        
        model.compile(optimizer='adam', loss='mean_squared_error')
        
        # Train the model
        model.fit(X_train, y_train, batch_size=64, epochs=10, verbose=0)
        
        # Create validation data
        test_data = scaled_data[training_data_len - look_back:, :]
        X_test, y_test = create_dataset(test_data, look_back)
        X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
        
        # Make predictions on the test set
        predictions = model.predict(X_test)
        predictions = scaler.inverse_transform(predictions)
        
        # Forecast Future Prices
        last_sequence = scaled_data[-look_back:]
        forecast = []
        current_sequence = last_sequence.copy()
        
        # Iteratively predict each day
        for _ in range(forecast_period):
            current_sequence_reshaped = np.reshape(current_sequence, (1, look_back, 1))
            pred = model.predict(current_sequence_reshaped)
            forecast.append(pred[0, 0])
            current_sequence = np.append(current_sequence[1:], [[pred[0, 0]]], axis=0)
        
        # Inverse transform the forecasted values
        forecast = scaler.inverse_transform(np.array(forecast).reshape(-1, 1))
        
        # Create date range for forecast
        last_date = data.index[-1]
        forecast_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=forecast_period)
        
        # Prepare response data
        historical_data = []
        for date, price in zip(data.index, data['Close'].values):
            historical_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'price': float(price)
            })
        
        validation_data = []
        valid_dates = data.index[training_data_len:]
        for date, actual, predicted in zip(valid_dates, data['Close'].values[training_data_len:], predictions):
            validation_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'actual': float(actual),
                'predicted': float(predicted[0])
            })
        
        forecast_data = []
        for date, price in zip(forecast_dates, forecast):
            forecast_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'price': float(price[0])
            })
        
        return jsonify({
            'historical': historical_data,
            'validation': validation_data,
            'forecast': forecast_data,
            'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
