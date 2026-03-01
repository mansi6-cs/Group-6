import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Trip, TerrainType, Season, GearItem } from '../types';
import { generateGearList } from '../data/gearData';
import { fetchWeather } from '../utils/weatherService';
import { Mountain, Trees, Sun, Waves, Wind, Loader2 } from 'lucide-react';

const terrainOptions: { value: TerrainType; label: string; icon: typeof Mountain }[] = [
  { value: 'mountain', label: 'Mountain', icon: Mountain },
  { value: 'forest', label: 'Forest', icon: Trees },
  { value: 'desert', label: 'Desert', icon: Sun },
  { value: 'coastal', label: 'Coastal', icon: Waves },
  { value: 'plains', label: 'Plains', icon: Wind },
];

const seasonOptions: { value: Season; label: string; color: string }[] = [
  { value: 'spring', label: 'Spring', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'summer', label: 'Summer', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'fall', label: 'Fall', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'winter', label: 'Winter', color: 'bg-blue-100 text-blue-700 border-blue-300' },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    terrain: 'mountain' as TerrainType,
    season: 'summer' as Season,
    startDate: '',
    endDate: '',
    groupSize: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const gearCategories = generateGearList(formData.terrain, formData.season);
      const gearList: GearItem[] = gearCategories.flatMap(category =>
        category.items.map(item => ({
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          packed: false,
        }))
      );

      const weatherData = await fetchWeather(formData.destination);

      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        ...formData,
        gearList,
        weatherData: weatherData || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addTrip(newTrip);
      navigate(`/trip/${newTrip.id}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };

  const isFormValid = formData.name && formData.destination && formData.startDate && formData.endDate;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Trip</h1>
        <p className="text-gray-600">Tell us about your adventure and we'll generate a smart packing list</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Trip Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Yosemite Weekend"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Destination *
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="e.g., Yosemite National Park, CA"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Group Size
          </label>
          <input
            type="number"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            min="1"
            max="20"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Terrain Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {terrainOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, terrain: option.value }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.terrain === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${
                    formData.terrain === option.value ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    formData.terrain === option.value ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Season *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {seasonOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, season: option.value }))}
                className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                  formData.season === option.value
                    ? option.color
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <span>Create Trip</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
