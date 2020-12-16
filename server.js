const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
});

let selectedAPI = '';
let url = '';
let apiTitle1 = '';
let apiTitle2 = `API </h2>`;
let apiFormName = '';
let apiActivationValue = '';
let apiForm = ''
let baseResult = '<!DOCTYPE html> <html lang="en">   <head>     <meta charset="UTF-8" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <link rel="stylesheet" href="style.css" />     <linkrel="shortcut icon"  href="assets/api-sea-icon.svg"       type="image/x-icon"/>  <script src="https://kit.fontawesome.com/549378180a.js" crossorigin="anonymous"     ></script>      <title>API Sea by Sergie</title>  </head>';
let baseResult2 = `<body> <div class="api__demo"> <div class="api__header"> <h2 class="api__header__title"> `
let returnButton = '<form action="/" method="get"> <button type="submit" class="api__header__return"> Back to API Sea </button> </form> </div>'
let apiValue = '';
let closing = `</div> </body>`

app.post("/", function (req, res) {
  
  selectedAPI = req.body.api;
  
switch (selectedAPI) {
  // TWITTER API
  case "twitter":
    let profile = req.body.twitterAccount
    let twitterProfile = '';
    if (profile.length < 1) {
      twitterProfile = "Twitter";  
    } else {
      twitterProfile = profile;
    }
    url = "https://platform.twitter.com/widgets.js";

    apiTitle1 = 'Twitter'
    apiFormName = 'twitterAccount';
    apiActivationValue = 'twitter';
    apiValue = `<a class="twitter-timeline" href="https://twitter.com/${twitterProfile}?ref_src=twsrc%5Etfw" data-width="100%" data-height="90vh"> Tweets by ${twitterProfile} </a>
<script async src="https://platform.twitter.com/widgets.js" chartset="utf-8"> </script>`

    https.get(url, function (response) {
      showResult(); 
    })
    break;

  // OPEN WEATHER API
  case "openWeather":
  const query = req.body.cityName;
  const openWeatherKey = process.env.openWeatherKey;
  const unit = "metric";
  url =  `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${openWeatherKey}&units=${unit}`;

  apiTitle1 = 'Open Weather'
  apiFormName = 'cityName';
  apiActivationValue = 'openWeather';
  
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      if (weatherData.cod == 200) {
      console.log(weatherData)
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const country = weatherData.sys.country;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";    
      apiValue = `<div class="open-weather"><img class="open-weather__image" src= ${imageURL}>
      <p class="open-weather__text">The temperature in ${query} (${country}) is currently ${temp} celsius degrees. The weather is currently ${desc} </p>   </div>`
    } else {
      apiValue = '<div class="open-weather"><p class="open-weather__text"> No city with that name was found. Please try again. </p></div>'
    }
      showResult();
    });
  })
  break;    
}

function showResult () {
  apiForm = ` <form class="api__search" action="/" method="post"> <input class="api__input" name="${apiFormName}" placeholder="Search again"> </input> <input class="invisible" name="api" value="${apiActivationValue}"> </input> <button type="submit" class="api__button"> Search </button> </form>`
  res.write(`
  ${baseResult}
  ${baseResult2}
  ${apiTitle1}
  ${apiTitle2}
  ${apiForm}
  ${returnButton}
  ${apiValue}
  ${closing}
  `);     
  
  res.send();
}

});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

