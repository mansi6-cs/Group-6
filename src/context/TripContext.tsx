import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, GearItem } from '../types';
import { loadTrips, saveTrip as saveToStorage, deleteTrip as deleteFromStorage } from '../utils/storage';

interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  toggleGearPacked: (tripId: string, gearId: string) => void;
  updateGearItem: (tripId: string, gearId: string, updates: Partial<GearItem>) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const loadedTrips = loadTrips();
    setTrips(loadedTrips);
  }, []);

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
    saveToStorage(trip);
  };

  const updateTrip = (trip: Trip) => {
    const updatedTrip = { ...trip, updatedAt: new Date().toISOString() };
    setTrips(prev => prev.map(t => t.id === trip.id ? updatedTrip : t));
    saveToStorage(updatedTrip);
    
    if (currentTrip?.id === trip.id) {
      setCurrentTrip(updatedTrip);
    }
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    deleteFromStorage(tripId);
    
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  };

  const toggleGearPacked = (tripId: string, gearId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedGearList = trip.gearList.map(item =>
      item.id === gearId ? { ...item, packed: !item.packed } : item
    );

    updateTrip({ ...trip, gearList: updatedGearList });
  };

  const updateGearItem = (tripId: string, gearId: string, updates: Partial<GearItem>) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedGearList = trip.gearList.map(item =>
      item.id === gearId ? { ...item, ...updates } : item
    );

    updateTrip({ ...trip, gearList: updatedGearList });
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        setCurrentTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        toggleGearPacked,
        updateGearItem,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
