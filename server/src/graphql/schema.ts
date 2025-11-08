export const typeDefs = `#graphql
    type Query {
      activityRankings(location: String!): ActivityRankingsResponse!
    }
    
    type ActivityRankingsResponse {
      location: LocationInfo!
      rankings: [DayRanking!]!
    }
    
    type LocationInfo {
      city: String!
      latitude: Float!
      longitude: Float!
    }
    
    type DayRanking {
      date: String!
      activities: [ActivityScore!]!
    }
    
    type ActivityScore {
      activity: ActivityType!
      score: Float!
      reason: String!
      conditions: WeatherConditions!
    }
    
    enum ActivityType {
      SKIING
      SURFING
      OUTDOOR_SIGHTSEEING
      INDOOR_SIGHTSEEING
    }
    
    type WeatherConditions {
      time: String!
      weather_code: Int!
      temperature_2m_max: Float!
      precipitation_probability_max: Float!
      snowfall_sum: Float!
      wind_speed_10m_max: Float!
      sunshine_duration: String!
    }
    `;
