import axios from 'axios';

// TODO: We can store this in separate constant file
const API_URL_FOOD_LIST = 'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=DEMO_KEY';
const API_URL_FOOD_VIEW = 'https://api.nal.usda.gov/fdc/v1/food/';

export const getFoodList = () => axios.get(API_URL_FOOD_LIST);

export const getFood = (fdcid: any) => axios.get(`${API_URL_FOOD_VIEW}${fdcid}?api_key=DEMO_KEY`);