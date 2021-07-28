import { bootstrapTooltip } from './utils/customBootStrap.js';

const btnHome = document.getElementById('btn-home');
const btnSearch = document.getElementById('btn-search');
const btnIP = document.getElementById('btn-ip');
const btnGroup = document.getElementById('btn-group');

const sectionHome = document.querySelector('.home');
const sectionSearch = document.querySelector('.search');
const sectionSelection = document.querySelector('.selection');

window.addEventListener('load', () => {
  bootstrapTooltip();

  btnHome.addEventListener('click', () => {
    sectionHome.style.visibility = 'visible';
    sectionSearch.style.visibility = 'hidden';
    sectionSelection.style.visibility = 'hidden';
    btnGroup.style.visibility = 'hidden';
  });

  btnSearch.addEventListener('click', () => {
    sectionHome.style.visibility = 'hidden';
    sectionSearch.style.visibility = 'visible';
    sectionSelection.style.visibility = 'hidden';
  });
});

// const cityState = [];

// async function fetchStates() {
//   const res = await fetch(AIR_API_CALL.states);
//   const data = await res.json();
//   const statesArr = data.data;

//   const arrayOfStates = [];

//   for (let i = 0; i < statesArr.length; i++) {
//     const state = statesArr[i].state;
//     arrayOfStates.push(state);
//   }

//   console.log(arrayOfStates);
//   fetchCities(arrayOfStates[0]);
// }

// async function fetchCities(state) {
//   const res = await fetch(
//     `http://api.airvisual.com/v2/cities?state=${state}&country=USA&key=${AIR_VISUAL_API_KEY}`
//   );

//   const data = await res.json();
//   const citiesArr = data.data;

//   for (let i = 0; i < citiesArr.length; i++) {
//     console.log(citiesArr[i].city);
//     const createObj = {
//       city: `${citiesArr[i].city}`,
//       state: `${state}`,
//     };

//     cityState.push(createObj);
//   }
// }

// console.log(cityState);

// fetchStates();
