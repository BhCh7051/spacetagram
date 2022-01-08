# nasa 

[![Netlify Status](https://api.netlify.com/api/v1/badges/990d8dc3-ee35-4e7a-ab1e-dedf979a97ac/deploy-status)](https://app.netlify.com/sites/mani-nasa/deploys)

A nasa  developed with React🚀 and nasa API

**Click [Here](https://mani-nasa.netlify.app/) to view the Live Website**

### Features

- Search Images
- Download Images

### Technology Used

- **React**
  - **Material-UI** - Icons and Prebuilt Components
  - **react-router-dom** - To manage routing between different pages
- **Netlify** (Hosting service)

### Preview

<img src="./public/preview.gif" />

### To run this on Local machine

-  the repo, install all the dependcies from package.json by typing `npm install`
- Create a API KEY from [nasa](https://nasa.com/oauth/applications)
- Create a file with name `secrets.js` inside `src` and place your api key as shown below

```javascript
export const API_KEY = "PLACE YOUR API KEY HERE";
```

- Run app by typing `npm start`
