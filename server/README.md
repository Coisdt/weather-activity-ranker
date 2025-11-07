# Folder structure and seperation of concerns

backend/
 ├── src/
 │   ├── index.ts                # App entrypoint
 │   ├── graphql/
 │   │    ├── schema.ts
 │   │    ├── resolvers.ts
 │   │    
 │   ├── services/
 │   │    ├── WeatherService.ts
 │   │    ├── ActivityRankingService.ts
 │   │    
 │   ├── scorers/
 │   │    ├── SkiingScorer.ts
 │   │    ├── SurfingScorer.ts
 │   │    ├── // one for each activity
 │   │    
 │   ├── utils/
 │   │    ├── httpClient.ts      # fetch wrapper
 │   │    ├── types.ts           # shared interfaces
 │   │    
 │   └── tests/
 │        ├── activityRanking.test.ts
 │