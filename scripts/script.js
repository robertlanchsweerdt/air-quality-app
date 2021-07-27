import { AIR_API_CALL } from './utils/apiCalls.js';
import { AIR_VISUAL_API_KEY } from './utils/apiKey.js';

fetch(
  'http://api.airvisual.com/v2/cities?state=New York&country=USA&key=aca06d53-4ecd-4733-a7aa-fa5f1d849c83'
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));

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
