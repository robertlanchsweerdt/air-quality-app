import { bootstrapTooltip } from './utils/customBootStrap.js';

window.addEventListener('load', () => {
  bootstrapTooltip();
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
