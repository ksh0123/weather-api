import axios from "axios";
import { useEffect, useState } from "react";
import {
  LuSun,
  LuCloudSun,
  LuCloud,
  LuCloudy,
  LuCloudDrizzle,
  LuCloudRain,
  LuCloudLightning,
  LuCloudSnow,
  LuCloudFog,
} from "react-icons/lu";

const weatherIcon = {
  "01": {
    textColor: "text-yellow-500",
    icon: <LuSun size={120} />,
  },
  "02": {
    textColor: "text-blue-500",
    icon: <LuCloudSun size={120} />,
  },
  "03": {
    textColor: "text-purple-300",
    icon: <LuCloud size={120} />,
  },
  "04": {
    textColor: "text-purple-500",
    icon: <LuCloudy size={120} />,
  },
  "09": {
    textColor: "text-blue-300",
    icon: <LuCloudDrizzle size={120} />,
  },
  10: {
    textColor: "text-cyan-500",
    icon: <LuCloudRain size={120} />,
  },
  11: {
    textColor: "text-red-500",
    icon: <LuCloudLightning size={120} />,
  },
  13: {
    textColor: "text-orange-500",
    icon: <LuCloudSnow size={120} />,
  },
  50: {
    textColor: "text-grey-500",
    icon: <LuCloudFog size={120} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    getWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_KEY);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-2xl">
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name}, {weatherData.main.temp}℃
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
