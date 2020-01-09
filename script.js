var APIKey = "c13e04947c2be5e5395114b35df8f00d";
var citySrchList = [];
var city = $("#city-input").val().trim();




//$(this).attr("data-name"))

$("#search-city").on("click", function(event) {
    event.preventDefault();
    // $("#current").empty();
    // $("#future").empty();
    //This line grabs the input from the textbox
    city = $("#city-input").val().trim();
    console.log(city);
    citySrchList.push(city);
    renderCityButtons();
    //display weather
    displayWeather(city);

});

function renderCityButtons (){
    // Deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#search-history").empty();
    // Looping through the array of movies
    for (var i = 0; i < citySrchList.length; i++) {
        // Then dynamicaly generating buttons for each city in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of city-btn to our button
        a.addClass("city-btn");
        // Adding a data-attribute
        a.attr("data-name", citySrchList[i]);
        // Providing the initial button text
        a.text(citySrchList[i]);
        // Adding the button to the buttons-view div
        $("#search-history").append(a);
    }
}

function displayWeather(city){
    $("#current").empty();
    $("#future").empty();
    // This line grabs the input from the textbox
    //var city = $(this).attr("data-name");
    console.log(city);
    
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&appid=" + APIKey;
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    console.log(forecastQueryURL);
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(response);
            var currentWeatherDiv = $("<div>");
            var cityName = response.name;
            var cityHeader = $("<h1>").text(cityName);
            currentWeatherDiv.append(cityHeader);

            var temp = Math.floor(response.main.temp);
            var pTemp = $("<p>").text( "Temperature: " + temp);
            currentWeatherDiv.append(pTemp);

            var humd = response.main.humidity;
            var pHumd = $("<p>").text( "Humidity: " + humd);
            currentWeatherDiv.append(pHumd);

            var windSpeed = response.wind.speed;
            var pWind = $("<p>").text( "Wind Speed: " + windSpeed);
            currentWeatherDiv.append(pWind);

            //========UV Index to be calculated==================
            // var uvIndex = response.main.speed;
            // var pWind = $("<p>").text( "Wind Speed: " + windSpeed);
            // currentWeatherDiv.append(pWind);
            //========UV Index to be calculated==================
            
            currentWeatherDiv.append(pWind);
            $("#current").append(currentWeatherDiv);    
            
            //citySrchList.push(city);
            //renderCityButtons();

        });

        $.ajax({
            url: forecastQueryURL,
            method: "GET"
            })
            // We store all of the retrieved data inside of an object called "forecast"
            .then(function(forecast){

            console.log(forecast);
    
            for(i=0; i<5; i++){
                var k = 8 * i +2; 
                var futureWeatherDiv = $("<div class = 'col'>");
                var futureDate = forecast.list[k].dt_txt;                    
                var fDate = $("<p>").text(futureDate.substring(0,10));
                futureWeatherDiv.append(fDate);

                var futureTemp = Math.floor(forecast.list[k].main.temp);
                var fTemp = $("<p>").text( "Temperature: " + futureTemp);
                futureWeatherDiv.append(fTemp);
                

                var futureHumd = Math.floor(forecast.list[k].main.humidity);
                var fHumd = $("<p>").text( "Humidity: " + futureHumd);
                futureWeatherDiv.append(fHumd);

                $("#future").append(futureWeatherDiv);                
            }

        });  
}

//$("#search-history").on("click", displayWeather("null"));

$("#search-history").on("click", function(event) {
    //This line grabs the name of the city button    
    city = event.target.textContent;
    //display weather
    displayWeather(city);

});