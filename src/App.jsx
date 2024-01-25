import React, { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { formatDate } from './helpers';
import { API_URL } from './api';
import { AppWrapper, GlobalStyle, MarsWeather, InfoWrapper } from './App.styles';
import ThemeToggle from './components/ThemeToggle'
import BGDayImage from './img/mars-day.jpeg';
import BGNightImage from './img/mars-night.jpeg';
import WeatherData from './components/WeatherData.jsx';
import Info from './components/Info';
import Unit from './components/Unit';
import Previous from './components/Previous';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme' ? 'light' : 'dark');
  const [bgImage, setBgImage] = useLocalStorage('light' ? BGDayImage : BGNightImage);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [selectedSol, setSelectedSol] = useState();
  const [metric, setMetric] = useState(true);
  const [previous, setPrevious] = useState(false);

  useEffect(() => {
    const fetchFromAPI = async () => {
      const weather = await (await fetch(API_URL)).json();
      const marsWeather = weather.sol_keys.map(solKey => {
        return {
          sol: solKey,
          maxTemp: weather[solKey].AT?.mx || 'No data of max temperature',
          minTemp: weather[solKey].AT?.mn || 'No data of min temperature',
          windSpeed: Math.round(weather[solKey].HWS?.av || 0),
          windDirectionDegrees: weather[solKey].WD?.most_common?.compass_degrees || 0,
          date: formatDate(new Date(weather[solKey].First_UTC)),
        };
      });
      setWeather(marsWeather);
      setSelectedSol(marsWeather.length - 1);
      setLoading(false);
    };

    fetchFromAPI();
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const newBgImage = theme === 'light' ? BGNightImage : BGDayImage;
    setTheme(newTheme);
    setBgImage(newBgImage);
  }

  return (
    <>
      <GlobalStyle bgImage={bgImage} />
      <ThemeToggle theme={theme} onClick={switchTheme} />
      <AppWrapper data-theme={theme}>
        <MarsWeather>
          {loading ? (<div>Loading...</div>) : (
            <>
              <h1 className='main-title'>
                Latest weather at Elysium Platitia
              </h1>
              <WeatherData sol={weather[selectedSol]} isMetric={metric} />
              <InfoWrapper>
                <Info />
                <Unit metric={metric} setMetric={setMetric} />
              </InfoWrapper>
            </>
          )}
        </MarsWeather>
        <Previous
          data-theme={theme}
          weather={weather}
          previous={previous}
          setPrevious={setPrevious}
          setSelectedSol={setSelectedSol}
          isMetric={metric}
        />
      </AppWrapper>
    </>
  );
};

export default App;