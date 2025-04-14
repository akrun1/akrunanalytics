# Bitcoin Prediction API

This API provides Bitcoin price predictions using LSTM neural networks and historical data from Yahoo Finance.

## Features

- Retrieves historical Bitcoin price data using yfinance
- Trains an LSTM model to predict future prices
- Provides endpoints for various prediction timeframes (30, 60, 90 days)
- Returns both historical and forecast data in a consistent format

## Requirements

- Python 3.8+
- Flask
- TensorFlow
- scikit-learn
- pandas
- numpy
- yfinance

## Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the API:

```bash
python bitcoin_prediction.py
```

The API will start at http://localhost:5000

## API Endpoints

### GET /api/bitcoin/predict

Returns Bitcoin historical data and price predictions.

Query Parameters:
- `days` (optional): Number of days to forecast (default: 30)

Example Response:
```json
{
  "historical": [
    {"date": "2020-01-01", "price": 7500.0},
    ...
  ],
  "validation": [
    {"date": "2024-01-01", "actual": 45000.0, "predicted": 44800.0},
    ...
  ],
  "forecast": [
    {"date": "2025-03-01", "price": 89500.0},
    ...
  ],
  "last_updated": "2025-02-27 16:15:32"
}
```

## Integration with Frontend

This API is designed to work with the Bitcoin Predictor React component in the akrunanalytics project.
