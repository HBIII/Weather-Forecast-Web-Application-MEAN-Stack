# Weather-Forecast-Web-Application-MEAN-Stack

# Overview
This responsive application allows users to search for weather information based on the current location or any other location entered by the user. The results will be displayed in Currently, Hourly and Weekly tabs which on clicking, provides a detailed description for that particular tab. The detailed description provides interactive UI along with charts via Chart.js and Canvas.js. The application also allows to post on Twitter the current weather updates.

# Technolgies Used
Node.js, Express, Angular 7, TypeScript, Bootstrap, AJAX, JSON, APIs, HTML5, CSS, Amazon Web Services.

# APIs Used
Google Geocoding API, Forecast.io DarkSky API, IP API, Places AutoComplete API, Twitter API, Google Custom Search API

# Features
1. Autocomplete is implemented using Places AutoComplete API and Angular Material.
2. Real time validations are performed using two way data binding in Angular.
3. Users can search weather for current location which is caught using IP API.
4. In case the user want to share the weather they can do this using Twitter button which calls Twitter API and shares the weather details with a custom message, which users can write before sharing.
5. State Seal Images are obtained using Google Custom Search.
6. Bootstrap is used to make the website responsive and mobile friendly. 
7. Error Handling for edge cases has been implmeneted (No city in favorite, same city in favorite etc).
8. Interactive Graphs and Charts are implemented using Chart.js and Canvas.js.
9. Modal Dialog Box added to provide detailed information in Weekly tab using Bootstrap.
