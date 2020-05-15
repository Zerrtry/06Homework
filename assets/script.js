


$(document).ready(function(){
    // var history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    // console.log(history);
    var history =[];

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
                $("#weatherIcon").empty().append(`<img src = "https://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);
                $("#temperature").html(`Temperature: ${tempFahrenheit} &degF`);
                $("#humidity").html(`Humidity: ${humidity} %`);
                $("#windSpeed").html(`Wind Speed: ${windSpeed} MPH`);

        var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLuv,
            method: "GET"
            }).then(function(response){
                $.ajax({
                    url: queryURLuv, 
                    method: 'GET'
                });                
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
        
        var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;
        $.ajax({
            url: queryURLforecast,
            method: "GET"
            }).then(function(response){
                $.ajax({
                    url: queryURLuv, 
                     method: 'GET'
                });
                console.log("5days", response);
                // day 1st
                var tempFahrenheit1 = Math.round(((response.list[4].main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit1);
                var humidity1 = response.list[4].main.humidity;
                console.log(humidity1);
                var weatherIcon1 = response.list[4].weather[0].icon;
                console.log(weatherIcon1); 
                var getdate1 = response.list[4].dt;
                console.log(getdate1);
                var newdate1 = new Date(getdate1*1000);
                var date1 = newdate1.getDate();
                var year1 = newdate1.getFullYear(); 
                var month1 = newdate1.getMonth();
                console.log(month1, "/", date1, "/", year1);
                $("#day1").empty().append(`<div class="card text-white bg-primary fcard" style="max-width: 18rem;">
                <div class="card-header date">${month1}/${date1}/${year1}</div>
                <div class="card-body">
                  <p class="card-text icon"><img src = "https://openweathermap.org/img/wn/${weatherIcon1}.png"></p>
                  <p class="card-text temp">Temp: ${tempFahrenheit1} &degF</p>                        
                  <p class="card-text hum">Humidity: ${humidity1} %</p>
                </div>
                </div>`);
                // day 2nd
                var tempFahrenheit2 = Math.round(((response.list[12].main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit2);
                var humidity2 = response.list[12].main.humidity;
                console.log(humidity2);
                var weatherIcon2 = response.list[12].weather[0].icon;
                console.log(weatherIcon2); 
                var getdate2 = response.list[12].dt;
                console.log(getdate2);
                var newdate2 = new Date(getdate2*1000);
                var date2 = newdate2.getDate();
                var year2 = newdate2.getFullYear(); 
                var month2 = newdate2.getMonth();
                console.log(month2, "/", date2, "/", year2);
                $("#day2").empty().append(`<div class="card text-white bg-primary fcard" style="max-width: 18rem;">
                <div class="card-header date">${month2}/${date2}/${year2}</div>
                <div class="card-body">
                    <p class="card-text icon"><img src = "https://openweathermap.org/img/wn/${weatherIcon2}.png"></p>
                    <p class="card-text temp">Temp: ${tempFahrenheit2} &degF</p>                        
                    <p class="card-text hum">Humidity: ${humidity2} %</p>
                </div>
                </div>`);
                // day 3d
                var tempFahrenheit3 = Math.round(((response.list[20].main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit3);
                var humidity3 = response.list[20].main.humidity;
                console.log(humidity3);
                var weatherIcon3 = response.list[20].weather[0].icon;
                console.log(weatherIcon3); 
                var getdate3 = response.list[20].dt;
                console.log(getdate3);
                var newdate3 = new Date(getdate3*1000);
                var date3 = newdate3.getDate();
                var year3 = newdate3.getFullYear(); 
                var month3 = newdate3.getMonth();
                console.log(month3, "/", date3, "/", year3);
                $("#day3").empty().append(`<div class="card text-white bg-primary fcard" style="max-width: 18rem;">
                <div class="card-header date">${month3}/${date3}/${year3}</div>
                <div class="card-body">
                <p class="card-text icon"><img src = "https://openweathermap.org/img/wn/${weatherIcon3}.png"></p>
                <p class="card-text temp">Temp: ${tempFahrenheit3} &degF</p>                        
                <p class="card-text hum">Humidity: ${humidity3} %</p>
                </div>
                </div>`);
                // day 4s
                var tempFahrenheit4 = Math.round(((response.list[28].main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit4);
                var humidity4 = response.list[28].main.humidity;
                console.log(humidity4);
                var weatherIcon4 = response.list[28].weather[0].icon;
                console.log(weatherIcon4); 
                var getdate4 = response.list[28].dt;
                console.log(getdate4);
                var newdate4 = new Date(getdate4*1000);
                var date4 = newdate4.getDate();
                var year4 = newdate4.getFullYear(); 
                var month4 = newdate4.getMonth();
                console.log(month4, "/", date4, "/", year4);
                $("#day4").empty().append(`<div class="card text-white bg-primary fcard" style="max-width: 18rem;">
                <div class="card-header date">${month4}/${date4}/${year4}</div>
                <div class="card-body">
                <p class="card-text icon"><img src = "https://openweathermap.org/img/wn/${weatherIcon4}.png"></p>
                <p class="card-text temp">Temp: ${tempFahrenheit4} &degF</p>                        
                <p class="card-text hum">Humidity: ${humidity4} %</p>
                </div>
                </div>`);
                // day 5s
                var tempFahrenheit5 = Math.round(((response.list[36].main.temp) - 273.15) * 1.80 + 32);
                console.log(tempFahrenheit5);
                var humidity5 = response.list[36].main.humidity;
                console.log(humidity5);
                var weatherIcon5 = response.list[36].weather[0].icon;
                console.log(weatherIcon5); 
                var getdate5 = response.list[36].dt;
                console.log(getdate5);
                var newdate5 = new Date(getdate5*1000);
                var date5 = newdate5.getDate();
                var year5 = newdate5.getFullYear(); 
                var month5 = newdate5.getMonth();
                console.log(month5, "/", date5, "/", year5);
                $("#day5").empty().append(`<div class="card text-white bg-primary fcard" style="max-width: 18rem;">
                <div class="card-header date">${month5}/${date5}/${year5}</div>
                <div class="card-body">
                <p class="card-text icon"><img src = "https://openweathermap.org/img/wn/${weatherIcon5}.png"></p>
                <p class="card-text temp">Temp: ${tempFahrenheit5} &degF</p>                        
                <p class="card-text hum">Humidity: ${humidity5} %</p>
                </div>
                </div>`);
            });
        });
    };

    var addToHistory = function(userInput){
        if (userInput!=0 && history.length <10){
            $("#searchHistory").append(`<tr><th class="cityInHistory" scope="row">${userInput}</th></tr>`)
            history.push(userInput);
            console.log(history);
            localStorage.setItem("searchHistory", history);
        // code in process
        // } else {
        //     $("#searchHistory").html(`<tr><th class="cityInHistory" scope="row">${userInput}</th></tr>`)
        };
    };
    
    $(document).on("click",".btn", function(){
        event.preventDefault(); 
        var userInput = $("#cityInput").val();
        console.log(userInput);
        startSearch(userInput);
        addToHistory(userInput);
    });

    $(document).on('click','.cityInHistory', function(){
        console.log("TH BEEN HITED");
        var userInput = $(this).text();
        console.log(userInput);
        startSearch(userInput);
    });  
});
