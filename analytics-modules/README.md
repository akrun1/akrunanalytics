# Analytics Modules

This directory contains three advanced analytics visualization modules that demonstrate data science and machine learning capabilities:

1. **Bitcoin Price Prediction** - Time series analysis and prediction with confidence intervals
2. **Country Clustering** - K-means clustering visualization of countries by economic indicators
3. **Gender Inequality Map** - Interactive global map showing gender inequality metrics

## Integration Instructions

These modules are designed to be easily integrated into the main website. Follow these steps to add them to your site:

### Step 1: Install Required Dependencies

Add these to your package.json and run `npm install` or `yarn install`:

```bash
npm install --save react-chartjs-2 chart.js d3-scale react-simple-maps react-tooltip
```

### Step 2: Copy Serverless Functions

The serverless functions in `netlify/functions` provide the data for these visualizations:

- `bitcoin-data.js`
- `country-clusters.js`
- `gender-inequality.js`

### Step 3: Add Route to Main Application

Add a route for the analytics dashboard in your main application:

```jsx
// In your routing configuration (e.g., App.jsx or routes.jsx)
import AnalyticsDashboard from './analytics-modules/AnalyticsDashboard';

// Then add this to your routes
<Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
```

### Step 4: Add Link to Dashboard

Add a link to the analytics dashboard in your navigation menu:

```jsx
<Link to="/analytics-dashboard">Analytics Dashboard</Link>
```

### Step 5: Update Netlify Build Configuration (if needed)

Ensure your Netlify build configuration includes the serverless functions:

```toml
# netlify.toml
[build]
  functions = "netlify/functions"
```

## Module Details

### Bitcoin Price Prediction

- Uses historical Bitcoin price data from CoinGecko API
- Implements time series forecasting with confidence intervals
- Interactive chart with selectable timeframes

### Country Clustering Analysis

- Groups countries by economic indicators using K-means clustering
- Interactive scatter plot with selectable metrics
- Detailed analysis of each cluster's characteristics

### Gender Inequality Map

- Interactive global choropleth map
- Displays inequality metrics by country
- Rankings of most and least equal countries

## Customization

Each module can be used independently if you prefer to integrate them one at a time:

```jsx
import BitcoinPredictor from './analytics-modules/bitcoin-prediction/BitcoinPredictor';
import CountryClustering from './analytics-modules/country-clustering/CountryClustering';
import GenderInequalityMap from './analytics-modules/gender-inequality/GenderInequalityMap';

// Use in your components:
<BitcoinPredictor />
<CountryClustering />
<GenderInequalityMap />
```

## Data Sources

These visualizations use mock data for demonstration purposes. In a production environment, you would replace these with:

1. Real-time cryptocurrency APIs (e.g., CoinGecko, Binance)
2. Economic data APIs (World Bank, IMF, OECD)
3. Gender inequality datasets (UN, World Economic Forum)

## Troubleshooting

If you encounter CORS issues with the APIs, you may need to configure your Netlify functions to proxy the requests.

For any visualization rendering issues, ensure all required dependencies are installed and imported correctly.
