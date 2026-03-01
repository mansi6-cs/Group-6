# TrailPack - Smart Camping Trip Planner

A modern SaaS application designed for campers and backpackers to plan trips and generate smart gear checklists based on terrain, season, and weather conditions.

## Features

### Core Features ✅
- **Trip Creation Dashboard** - Create and manage multiple camping trips
- **Smart Gear Checklist Generator** - Auto-generates gear lists based on:
  - Terrain type (Mountain, Forest, Desert, Coastal, Plains)
  - Season (Spring, Summer, Fall, Winter)
  - Trip duration and group size
- **Weather API Integration** - Fetches real-time weather data for destinations
- **Printable Checklist Export** - Export trip checklists as PDF
- **Trip History Log** - View and manage all past and upcoming trips
- **Packing Progress Tracker** - Visual progress indicators for packing status
- **Weight Calculator** - Track total and packed gear weight

### Additional Features
- **Interactive Gear Management** - Check off items as you pack
- **Notes System** - Add custom notes to individual gear items
- **Essential Items Marking** - Critical gear highlighted with star icons
- **Responsive Design** - Beautiful UI that works on all devices
- **Local Storage** - Trips persist across browser sessions

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **PDF Export**: jsPDF
- **Date Handling**: date-fns
- **Weather API**: OpenWeatherMap

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd d:\Project\Group-6
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
copy .env.example .env
```

4. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to `.env`:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### Creating a Trip

1. Click "New Trip" in the navigation
2. Fill in trip details:
   - Trip name and destination
   - Start and end dates
   - Group size
   - Select terrain type (Mountain, Forest, Desert, Coastal, Plains)
   - Select season (Spring, Summer, Fall, Winter)
3. Click "Create Trip" - the app will:
   - Generate a customized gear checklist
   - Fetch weather data for your destination
   - Calculate total gear weight

### Managing Your Gear

- **Check off items** as you pack them
- **Add notes** to specific items for reminders
- **View categories** with expandable sections
- **Track progress** with visual indicators
- **Monitor weight** of packed vs. total gear

### Exporting Checklists

Click "Export PDF" on any trip to download a printable checklist including:
- Trip details and dates
- Weather forecast
- Complete gear list organized by category
- Weight calculations
- Packing status

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── TripCard.tsx    # Trip summary card
│   └── GearChecklist.tsx # Interactive gear checklist
├── pages/              # Route pages
│   ├── Dashboard.tsx   # Trip list view
│   ├── CreateTrip.tsx  # Trip creation form
│   └── TripDetail.tsx  # Trip details and checklist
├── context/            # React Context for state
│   └── TripContext.tsx # Trip management context
├── data/               # Static data and generators
│   └── gearData.ts     # Gear lists by terrain/season
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── storage.ts      # LocalStorage helpers
│   ├── weatherService.ts # Weather API integration
│   └── pdfExport.ts    # PDF generation
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Gear Categories

The app includes comprehensive gear lists across multiple categories:

- **Shelter**: Tent, sleeping bag, sleeping pad, stakes
- **Cooking**: Stove, fuel, cookware, water filtration
- **Clothing**: Base layers, insulation, rain gear, footwear
- **Navigation & Safety**: Map, compass, first aid, headlamp
- **Personal Items**: Sunscreen, toiletries, hygiene supplies

### Terrain-Specific Gear

- **Mountain**: Trekking poles, crampons, altitude medication
- **Forest**: Bear canister, bear spray, extra bug protection
- **Desert**: Extra water capacity, sun protection, electrolytes
- **Coastal**: Tide charts, waterproof bags, sand stakes
- **Plains**: Wind protection, heavy-duty stakes

### Seasonal Gear

- **Winter**: 4-season tent, winter sleeping bag, down jacket
- **Spring**: Extra rain gear, waterproof stuff sacks
- **Summer**: Lightweight tent, summer sleeping bag, bug net
- **Fall**: 3-season sleeping bag, extra insulation

## API Integration

### Weather API (OpenWeatherMap)

The app fetches real-time weather data including:
- Temperature
- Weather conditions
- Humidity
- Wind speed
- Precipitation

If no API key is configured, the app uses mock weather data for demonstration.

## Future Enhancements (Nice to Have)

- **AI-Generated Trip Risk Analysis** - Assess potential hazards
- **Group Packing Coordination** - Share lists with trip members
- **Calorie/Water Intake Estimator** - Calculate nutritional needs
- **Multi-day Meal Planning** - Food packing suggestions
- **Gear Rental Integration** - Find and book rental gear
- **Trail Condition Updates** - Real-time trail status
- **Photo Gallery** - Attach trip photos and memories

## Contributing

This is a student project for Group 6. For contributions or questions, please contact the team.

## License

This project is created for educational purposes.

## Acknowledgments

- Weather data provided by OpenWeatherMap
- Icons by Lucide React
- Built with React and Vite

---

**TrailPack** - Never forget your gear again! 🏕️⛰️
