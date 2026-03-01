# TrailPack Setup Guide

## Quick Start

Follow these steps to get the application running on your local machine.

### Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, and other dependencies.

### Step 2: Configure Weather API (Optional)

The app works without an API key (using mock data), but for real weather data:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Open the `.env` file in the project root
5. Replace `your_api_key_here` with your actual API key:

```
VITE_WEATHER_API_KEY=your_actual_api_key
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### Step 4: Build for Production (Optional)

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### Dependencies Installation Issues

If you encounter issues during `npm install`:

1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. If issues persist, try using `npm install --legacy-peer-deps`

### TypeScript Errors

If you see TypeScript errors in your IDE:

1. Make sure you have the latest TypeScript extension installed
2. Restart your IDE
3. Run `npm run build` to check for actual errors

### Weather API Not Working

If weather data isn't loading:

1. Check your `.env` file has the correct API key
2. Restart the development server after changing `.env`
3. Check browser console for error messages
4. The app will use mock data if the API fails

## Project Features Overview

### What You Can Do

1. **Create Trips**: Add new camping/backpacking trips with details
2. **Smart Checklists**: Get auto-generated gear lists based on terrain and season
3. **Track Packing**: Check off items as you pack them
4. **View Weather**: See weather forecasts for your destination
5. **Export PDFs**: Download printable checklists
6. **Manage History**: View all your past and upcoming trips

### Data Storage

- All trip data is stored in your browser's localStorage
- Data persists across browser sessions
- No server or database required
- Data is private to your browser

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Browser Compatibility

The app works best on modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

## Need Help?

Check the main README.md for detailed documentation about:
- Feature descriptions
- Project structure
- API integration
- Gear categories
- Future enhancements

---

Happy camping! 🏕️
