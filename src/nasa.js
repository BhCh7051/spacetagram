import { API_KEY } from "./secrets";

const BASE_IMAGE_URL = `https://images-api.nasa.gov`;
const APOD_BASE_IMAGE_URL = `https://api.nasa.gov/planetary/apod`;
const COUNT = 30;

export function getRandomImages() {
  const URL = `${APOD_BASE_IMAGE_URL}?api_key=${API_KEY}&count=${COUNT}`;
  return fetch(URL);
}

export function searchImages(searchTerm) {
  const URL = `${BASE_IMAGE_URL}/search?q=${searchTerm}&media_type=image`;
  return fetch(URL);
}
