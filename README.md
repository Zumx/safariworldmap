# Safari World Map 🦁

An interactive world map of **every nature reserve on Earth**, sourced from
[OpenStreetMap](https://www.openstreetmap.org) (`leisure=nature_reserve`).

- **Next.js** (static export) + **Leaflet** with marker clustering
- Data fetched via the **Overpass API** using tiled queries to avoid timeouts
- Static `public/data/points.geojson` — no database

## Develop

```bash
npm install
npm run fetch-data   # rebuilds public/data/points.geojson from Overpass
npm run dev
```

## Build

```bash
npm run build        # outputs static site to ./out
```

Data © OpenStreetMap contributors.
