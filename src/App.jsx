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
  const [selectSol, setSelectedSol] = useState();
  const [metric, setMetric] = useState(true);
  const [previous, setPrevious] = useState(false);

  useEffect(() => {
    const fetchFromAPI = async () => {
      const weather = await (await fetch(API_URL)).json();
      console.log(weather);
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
              <WeatherData />
              <InfoWrapper>
                <Info />
                <Unit />
              </InfoWrapper>
            </>
          )}
        </MarsWeather>
        <Previous />
      </AppWrapper>
    </>
  );
};

export default App;