import { bootstrapTooltip } from './utils/customBootStrap.js';
// import { AIR_API_CALL } from './utils/apiCalls.js';
// import { AIR_VISUAL_API_KEY } from './utils/apiKey.js';

const cityBtn = document.getElementById('city-btn');
const ipBtn = document.getElementById('ip-btn');
const btnHome = document.getElementById('btn-home');
const btnSearch = document.getElementById('btn-search');
const btnIP = document.getElementById('btn-ip');
const btnGroup = document.getElementById('btn-group');

const homeScreen = document.querySelector('.home');
const searchScreen = document.querySelector('.search');
const selectionScreen = document.querySelector('.selection');

const userInput = document.querySelector('input');
const listGroup = document.querySelector('.list-group');

window.addEventListener('load', () => {
  bootstrapTooltip();

  btnHome.addEventListener('click', () => {
    homeScreen.style.visibility = 'visible';
    searchScreen.style.visibility = 'hidden';
    selectionScreen.style.visibility = 'hidden';
    btnGroup.style.visibility = 'hidden';
  });

  btnSearch.addEventListener('click', () => {
    homeScreen.style.visibility = 'hidden';
    searchScreen.style.visibility = 'visible';
    selectionScreen.style.visibility = 'hidden';
    btnGroup.style.visibility = 'visible';
  });

  cityBtn.addEventListener('click', () => {
    searchScreen.style.visibility = 'visible';
    homeScreen.style.visibility = 'hidden';
    selectionScreen.style.visibility = 'hidden';
    btnGroup.style.visibility = 'visible';
  });

  ipBtn.addEventListener('click', () => {
    selectionScreen.style.visibility = 'visible';
    homeScreen.style.visibility = 'hidden';
    searchScreen.style.visibility = 'hidden';
    btnGroup.style.visibility = 'visible';
  });

  userInput.addEventListener('keyup', searchCities);
});

const cityState = [];

async function fetchStates() {
  const res = await fetch(AIR_API_CALL.states);
  const data = await res.json();
  const statesArr = data.data;

  const arrayOfStates = [];

  for (let i = 0; i < statesArr.length; i++) {
    const state = statesArr[i].state;
    arrayOfStates.push(state);
  }

  console.log(arrayOfStates);
  fetchCities(arrayOfStates[0]);
}

async function fetchCities(state) {
  const res = await fetch(
    `http://api.airvisual.com/v2/cities?state=${state}&country=USA&key=${AIR_VISUAL_API_KEY}`
  );

  const data = await res.json();
  const citiesArr = data.data;

  for (let i = 0; i < citiesArr.length; i++) {
    const createObj = {
      city: `${citiesArr[i].city}`,
      state,
    };

    cityState.push(createObj);
  }

  showReturn(cityState);
}

fetchStates();

function showReturn(cityState) {
  console.log(`This is the city and state:`);
  console.log(cityState);
}

function searchCities(e) {
  const typed = e.target.value;

  results.innerHTML = '';

  if (typed.length < 3) return;

  const searchResults = cityState.filter((city) => {
    return city.city.includes(typed);
  });

  outputSearchResults(searchResults);
}

function outputSearchResults(searchResults) {
  const createHTML = searchResults
    .map((result) => {
      return `<li class="list-group-item d-flex justify-content-between align-items-center px-md-5">
    ${result.city}, ${result.state}
    <button class="btn btn-primary" type="button">Select</button>
</li>`;
    })
    .join('');

  listGroup.innerHTML = createHTML;
}
