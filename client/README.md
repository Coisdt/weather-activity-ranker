# Folder structure and seperation of concerns

frontend/
 ├── src/
 │   ├── components/
 │   │    ├── SearchForm.tsx
 │   │    ├── ActivityCard.tsx //or something that will show the information, a table is another option
 │   │    ├── RankingsList.tsx
 │   │    ├── // more components if necessary
 │   │    
 │   ├── graphql/
 │   │    ├── queries.ts
 │   │    
 │   ├── hooks/
 │   │    ├── useActivityRankings.ts
 │   │    
 │   ├── tests/
 │   │    // unit tests per componenent
 │   │    
 │   ├── App.tsx
 │   └── main.tsx