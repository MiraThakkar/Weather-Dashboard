var APIKey = "c13e04947c2be5e5395114b35df8f00d";
var citySrchList = [];
var city = $("#city-input").val().trim();


function renderCityButtons (){

    // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#search-history").empty();

        // Looping through the array of movies
        for (var i = 0; i < citySrchList.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of city-btn to our button
          a.addClass("city-btn ");
          // Adding a data-attribute
          a.attr("data-name", citySrchList[i]);
          // Providing the initial button text
          a.text(citySrchList[i]);
          // Adding the button to the buttons-view div
          $("#search-history").append(a);
        }
}






$("#search-city").on("click", function(event) {
    event.preventDefault();
    $("#current").empty();
    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();
    //console.log(city);
    
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&appid=" + APIKey;
    forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + APIKey;

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
            citySrchList.push(city);
            renderCityButtons();

        });

        $.ajax({
            url: forcastQueryURL,
            method: "GET"
            })
            // We store all of the retrieved data inside of an object called "forcast"
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
    // Calling renderButtons which handles the processing of our movie array

});














    // // Here we are building the URL we need to query the database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    //   "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

    // // Here we run our AJAX call to the OpenWeatherMap API
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // })
    //   // We store all of the retrieved data inside of an object called "response"
    //   .then(function(response) {

    //     // Log the queryURL
    //     console.log(queryURL);

    //     // Log the resulting object
    //     console.log(response);

    //     // Transfer content to HTML
    //     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    //     $(".wind").text("Wind Speed: " + response.wind.speed);
    //     $(".humidity").text("Humidity: " + response.main.humidity);
    //     $(".temp").text("Temperature (F) " + response.main.temp);

    //     // Converts the temp to Kelvin with the below formula
    //     var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    //     $(".tempF").text("Temperature (Kelvin) " + tempF);

    //     // Log the data in the console as well
    //     console.log("Wind Speed: " + response.wind.speed);
    //     console.log("Humidity: " + response.main.humidity);
    //     console.log("Temperature (F): " + response.main.temp);
    //   });