const BASE_IMAGE_URL = `https://images-api.nasa.gov`;
const APOD_BASE_IMAGE_URL = `https://api.nasa.gov/planetary/apod`;
const COUNT = 60;

//  function to get random images from NASA API
export function getRandomImages() {
    const URL = `${APOD_BASE_IMAGE_URL}?api_key=${process.env.REACT_APP_API_KEY}&count=${COUNT}`;
    return fetch(URL);
}

// function to get images from NASA API based on search term
export function searchImages(searchTerm) {
    searchTerm = encodeURIComponent(searchTerm);
    const URL = `${BASE_IMAGE_URL}/search?q=${searchTerm}&media_type=image`;
    return fetch(URL);
}
