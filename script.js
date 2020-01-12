var APIKey = "c13e04947c2be5e5395114b35df8f00d";
var citySrchList = [];
var city="Hartford";
var currentDay = moment().format(" MM/DD/YYYY");

var storedCityList = JSON.parse(localStorage.getItem("citySrchList"));
if(storedCityList != null){
    //move data from storedCityList to CitySrchList
    citySrchList = storedCityList.slice();
    renderCityButtons();
    displayWeather(city);
}

$(".btn-primary").click(); 

//$(this).attr("data-name"))

$("#search-city").on("click", function(event) {
    event.preventDefault();
    // $("#current").empty();
    // $("#future").empty();
    //This line grabs the input from the textbox    
    city = $("#city-input").val().trim();
    if(city == ""){
        return;
    }else {
        displayWeather(city);
    }
});

function renderCityButtons (){
    // Deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#search-history").empty();
    // Looping through the array of citiesf
    for (var i = 0; i < citySrchList.length; i++) {
        // Then dynamicaly generating buttons for each city in the array
        
        var a = $("<button>");
        // Adding a class of city-btn to our button
        a.addClass("city-btn Collapsible");
        // Adding a data-attribute
        a.attr("data-name", citySrchList[i]);
        // Providing the initial button text
        a.text(citySrchList[i]);
        // Adding the button to the buttons-view div
        $("#search-history").prepend(a);
    }
}

function displayWeather(city){
    $("#current").empty();
    $("#future").empty();
    
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&appid=" + APIKey;
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + APIKey;
 
 

    //  our AJAX call to the OpenWeatherMap API 
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {   

            var wIcon = (response.weather[0].icon);
            var iconURL = "http://openweathermap.org/img/wn/" + wIcon + ".png";

            //condition statement to check if the city entered by user is in already into the "citySrchList" array
            var city = response.name;
            if (citySrchList.indexOf(city) < 0 ){
                
                //check if the length of the array is greater than 10 it will delete the array element at first position
                if(citySrchList.length >=10){
                    citySrchList.shift();
                }
                citySrchList.push(city);
                localStorage.setItem("citySrchList", JSON.stringify(citySrchList));
                renderCityButtons();   
            }
            var currentWeatherDiv = $("<div>");
            var cityName = response.name;
            var cityHeader = $("<h2>").text(cityName + " - "+currentDay);
            var wIcon = (response.weather[0].icon);
            var iconURL = "http://openweathermap.org/img/w/" + wIcon + ".png";


            console.log(iconURL);
            currentWeatherDiv.append(cityHeader );

            var iconEl = $("<img>").attr('src', iconURL);
            currentWeatherDiv.append(iconEl);

            // var icon = (response.weather[0].icon);
            // var cityHeader = $("<img>").text(cityName + " - "+currentDay);
            // currentWeatherDiv.append(cityHeader );
            

            var temp = Math.floor(response.main.temp);
            var pTemp = $("<p>").html( "Temperature: " + temp + " &#8457;");
            currentWeatherDiv.append(pTemp);

            var humd = response.main.humidity;
            var pHumd = $("<p>").text( "Humidity: " + humd + "%");
            currentWeatherDiv.append(pHumd);

            var windSpeed = response.wind.speed;
            var pWind = $("<p>").text( "Wind Speed: " + windSpeed);
            currentWeatherDiv.append(pWind);

            //========UV Index ==================
            var lon = response.coord.lon;
            var lat = response.coord.lat;
    
            uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: uvIndexURL,
                method: "GET"
                }).then(function(uvIndex){
                
                var uvIndexValue = uvIndex.value;
                var uvIndexEl = $("<p>").text(uvIndexValue);
                var uvLable = $("<lable>").text("UV Index:")
                var uvIndexValueInt = Math.floor(uvIndexValue);
                if(uvIndexValueInt <= 2){
                    uvIndexEl.addClass("low");
                }else if(uvIndexValueInt > 2 && uvIndexValueInt <= 5){
                    uvIndexEl.addClass("mod");
                }else if(uvIndexValueInt > 5 && uvIndexValueInt <= 7){
                    uvIndexEl.addClass("high");
                }
                else if(uvIndexValueInt > 7 &&  uvIndexValueInt <= 10){
                    uvIndexEl.addClass("vhigh");
                }
                else{uvIndexEl.addClass("exhigh");
                }
                currentWeatherDiv.append(uvLable);
                currentWeatherDiv.append(uvIndexEl);

             });
        
            //========UV Index==================
            
            currentWeatherDiv.append(pWind);
            $("#current").append(currentWeatherDiv);    
            

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
                    var futureDate = new Date((forecast.list[k].dt_txt).substring(0,10));  
                    var fDD = futureDate.getDate();
                    var fMM = futureDate.getMonth() + 1;
                    var fYYYY = futureDate.getFullYear();
                    var formattedDate = fMM + "/" + fDD + "/" + fYYYY;
                    var fDate = $("<p>").text(formattedDate);
                    wIcon = (forecast.list[k].weather[0].icon);
                    iconURL = "http://openweathermap.org/img/w/" + wIcon + ".png";
                    futureWeatherDiv.append(fDate);

                    iconEl = $("<img>").attr('src', iconURL);
                    futureWeatherDiv.append(iconEl);





    
                    var futureTemp = Math.floor(forecast.list[k].main.temp);
                    var fTemp = $("<p>").html( "Temperature: " + futureTemp  + " &#8457;");
                    futureWeatherDiv.append(fTemp);
                    
    
                    var futureHumd = Math.floor(forecast.list[k].main.humidity);
                    var fHumd = $("<p>").text( "Humidity: " + futureHumd + "%");
                    futureWeatherDiv.append(fHumd);
    
                    $("#future").append(futureWeatherDiv);                
                }
                
    
            });



        }).fail(function() {
        //TODO: error prompt
        //om the current div display text Enter Valid US City!
            var currentWeatherDiv = $("<div>");
            //var cityName = response.name;
            var cityHeader = $("<h3>").text("City not found. Please enter valid city in US.");
            currentWeatherDiv.append(cityHeader );
            $("#current").append(currentWeatherDiv); 
        });

         
}

//$("#search-history").on("click", displayWeather("null"));

$("#search-history").on("click", function(event) {
    //This line grabs the name of the city button    
    city = event.target.textContent;
    displayWeather(city);

});