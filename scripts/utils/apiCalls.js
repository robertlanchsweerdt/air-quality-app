import { AIR_VISUAL_API_KEY } from './apiKey.js';

const city = 'South Bend';
const state = 'Indiana';
const country = 'USA';

const AIR_API_CALL = {
  states: `https://api.airvisual.com/v2/states?country=${country}&key=${AIR_VISUAL_API_KEY}`,

  cities: `http://api.airvisual.com/v2/cities?state=${state}}&country=${country}&key=${AIR_VISUAL_API_KEY}`,

  ipLocation: `http://api.airvisual.com/v2/nearest_city?key=${AIR_VISUAL_API_KEY}`,

  byCity: `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${AIR_VISUAL_API_KEY}`,
};

export { AIR_API_CALL };
