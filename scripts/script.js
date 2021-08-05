import { bootstrapTooltip } from './utils/customBootStrap.js';
import { AIR_API_CALL } from './utils/apiCalls.js';
import { AIR_VISUAL_API_KEY } from './utils/apiKey.js';

// VARIABLES

const cityBtn = document.getElementById('city-btn');
const btnHome = document.getElementById('btn-home');
const btnSearch = document.getElementById('btn-search');
const btnGroup = document.getElementById('btn-group');

const homeScreen = document.querySelector('.home');
const searchScreen = document.querySelector('.search');
const selectionScreen = document.querySelector('.selection');

const userInput = document.querySelector('input');
const listGroup = document.querySelector('.list-group');
const searchResultsGlass = document.getElementById('search-results');

const selectState = document.getElementById('select-state');
const selectCity = document.getElementById('select-city');

let citiesState = [];

// EVENT LISTENERS

window.addEventListener('load', () => {
  bootstrapTooltip();
});

btnHome.addEventListener('click', () => {
  homeScreen.style.visibility = 'visible';
  searchScreen.style.visibility = 'hidden';
  selectionScreen.style.visibility = 'hidden';
  btnGroup.style.visibility = 'hidden';
  clearSearchScreen();
});

btnSearch.addEventListener('click', () => {
  homeScreen.style.visibility = 'hidden';
  searchScreen.style.visibility = 'visible';
  selectionScreen.style.visibility = 'hidden';
  btnGroup.style.visibility = 'visible';
  clearSearchScreen();
  displayStates();
});

cityBtn.addEventListener('click', () => {
  searchScreen.style.visibility = 'visible';
  homeScreen.style.visibility = 'hidden';
  selectionScreen.style.visibility = 'hidden';
  btnGroup.style.visibility = 'visible';

  displayStates();
});

selectState.addEventListener('change', (e) => {
  const userSelection = e.target.value;

  if (userSelection === 'Choose a U.S. state') {
    selectCity.style.visibility = 'hidden';
    return;
  } else {
    citiesState = [];
    selectCity.style.visibility = 'visible';
    fetchCities(userSelection);
  }
});

userInput.addEventListener('keyup', (e) => {
  const userKeyStrokes = e.target.value;

  if (userKeyStrokes.length < 3) {
    searchResultsGlass.firstElementChild.innerHTML = '';
    return;
  }

  const searchResults = citiesState.filter((each) => {
    return each.city.toLowerCase().includes(userKeyStrokes.toLowerCase());
  });

  outputSearchResults(searchResults);
});

// FUNCTIONS

function clearSearchScreen() {
  document.querySelector('input').value = '';
  listGroup.textContent = '';
  selectCity.style.visibility = 'hidden';
  searchResultsGlass.style.visibility = 'hidden';
  userInput.value = '';
  selectState.textContent = '';
  citiesState = [];

  while (listGroup.firstElementChild) {
    listGroup.firstElementChild.remove();
  }

  const choose = `<option>Choose a U.S. state</option>`;
  selectState.insertAdjacentHTML('beforeend', choose);
}

// display states
async function displayStates() {
  const stateData = await fetchStates();

  const options = stateData
    .map((state) => {
      return `<option>${state}</option>`;
    })
    .join('');

  selectState.insertAdjacentHTML('beforeend', options);
}

// fetch states from API
async function fetchStates() {
  const res = await fetch(AIR_API_CALL.states);
  const data = await res.json();
  const objStates = data.data;
  const arrayOfStates = [];

  for (let i = 0; i < objStates.length; i++) {
    const state = objStates[i].state;
    arrayOfStates.push(state);
  }

  return arrayOfStates;
}

// fetch cities
async function fetchCities(selectedState) {
  const res = await fetch(
    `http://api.airvisual.com/v2/cities?state=${selectedState}&country=USA&key=${AIR_VISUAL_API_KEY}`
  );

  const data = await res.json();
  const citiesArr = data.data;

  for (let i = 0; i < citiesArr.length; i++) {
    const createObj = {
      city: `${citiesArr[i].city}`,
      state: selectedState,
    };

    citiesState.push(createObj);
  }
}

// show results from user typing
function outputSearchResults(searchResults) {
  searchResultsGlass.style.visibility = 'visible';

  const createHTML = searchResults
    .map((item) => {
      return ` <li class="list-group-item d-flex justify-content-between align-items-center px-md-5" data-city = ${item.city} data-state = ${item.state}>
    ${item.city}, ${item.state}
    <button class="btn btn-primary btn-selection" type="button">Select</button>
</li>`;
    })
    .join('');

  listGroup.innerHTML = createHTML;

  const btnSelection = document.querySelectorAll('.btn-selection');
  btnSelection.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      getAQ(e);
    });
  });
}

// get air quality info from API
async function getAQ(e) {
  const selectedCity = e.target.parentElement.dataset['city'];
  const selectedState = e.target.parentElement.dataset['state'];

  const res = await fetch(
    `http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=${AIR_VISUAL_API_KEY}`
  );
  const data = await res.json();
  const cityData = data.data;

  console.log(cityData);

  displayAQ(cityData);
}

// display air quality info to user
function displayAQ(cityData) {
  // variables
  const city = cityData.city;
  const state = cityData.state;
  const airPollution = cityData.current.pollution.aqius;
  const humidity = cityData.current.weather.hu;
  const tempFahr = convertCelciusToFahrenheit(cityData.current.weather.tp);
  const timeStamp = cityData.current.weather.ts;
  const mphWind = convertMPStoMPH(cityData.current.weather.ws);

  const aqDescription = getAQDescrip(airPollution);

  // gather user output fields
  const domCityState = document.getElementById('search-city-state');
  const domAQ = document.getElementById('air-quality');
  const domAQDescrip = document.getElementById('aq-description');
  const domTemp = document.getElementById('temp');
  const domHumidity = document.getElementById('humidity');
  const domWindSpeed = document.getElementById('wind-speed');
  const domTimeStamp = document.getElementById('time-stamp');

  // hide search screen
  searchScreen.style.visibility = 'hidden';
  searchResultsGlass.style.visibility = 'hidden';
  selectCity.style.visibility = 'hidden';

  // show selection screen
  selectionScreen.style.visibility = 'visible';

  // display results on screen;
  domCityState.textContent = `${city}, ${state}`;
  domAQ.textContent = airPollution;
  domAQDescrip.textContent = aqDescription;
  domTemp.textContent = tempFahr;
  domHumidity.textContent = `${humidity}%`;
  domWindSpeed.textContent = `${mphWind} mph`;
  domTimeStamp.textContent = timeStamp;
}

// convert celcius to fahrenheit
function convertCelciusToFahrenheit(celcius) {
  const fahr = Math.round((celcius * 9) / 5 + 32);
  return fahr;
}

// convert meters per second to miles per hour
function convertMPStoMPH(mps) {
  const mph = Math.round(mps * 2.23694);
  return mph;
}

// determine the AQ description
function getAQDescrip(aq) {
  switch (true) {
    case aq < 51:
      return 'Air quality is satisfactory, and air pollution poses little or no risk.';
    case aq < 101:
      return 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
    case aq < 151:
      return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    case aq < 201:
      return 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
    case aq < 301:
      return 'Health alert: The risk of health effects is increased for everyone.';
    case aq < 1000:
      return 'Health warning of emergency conditions: everyone is more likely to be affected.';
  }
}
