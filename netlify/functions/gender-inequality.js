// Netlify function to provide gender inequality data

exports.handler = async function(event) {
  try {
    // This would typically fetch from an API or database
    // For demonstration, we're using mock data
    const data = {
      countries: [
        // Nordic countries - typically highest gender equality
        {
          name: "Iceland",
          iso: "ISL",
          inequalityIndex: 0.115,
          womenInLeadership: 46.2,
          payGap: 5.3,
          educationGap: 1.2,
          description: "Iceland consistently ranks as the world's most gender-equal country. With nearly equal representation in leadership, minimal pay gaps, and policies supporting work-life balance, Iceland has created an environment where both men and women thrive professionally."
        },
        {
          name: "Finland",
          iso: "FIN",
          inequalityIndex: 0.124,
          womenInLeadership: 42.7,
          payGap: 7.8,
          educationGap: -1.5, // Negative means women outperform men
          description: "Finland has achieved near gender parity in many areas. The country features high women's participation in politics and business leadership, supported by strong parental leave policies and affordable childcare."
        },
        {
          name: "Norway",
          iso: "NOR",
          inequalityIndex: 0.138,
          womenInLeadership: 40.8,
          payGap: 9.6,
          educationGap: -3.2,
          description: "Norway's gender equality success is partly due to policies like gender quotas on corporate boards, which helped increase women's representation in leadership positions. The country provides extensive family support and actively works to eliminate gender bias."
        },
        {
          name: "Sweden",
          iso: "SWE",
          inequalityIndex: 0.146,
          womenInLeadership: 38.6,
          payGap: 11.2,
          educationGap: -2.8,
          description: "Sweden's feminist foreign policy extends to domestic affairs with strong gender equality in the workplace and education. Shared parental responsibilities and institutional support help both genders balance careers and family life."
        },
        
        // Western/Central European countries
        {
          name: "Germany",
          iso: "DEU",
          inequalityIndex: 0.278,
          womenInLeadership: 29.5,
          payGap: 18.3,
          educationGap: -0.8,
          description: "Germany has made significant progress in women's leadership, though challenges remain. While the gender pay gap persists higher than the EU average, women's educational achievements exceed men's, creating a foundation for future improvements."
        },
        {
          name: "France",
          iso: "FRA",
          inequalityIndex: 0.252,
          womenInLeadership: 32.7,
          payGap: 15.2,
          educationGap: -2.1,
          description: "France has implemented gender parity laws in politics and business that have improved women's representation. The country combines progressive policies with cultural traditions, creating a mixed picture of gender equality."
        },
        {
          name: "United Kingdom",
          iso: "GBR",
          inequalityIndex: 0.274,
          womenInLeadership: 31.8,
          payGap: 16.3,
          educationGap: -1.6,
          description: "The UK has closed most of its educational gender gap and has high women's workforce participation, though leadership roles remain disproportionately male. Mandatory gender pay gap reporting has increased transparency in recent years."
        },
        {
          name: "Spain",
          iso: "ESP",
          inequalityIndex: 0.296,
          womenInLeadership: 28.2,
          payGap: 14.2,
          educationGap: -3.5,
          description: "Spain has significantly improved gender equality through legislative measures in recent decades. Women outperform men educationally, though leadership representation and pay equality still show room for improvement."
        },
        
        // North America
        {
          name: "Canada",
          iso: "CAN",
          inequalityIndex: 0.231,
          womenInLeadership: 35.6,
          payGap: 13.8,
          educationGap: -4.2,
          description: "Canada has achieved significant progress in women's education and professional development. The country's gender-balanced cabinet set a precedent for political representation, though corporate leadership lags behind government."
        },
        {
          name: "United States",
          iso: "USA",
          inequalityIndex: 0.315,
          womenInLeadership: 28.2,
          payGap: 18.5,
          educationGap: -3.9,
          description: "The US shows contrasts in gender equality with high educational attainment for women but persistent gaps in leadership and pay. Limited federal family policies create barriers for women's career advancement despite progress in certain sectors."
        },
        
        // Asia Pacific Developed
        {
          name: "New Zealand",
          iso: "NZL",
          inequalityIndex: 0.185,
          womenInLeadership: 37.8,
          payGap: 9.4,
          educationGap: -2.3,
          description: "New Zealand ranks high in gender equality with strong female representation in politics and business. The first country to give women the vote continues its progressive tradition with policies supporting women's career advancement."
        },
        {
          name: "Australia",
          iso: "AUS",
          inequalityIndex: 0.236,
          womenInLeadership: 34.9,
          payGap: 14.1,
          educationGap: -2.7,
          description: "Australia has made steady progress in gender equality though challenges persist. Women are highly educated but face a significant pay gap, particularly in senior positions and male-dominated industries."
        },
        {
          name: "Japan",
          iso: "JPN",
          inequalityIndex: 0.563,
          womenInLeadership: 12.9,
          payGap: 24.5,
          educationGap: 1.8,
          description: "Japan faces significant gender inequality despite its economic development. Traditional gender roles remain strong, limiting women's career advancement. Government initiatives aim to increase women's leadership, but progress has been slow."
        },
        {
          name: "South Korea",
          iso: "KOR",
          inequalityIndex: 0.531,
          womenInLeadership: 15.6,
          payGap: 32.5,
          educationGap: 0.5,
          description: "South Korea has one of the highest gender pay gaps among developed countries. Despite women's educational achievements, cultural expectations and workplace discrimination create barriers to professional advancement."
        },
        
        // BRICS and emerging economies
        {
          name: "China",
          iso: "CHN",
          inequalityIndex: 0.421,
          womenInLeadership: 19.5,
          payGap: 22.3,
          educationGap: 0.9,
          description: "China presents a complex picture of gender equality with high female workforce participation but low representation in leadership. Urban women fare better than rural counterparts, where traditional gender norms remain stronger."
        },
        {
          name: "India",
          iso: "IND",
          inequalityIndex: 0.687,
          womenInLeadership: 14.8,
          payGap: 34.5,
          educationGap: 18.6,
          description: "India faces significant gender inequality challenges with large disparities in education, workforce participation, and leadership opportunities. Regional and urban-rural differences create varied experiences for women across the country."
        },
        {
          name: "Brazil",
          iso: "BRA",
          inequalityIndex: 0.475,
          womenInLeadership: 22.3,
          payGap: 27.4,
          educationGap: -3.1,
          description: "Brazil shows a contradictory pattern with women achieving higher education levels than men but facing significant barriers in pay and leadership. Intersectional challenges affect women differently based on race and socioeconomic status."
        },
        {
          name: "South Africa",
          iso: "ZAF",
          inequalityIndex: 0.491,
          womenInLeadership: 32.4,
          payGap: 28.6,
          educationGap: 3.8,
          description: "South Africa has made progress in women's political representation but continues to face challenges in economic equality. Cultural factors and high rates of gender-based violence create complex barriers to full equality."
        },
        {
          name: "Russia",
          iso: "RUS",
          inequalityIndex: 0.408,
          womenInLeadership: 21.1,
          payGap: 26.9,
          educationGap: -1.2,
          description: "Russia has high women's workforce participation but significant occupational segregation. Women achieve higher education levels but remain underrepresented in leadership and face a substantial pay gap."
        },
        
        // Middle East
        {
          name: "Israel",
          iso: "ISR",
          inequalityIndex: 0.387,
          womenInLeadership: 25.8,
          payGap: 22.7,
          educationGap: 2.1,
          description: "Israel shows a mixed picture with high female educational attainment and workforce participation alongside persistent leadership gaps. Community-specific differences create varied gender equality experiences."
        },
        {
          name: "United Arab Emirates",
          iso: "ARE",
          inequalityIndex: 0.534,
          womenInLeadership: 18.5,
          payGap: 29.4,
          educationGap: -13.2,
          description: "The UAE has made remarkable progress in women's education, with women far outpacing men in educational attainment. However, cultural norms and legal frameworks continue to limit women's equal participation in some areas."
        },
        {
          name: "Saudi Arabia",
          iso: "SAU",
          inequalityIndex: 0.714,
          womenInLeadership: 7.8,
          payGap: 42.6,
          educationGap: -1.6,
          description: "Saudi Arabia has implemented recent reforms to increase women's rights, including allowing women to drive and travel independently. Despite these changes, significant legal and cultural barriers to equality remain."
        },
        
        // African nations
        {
          name: "Rwanda",
          iso: "RWA",
          inequalityIndex: 0.362,
          womenInLeadership: 55.7,
          payGap: 32.4,
          educationGap: 8.7,
          description: "Rwanda has the world's highest percentage of women in parliament, demonstrating political commitment to gender equality. However, economic and educational inequalities persist, particularly in rural areas."
        },
        {
          name: "Nigeria",
          iso: "NGA",
          inequalityIndex: 0.752,
          womenInLeadership: 11.2,
          payGap: 38.3,
          educationGap: 22.6,
          description: "Nigeria faces significant gender gaps across education, economic participation, and leadership. Regional differences and religious practices create varied experiences for women throughout the country."
        },
        {
          name: "Egypt",
          iso: "EGY",
          inequalityIndex: 0.693,
          womenInLeadership: 9.6,
          payGap: 35.7,
          educationGap: 5.3,
          description: "Egypt continues to face challenges in women's economic participation and leadership representation. Recent legal reforms have improved women's rights, but cultural norms create ongoing barriers to equality."
        },
        
        // Others
        {
          name: "Mexico",
          iso: "MEX",
          inequalityIndex: 0.468,
          womenInLeadership: 24.5,
          payGap: 30.2,
          educationGap: -1.1,
          description: "Mexico has increased women's representation in politics through quotas but continues to face challenges in economic equality. High rates of gender-based violence remain a significant concern."
        },
        {
          name: "Argentina",
          iso: "ARG",
          inequalityIndex: 0.385,
          womenInLeadership: 36.8,
          payGap: 25.4,
          educationGap: -4.9,
          description: "Argentina has strong women's representation in politics and education but faces continued challenges in economic equality. The country has a vibrant feminist movement that has achieved important legislative advances."
        },
        {
          name: "Turkey",
          iso: "TUR",
          inequalityIndex: 0.614,
          womenInLeadership: 17.3,
          payGap: 31.6,
          educationGap: 7.8,
          description: "Turkey shows significant urban-rural divides in gender equality. While urban women have made advances in education and professional careers, overall women's workforce participation remains low compared to global standards."
        },
        {
          name: "Indonesia",
          iso: "IDN",
          inequalityIndex: 0.582,
          womenInLeadership: 19.8,
          payGap: 30.5,
          educationGap: 3.5,
          description: "Indonesia's gender equality situation varies significantly by region and socioeconomic status. While some women achieve high political and business positions, many continue to face barriers based on traditional gender roles."
        },
        {
          name: "Afghanistan",
          iso: "AFG",
          inequalityIndex: 0.925,
          womenInLeadership: 0.5,
          payGap: 74.8,
          educationGap: 46.2,
          description: "Afghanistan faces extreme gender inequality challenges with severe restrictions on women's education, employment, and public participation. Recent political changes have further limited women's rights and opportunities."
        }
      ]
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
    console.error('Error generating gender inequality data:', error);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Error generating gender inequality data: ' + error.message
      })
    };
  }
};
