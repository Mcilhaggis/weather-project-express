const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser")

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
    
});
//Recievese the input fom the form
app.post("/", function(req, res){
    console.log("post request recieved")

const query = req.body.cityName
const apiKey = "6b0d5c546226a11c17010c1077322954"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            //taking data from the API and making it a JS object
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherType = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
//once we use send it signals the end, you cnnot have more than one res.send per file.
            res.send(`<p>The weather is ${weatherType}</p>
            <h1>The temperature in ${query} is ${temp} degree celsius</h1>
            <img src="${imageURL}">`)
        })
    });
})




app.listen(PORT, function(){
    console.log(`The server is running on port : ${PORT}`)
});
