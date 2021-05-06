import axios from 'axios';

//Make an HTTP request to the correct endpoint:
const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/jAZ7wJCa5hPFbReuIvfx7Ab6GEoaxJvv',
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;