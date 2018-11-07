# React Neighborhood map

![Image of Neighborhood program](/src/neighborhood.png)

This project is a neighborhood map with markers on parks surrounding the Las Vegas, NV area.

## Get Started

Download or clone the repository. Place your map API id on the file Map.js replacing your key on line 34 with your token from Google Maps API.YOUR-KEY. Then run the command `npm install` then `npm start` in the terminal.


## What was used to make this App

 * React
 * Google maps API
 * Foursquare API [documentation](https://developer.foursquare.com/docs/api/endpoints)
 * Axios `npm install axios`
 * Bootstrap

## Service Workers

 When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.
 For production mode run:

 * `npm run build`
 * `npm install -g serve`
 * `serve -s build`
 * open the app on `localhost:3000`
