import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetail from './pages/TripDetail';

function App() {
  return (
    <Router>
      <TripProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateTrip />} />
            <Route path="/trip/:id" element={<TripDetail />} />
          </Routes>
        </Layout>
      </TripProvider>
    </Router>
  );
}

export default App;
