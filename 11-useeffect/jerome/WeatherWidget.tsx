import { useState, useEffect } from "react";

interface Weather {
    temperature: number;
    condition: string;
    wind: number;
    city?: string;
}

// Hardcoded list of cities for the dropdown
const CITIES: string[] = [
    "Brussels",
    "Ciney",
    "Namur",
];

export const WeatherWidget = () => {
    // State variables
    const [city, setCity] = useState<string>("Brussels");
    const [weather, setWeather] = useState<Weather | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState<number>(30);

    // Additional state for loading and error handling
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch weather data from wttr.in
    const fetchWeatherData = async (cityCalled: string) => {
        const response = await fetch(`https://wttr.in/${cityCalled}?format=j1`);
        if (!response.ok) {
            throw new Error("Erreur réseau");
        }
        const data = await response.json();
        return {...data, city: cityCalled};
    };

    const fetchWeather = async (cityCalled: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherData(cityCalled);
            const currentCondition = data.current_condition[0];
            setWeather({
                city: data.city,
                temperature: parseFloat(currentCondition.temp_C),
                condition: currentCondition.weatherDesc[0].value,
                wind: parseFloat(currentCondition.windspeedKmph),
            });
            setLastUpdate(new Date());
        } catch (err) {
            setError("Impossible de récupérer les données météo.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch weather data when the component mounts and when the city changes
    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    // Set up an interval to refresh the weather data every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!city) return;
            if (loading === true) return; // Avoid overlapping fetches

            setCountdown((prev) => {
                if (prev === 1) {
                    fetchWeather(city);
                    return 30;
                }
                return prev - 1;
            });
        }, 1000); // Every second

        return () => clearInterval(interval);
    }, [city, loading]);

  return (
    <div>
      <h1>Weather Widget</h1>
      <div>
        <label>
            City:&nbsp;
            <select value={city} onChange={e => setCity(e.target.value)}>
                {CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </label>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weather && (
            <div>
                <h2>Weather in {weather?.city}</h2>
                <p>Temperature: {weather.temperature} °C</p>
                <p>Condition: {weather.condition}</p>
                <p>Wind: {weather.wind} km/h</p>
                {lastUpdate && (<p>Last update: {lastUpdate.toLocaleTimeString()}</p>)}
                <p>Next update in: {countdown} seconds</p>
            </div>
        )}
    </div>
  );
};