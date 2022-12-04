const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "5b15ad0839c67048eecaa6dff041ad10";
  const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=imperial";
  https.get(apiURL, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>Weather in " + query + " is: " + temperature + "</h1>");
      res.write("<p>Weather is: " + weatherDescription + "</p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + `${port}`);
});
