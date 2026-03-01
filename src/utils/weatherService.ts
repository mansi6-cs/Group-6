import { WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(destination: string): Promise<WeatherData | null> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.warn('Weather API key not configured. Using mock data.');
    return getMockWeather();
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(destination)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather fetch failed');
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      precipitation: data.rain?.['1h'] || 0,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return getMockWeather();
  }
}

function getMockWeather(): WeatherData {
  return {
    temperature: 18,
    condition: 'Clear',
    humidity: 65,
    windSpeed: 12,
    precipitation: 0,
    icon: '01d',
  };
}
