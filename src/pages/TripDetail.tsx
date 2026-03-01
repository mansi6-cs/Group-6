import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import GearChecklist from '../components/GearChecklist';
import { 
  Calendar, MapPin, Users, Mountain, Trees, Sun, Waves, Wind,
  Download, ArrowLeft, Cloud, Droplets, Wind as WindIcon, Thermometer
} from 'lucide-react';
import { format } from 'date-fns';
import { exportTripToPDF } from '../utils/pdfExport';

const terrainIcons = {
  mountain: Mountain,
  forest: Trees,
  desert: Sun,
  coastal: Waves,
  plains: Wind,
};

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, currentTrip, setCurrentTrip, toggleGearPacked, updateGearItem } = useTrips();

  useEffect(() => {
    const trip = trips.find(t => t.id === id);
    if (trip) {
      setCurrentTrip(trip);
    } else {
      navigate('/');
    }
  }, [id, trips, setCurrentTrip, navigate]);

  if (!currentTrip) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  const TerrainIcon = terrainIcons[currentTrip.terrain];
  const packedCount = currentTrip.gearList.filter(item => item.packed).length;
  const totalCount = currentTrip.gearList.length;
  const packingProgress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;
  const totalWeight = currentTrip.gearList.reduce((sum, item) => sum + (item.weight || 0), 0);
  const packedWeight = currentTrip.gearList
    .filter(item => item.packed)
    .reduce((sum, item) => sum + (item.weight || 0), 0);

  const handleExportPDF = () => {
    exportTripToPDF(currentTrip);
  };

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back to Trips</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{currentTrip.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{currentTrip.destination}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {format(new Date(currentTrip.startDate), 'MMM dd')} - {format(new Date(currentTrip.endDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <TerrainIcon className="h-5 w-5" />
                  <span className="capitalize">{currentTrip.terrain}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{currentTrip.groupSize} {currentTrip.groupSize === 1 ? 'person' : 'people'}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span className="font-medium">Export PDF</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Packing Progress</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-900">{packedCount}</p>
                  <p className="text-sm text-blue-700">of {totalCount} items</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">{Math.round(packingProgress)}%</p>
                </div>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${packingProgress}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Total Weight</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-900">{(totalWeight / 1000).toFixed(2)}</p>
                  <p className="text-sm text-green-700">kilograms</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-green-700">
                Packed: {(packedWeight / 1000).toFixed(2)} kg
              </div>
            </div>

            {currentTrip.weatherData && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-orange-900 mb-2">Weather Forecast</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-orange-700" />
                    <span className="text-2xl font-bold text-orange-900">
                      {currentTrip.weatherData.temperature}°C
                    </span>
                  </div>
                  <Cloud className="h-8 w-8 text-orange-700" />
                </div>
                <p className="text-sm text-orange-700 mb-2">{currentTrip.weatherData.condition}</p>
                <div className="flex items-center space-x-4 text-xs text-orange-700">
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-3 w-3" />
                    <span>{currentTrip.weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <WindIcon className="h-3 w-3" />
                    <span>{currentTrip.weatherData.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentTrip.terrain}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {currentTrip.season}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gear Checklist</h2>
        <p className="text-gray-600">Check off items as you pack them. Add notes for specific items if needed.</p>
      </div>

      <GearChecklist
        gearList={currentTrip.gearList}
        onTogglePacked={(gearId) => toggleGearPacked(currentTrip.id, gearId)}
        onUpdateItem={(gearId, updates) => updateGearItem(currentTrip.id, gearId, updates)}
      />
    </div>
  );
}
