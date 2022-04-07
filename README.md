# Spacetagram

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b3bff3f-aa1c-47b7-a93d-b904091d6498/deploy-status)](https://app.netlify.com/sites/spacetagram-nasa/deploys)
![React](https://img.shields.io/badge/React-05122A&logo=react)
![React](https://img.shields.io/badge/Javascript-05122A)
![Yarn](https://img.shields.io/badge/Yarn-05122Al)
![Material-UI](https://img.shields.io/badge/Material--UI-05122A)
![GitHub last commit](https://img.shields.io/github/last-commit/BhCh7051/spacetagram-master)
![GitHub issues](https://img.shields.io/github/issues/BhCh7051/spacetagram-master)
![GitHub repo size](https://img.shields.io/github/repo-size/BhCh7051/spacetagram-master)

A Progressive web app (PWA) dedicated to sharing scientific images and videos, developed with React🚀 and NASA Image API

**Click [Here](https://spacetagram-nasa.netlify.app/) to view the Live Website**

---

### Features

- Search Images
- Download Images

### Technology Used

- **React**
    - **Material-UI** - Icons and Prebuilt Components
        - **react-router-dom** - To manage routing between different pages
- **Netlify** (Hosting service)

### Preview

<p align="center">
<img src="./public/spacetagram.gif" />
</p>

### Smartphone Preview

<p align="center">
<img src="./public/spacetagramMobile.gif" />
</p>

### To run this on Local machine

Firstly make sure that you have [Node](https://nodejs.org/en/download/)
and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)  installed.

- Clone the repo, install all the dependencies from package.json by typing

  ```yarn install```

- Create a API KEY from [Nasa { APIs }](https://api.nasa.gov/)

- Create a environment file `.env` inside root folder and place your api key as shown below

  ```dotenv
  REACT_APP_API_KEY = "PLACE YOUR API KEY HERE"
  ```

- Run app by typing

  ```
  yarn start
  ```

The local version of Spactagram defaults to port 3000, open up your browser and
type [`localhost:3000`](http://localhost:3000) into your browser. Now your app should be up and running.

**For complete usage information and detailed examples of api, visit
the [NASA Image and Video Library API documentation](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)**

### Content Copyright

#### Still Images, Audio Recordings, Video, and Related Computer Files for Non-Commercial Use

NASA content - images, audio, video, and computer files used in the rendition of 3-dimensional models, such as texture
maps and polygon data in any format - generally are not subject to copyright in the United States. You may use this
material for educational or informational purposes, including photo collections, textbooks, public exhibits, computer
graphical simulations and Internet Web pages. This general permission extends to personal Web pages.

**For more information visit [Media Usage Guidelines](https://www.nasa.gov/multimedia/guidelines/index.html)**
