$(document).ready(function(){
    
    var startSearch = function(userInput){
        console.log("search started");
        var APIKey = "9f7d706ef6d3f4a96f60c4354887012e";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response){
                $.ajax({
                    url: queryURL,
                    method: "GET"
                });
                console.log(response) 
                
                var tempFahrenheit = Math.round(((response.main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit)
                var windSpeed = response.wind.speed;
                console.log(windSpeed);
                var humidity = response.main.humidity;
                var windSpeed = response.wind.speed;
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                console.log(lat, lon);
                var weatherIcon = response.weather[0].icon;
                console.log(weatherIcon);
        
                $("#cityName").html(`${response.name}`);
                $("#currentDay").html(moment().format('(MM/DD/YYYY)'));//refactoring later to make getting time from API
                $("#weatherIcon").empty().append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);
                $("#temperature").html(`Temperature: ${tempFahrenheit} &degF`);
                $("#humidity").html(`Humidity: ${humidity} %`);
                $("#windSpeed").html(`Wind Speed: ${windSpeed} MPH`);
                var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLuv,
            method: "GET"
            }).then(function(response){
                $.ajax({
                    url: queryURLuv, 
                     method: 'GET'
                });
                console.log(response);
                
                var uvlIndex = response.value;
                $("#uvl-display").html(`UV Index: <span id="UV">${uvlIndex}</span>`);
                if (uvlIndex <=2){
                    console.log("UV green");
                    $("#UV").addClass("greenUV");
                    } else if (uvlIndex <=7){
                        console.log("UV orange");
                        $("#UV").addClass("orangeUV");
                    } else {
                    console.log("UV red");
                    $("#UV").addClass("redUV");
                };
            });
        });
    };
    
    var history =[];

    var addToHistory = function(userInput){
        if (userInput!=0 && history.length <10){
            $("#searchHistory").append(`<tr><th class="itemInHistory" scope="row">${userInput}</th></tr>`)
            history.push(userInput);
            console.log(history);
        // code in process
        // } else {
        //     $("#searchHistory").html(`<tr><th scope="row">${userInput}</th></tr>`)
        };
    };
    
    $(".btn").click(function(){
        event.preventDefault(); 
        var userInput = $("#cityInput").val();
        console.log(userInput);
        localStorage.setItem("searchHistory", userInput);
        startSearch(userInput);
        addToHistory(userInput);
    });

    $(".itemInHistory").click(function(){
        console.log("TH BEEN HITED");
    });  
});

 
  