// Netlify function to provide country clustering data

exports.handler = async function(event) {
  try {
    // This would typically fetch from an API or database
    // For demonstration, we're using mock data
    
    const data = {
      countries: [
        // Cluster 0: Developed economies
        {
          name: "United States",
          cluster: "0",
          metrics: {
            gdpPerCapita: 65297.52,
            unemploymentRate: 3.7,
            inflationRate: 2.1,
            governmentDebt: 129.0,
            extremismIndex: 38.2
          }
        },
        {
          name: "Germany",
          cluster: "0",
          metrics: {
            gdpPerCapita: 46208.42,
            unemploymentRate: 3.1,
            inflationRate: 1.8,
            governmentDebt: 69.3,
            extremismIndex: 26.7
          }
        },
        {
          name: "Japan",
          cluster: "0",
          metrics: {
            gdpPerCapita: 40246.88,
            unemploymentRate: 2.6,
            inflationRate: 0.5,
            governmentDebt: 266.2,
            extremismIndex: 22.1
          }
        },
        {
          name: "Canada",
          cluster: "0",
          metrics: {
            gdpPerCapita: 46194.73,
            unemploymentRate: 5.7,
            inflationRate: 2.0,
            governmentDebt: 109.9,
            extremismIndex: 27.4
          }
        },
        {
          name: "France",
          cluster: "0",
          metrics: {
            gdpPerCapita: 38625.07,
            unemploymentRate: 7.5,
            inflationRate: 1.6,
            governmentDebt: 112.5,
            extremismIndex: 35.9
          }
        },
        {
          name: "United Kingdom",
          cluster: "0",
          metrics: {
            gdpPerCapita: 40284.64,
            unemploymentRate: 3.9,
            inflationRate: 1.8,
            governmentDebt: 99.8,
            extremismIndex: 32.6
          }
        },
        {
          name: "Australia",
          cluster: "0",
          metrics: {
            gdpPerCapita: 51692.84,
            unemploymentRate: 3.5,
            inflationRate: 1.6,
            governmentDebt: 63.1,
            extremismIndex: 27.9
          }
        },
        
        // Cluster 1: Emerging economies
        {
          name: "China",
          cluster: "1",
          metrics: {
            gdpPerCapita: 10839.43,
            unemploymentRate: 4.3,
            inflationRate: 2.9,
            governmentDebt: 66.8,
            extremismIndex: 43.5
          }
        },
        {
          name: "India",
          cluster: "1",
          metrics: {
            gdpPerCapita: 2104.15,
            unemploymentRate: 7.8,
            inflationRate: 4.8,
            governmentDebt: 86.8,
            extremismIndex: 49.2
          }
        },
        {
          name: "Brazil",
          cluster: "1",
          metrics: {
            gdpPerCapita: 8717.19,
            unemploymentRate: 11.9,
            inflationRate: 3.2,
            governmentDebt: 91.7,
            extremismIndex: 51.8
          }
        },
        {
          name: "South Africa",
          cluster: "1",
          metrics: {
            gdpPerCapita: 6100.77,
            unemploymentRate: 29.2,
            inflationRate: 4.1,
            governmentDebt: 77.1,
            extremismIndex: 57.3
          }
        },
        {
          name: "Mexico",
          cluster: "1",
          metrics: {
            gdpPerCapita: 8329.27,
            unemploymentRate: 3.6,
            inflationRate: 3.6,
            governmentDebt: 60.6,
            extremismIndex: 65.1
          }
        },
        {
          name: "Indonesia",
          cluster: "1",
          metrics: {
            gdpPerCapita: 4174.93,
            unemploymentRate: 5.3,
            inflationRate: 3.0,
            governmentDebt: 40.2,
            extremismIndex: 43.2
          }
        },
        {
          name: "Turkey",
          cluster: "1",
          metrics: {
            gdpPerCapita: 8538.17,
            unemploymentRate: 13.8,
            inflationRate: 19.6,
            governmentDebt: 39.5,
            extremismIndex: 68.7
          }
        },
        
        // Cluster 2: High-income smaller economies
        {
          name: "Singapore",
          cluster: "2",
          metrics: {
            gdpPerCapita: 65233.28,
            unemploymentRate: 2.3,
            inflationRate: 0.6,
            governmentDebt: 131.3,
            extremismIndex: 32.1
          }
        },
        {
          name: "Norway",
          cluster: "2",
          metrics: {
            gdpPerCapita: 67294.48,
            unemploymentRate: 4.0,
            inflationRate: 1.3,
            governmentDebt: 40.6,
            extremismIndex: 18.4
          }
        },
        {
          name: "Switzerland",
          cluster: "2",
          metrics: {
            gdpPerCapita: 86601.55,
            unemploymentRate: 2.5,
            inflationRate: 0.4,
            governmentDebt: 42.9,
            extremismIndex: 22.7
          }
        },
        {
          name: "Denmark",
          cluster: "2",
          metrics: {
            gdpPerCapita: 60170.34,
            unemploymentRate: 4.8,
            inflationRate: 0.7,
            governmentDebt: 42.7,
            extremismIndex: 24.3
          }
        },
        {
          name: "New Zealand",
          cluster: "2",
          metrics: {
            gdpPerCapita: 41945.33,
            unemploymentRate: 4.0,
            inflationRate: 1.6,
            governmentDebt: 48.0,
            extremismIndex: 19.8
          }
        },
        
        // Cluster 3: Developing economies with challenges
        {
          name: "Nigeria",
          cluster: "3",
          metrics: {
            gdpPerCapita: 2097.09,
            unemploymentRate: 33.3,
            inflationRate: 17.8,
            governmentDebt: 35.1,
            extremismIndex: 78.6
          }
        },
        {
          name: "Pakistan",
          cluster: "3",
          metrics: {
            gdpPerCapita: 1189.83,
            unemploymentRate: 4.5,
            inflationRate: 9.7,
            governmentDebt: 87.6,
            extremismIndex: 79.2
          }
        },
        {
          name: "Egypt",
          cluster: "3",
          metrics: {
            gdpPerCapita: 3832.04,
            unemploymentRate: 8.3,
            inflationRate: 13.9,
            governmentDebt: 90.2,
            extremismIndex: 72.5
          }
        },
        {
          name: "Bangladesh",
          cluster: "3",
          metrics: {
            gdpPerCapita: 2122.08,
            unemploymentRate: 5.4,
            inflationRate: 5.7,
            governmentDebt: 39.1,
            extremismIndex: 65.3
          }
        },
        {
          name: "Kenya",
          cluster: "3",
          metrics: {
            gdpPerCapita: 2006.95,
            unemploymentRate: 5.7,
            inflationRate: 5.4,
            governmentDebt: 67.8,
            extremismIndex: 69.7
          }
        },
        
        // Cluster 4: Struggling economies
        {
          name: "Venezuela",
          cluster: "4",
          metrics: {
            gdpPerCapita: 1542.85,
            unemploymentRate: 35.5,
            inflationRate: 3000.0,
            governmentDebt: 350.0,
            extremismIndex: 88.3
          }
        },
        {
          name: "Yemen",
          cluster: "4",
          metrics: {
            gdpPerCapita: 824.12,
            unemploymentRate: 13.5,
            inflationRate: 30.5,
            governmentDebt: 84.2,
            extremismIndex: 92.5
          }
        },
        {
          name: "Syria",
          cluster: "4",
          metrics: {
            gdpPerCapita: 1213.39,
            unemploymentRate: 50.0,
            inflationRate: 38.5,
            governmentDebt: 94.8,
            extremismIndex: 89.7
          }
        },
        {
          name: "Zimbabwe",
          cluster: "4",
          metrics: {
            gdpPerCapita: 1128.22,
            unemploymentRate: 16.9,
            inflationRate: 557.2,
            governmentDebt: 78.7,
            extremismIndex: 76.8
          }
        }
      ],
      
      // Descriptions of each cluster based on analysis
      clusterDescriptions: {
        "0": "Developed Economies: High GDP per capita (above $35,000), generally low unemployment rates, stable inflation, and more moderate extremism indicators. While government debt varies, these economies demonstrate strong economic fundamentals.",
        
        "1": "Emerging Economies: Middle-income countries with GDP per capita between $2,000 and $11,000, moderate to high unemployment, and higher inflation rates than developed economies. These countries often show higher extremism indicators, likely connected to social inequality and ongoing economic challenges.",
        
        "2": "High-Income Smaller Economies: Very high GDP per capita (often above $60,000), low unemployment, very low inflation, and generally lower government debt. These countries show the lowest extremism indicators, suggesting stable social conditions.",
        
        "3": "Developing Economies with Challenges: Lower GDP per capita (typically under $4,000), variable unemployment rates, and moderate to high inflation. These economies show high extremism indicators, reflecting social tensions and political instability.",
        
        "4": "Struggling Economies: Very challenging economic conditions with high unemployment, extremely high inflation rates, unsustainable debt levels, and the highest extremism indicators. These countries often face political crises, conflicts, or extreme economic mismanagement."
      }
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error generating country clustering data:', error);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Error generating country clustering data: ' + error.message
      })
    };
  }
};
