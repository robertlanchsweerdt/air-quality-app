import { AIR_API_CALL } from './apiCalls.js';

// export const info = () => {

//     fetch(AIR_API_CALL.states)
//     .then((res) => {
//         console.log(res)
//         return res.json()
//     })
//     .then((data) => console.log(data))

//     console.log('please enable fetch')

// }

const states = function () {
  fetch(AIR_API_CALL.states)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      const stateArr = data.data;
      return stateArr.map((state) => {
        return state;
      });
    });
};

states();

console.log(states);

export { states };
