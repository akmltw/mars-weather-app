import React, { useState, useEffect } from 'react';
import { formatDate } from './helpers';
import { API_URL } from './api';
import { AppWrapper, GlobalStyle, MarsWeather, InfoWrapper } from './App.styles';
import BGImage from './img/mars.jpg';
import WeatherData from './components/WeatherData.jsx';
import Info from './components/Info';
import Unit from './components/Unit';
import Previous from './components/Previous';

const App = () => {
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


  return (
    <>
      <GlobalStyle bgImage={BGImage} />
      <AppWrapper>
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