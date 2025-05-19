# TeamProgress Dashboard

A user-friendly interface for the TeamProgress application that displays team member metrics from Jira projects.

## Features

- Responsive dashboard layout that works on both desktop and mobile devices
- Visualizations (charts/graphs) to display key metrics:
  - Individual team member productivity (tasks completed per sprint)
  - Time tracking metrics (estimated vs actual hours)
  - Issue resolution rates and cycle times
  - Sprint contribution comparison across team members
- Filtering capabilities by date range, sprint, team member, and issue type
- Clean, intuitive navigation system between different metric views
- Export functionality for reports in common formats (PDF, CSV)
- Proper loading states and error handling for API requests
- Modern React best practices and component architecture
- Consistent styling that matches the application theme

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, Chart.js
- **State Management**: React Context API, React Query
- **API Integration**: Apollo Client (GraphQL)
- **Backend**: Flask (serving the React app and mock API endpoints)

## Installation

### Backend Setup

1. Create a virtual environment (optional):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install the backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Install Node.js dependencies:

   ```bash
   npm install
   ```

2. Build the React application:

   ```bash
   npm run build
   ```

## Running the Application

1. Start the Flask server:

   ```bash
   python app.py
   ```

2. Open `http://localhost:5000` in your browser

## Development

1. Start the Flask server:

   ```bash
   python app.py
   ```

2. In a separate terminal, start the React development server:

   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser

## Project Structure

- `/src` - React application source code
  - `/components` - Reusable UI components
  - `/pages` - Main page components
  - `/layouts` - Layout components
  - `/hooks` - Custom React hooks
  - `/services` - API and data services
  - `/utils` - Utility functions
  - `/types` - TypeScript type definitions
  - `/context` - React context providers
  - `/assets` - Static assets
- `app.py` - Flask application serving the React app and API endpoints

## License

MIT
