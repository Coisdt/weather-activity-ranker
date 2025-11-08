import { getLongitudeAndLatitude } from "../services/GeoLatLongService.js";
import { generateActivityRankings } from "../services/RankingService.js";
import { getWeatherData } from "../services/WeatherService.js";

export const resolvers = {
  Query: {
    activityRankings: async (_: any, { location }: { location: string }) => {
      // 1. Get coordinates from Nominatim API // TODO: check reason for this API
      const coords = await getLongitudeAndLatitude(location);

      // 2. Fetch weather data from Open-Meteo API
      const weatherData = await getWeatherData(
        coords.latitude,
        coords.longitude
      );

      // 3. Generate activity rankings from weather data
      const rankings = generateActivityRankings(weatherData);

      return {
        location: { city: location, ...coords },
        rankings,
      };
    },
  },
};  
