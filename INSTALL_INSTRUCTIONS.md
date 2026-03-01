# Installation Instructions

## Prerequisites Installation

Before you can run this project, you need to install Node.js and npm.

### Install Node.js and npm

1. **Download Node.js**:
   - Visit [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - The installer includes npm automatically

2. **Run the Installer**:
   - Double-click the downloaded file
   - Follow the installation wizard
   - Accept the default settings
   - Make sure "Add to PATH" is checked

3. **Verify Installation**:
   Open a new PowerShell or Command Prompt window and run:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both commands.

## Project Setup

Once Node.js and npm are installed:

### 1. Open Terminal in Project Directory

Open PowerShell or Command Prompt and navigate to:
```bash
cd "d:\Project\Group-6"
```

### 2. Install Dependencies

```bash
npm install
```

This will download and install all required packages. It may take a few minutes.

### 3. Configure Environment (Optional)

For real weather data:
- Open `.env` file
- Get a free API key from [https://openweathermap.org/api](https://openweathermap.org/api)
- Replace `your_api_key_here` with your actual key

### 4. Start the Application

```bash
npm run dev
```

The application will open automatically in your default browser at `http://localhost:3000`

## What to Expect

When the app starts, you'll see:
- A clean, modern interface
- "My Trips" dashboard (empty at first)
- "New Trip" button to create your first trip

## First Steps

1. Click "New Trip"
2. Fill in trip details:
   - Name: e.g., "Yosemite Weekend"
   - Destination: e.g., "Yosemite National Park, CA"
   - Dates, group size
   - Select terrain (Mountain, Forest, Desert, etc.)
   - Select season (Spring, Summer, Fall, Winter)
3. Click "Create Trip"
4. View your auto-generated gear checklist
5. Check off items as you pack

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Try opening a new terminal window

### Port 3000 Already in Use
- Vite will automatically use the next available port
- Check the terminal output for the actual URL

### Installation Fails
- Try running as Administrator
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check your internet connection

### Browser Doesn't Open
- Manually navigate to `http://localhost:3000`
- Check the terminal for the correct port number

## Need More Help?

- Check `SETUP.md` for detailed setup instructions
- Check `README.md` for feature documentation
- Look for error messages in the browser console (F12)

---

**Note**: This is a client-side application. All data is stored locally in your browser. No server or database setup is required!
