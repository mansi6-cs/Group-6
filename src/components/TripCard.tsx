import React from 'react';
import { Trip } from '../types';
import { Calendar, MapPin, Users, Mountain, Trees, Sun, Waves, Wind, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
  onDelete: (tripId: string) => void;
}

const terrainIcons = {
  mountain: Mountain,
  forest: Trees,
  desert: Sun,
  coastal: Waves,
  plains: Wind,
};

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const navigate = useNavigate();
  const TerrainIcon = terrainIcons[trip.terrain];
  
  const packedCount = trip.gearList.filter(item => item.packed).length;
  const totalCount = trip.gearList.length;
  const packingProgress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  const handleView = () => {
    navigate(`/trip/${trip.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${trip.name}"?`)) {
      onDelete(trip.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{trip.name}</h3>
          <TerrainIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2 text-primary-600" />
            <span>{trip.destination}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            <span>
              {format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            <span>{trip.groupSize} {trip.groupSize === 1 ? 'person' : 'people'}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Packing Progress</span>
            <span className="font-semibold">{packedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${packingProgress}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {trip.terrain}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {trip.season}
          </span>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleView}
            className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
          
          <button
            onClick={handleDelete}
            className="flex items-center justify-center bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
