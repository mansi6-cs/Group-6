import React from 'react';
import { useTrips } from '../context/TripContext';
import TripCard from '../components/TripCard';
import { Tent, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { trips, deleteTrip } = useTrips();

  const sortedTrips = [...trips].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Tent className="h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">No trips yet</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Start planning your next adventure by creating your first trip. 
          We'll help you pack smart based on terrain and weather.
        </p>
        <Link
          to="/create"
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Create Your First Trip</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
        <p className="text-gray-600">Plan, pack, and track your outdoor adventures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrips.map(trip => (
          <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
        ))}
      </div>
    </div>
  );
}
