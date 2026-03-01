import { Trip } from '../types';

const STORAGE_KEY = 'trailpack_trips';

export function saveTrips(trips: Trip[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Error saving trips:', error);
  }
}

export function loadTrips(): Trip[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading trips:', error);
    return [];
  }
}

export function saveTrip(trip: Trip): void {
  const trips = loadTrips();
  const existingIndex = trips.findIndex(t => t.id === trip.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  
  saveTrips(trips);
}

export function deleteTrip(tripId: string): void {
  const trips = loadTrips();
  const filteredTrips = trips.filter(t => t.id !== tripId);
  saveTrips(filteredTrips);
}
