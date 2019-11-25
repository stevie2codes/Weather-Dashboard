
$(document).ready(function () {

    $("#search-btn").click(weatherNow);
    $("#search-btn").click(fiveDayForecast);

    let time = moment().format("LL");
    let myKey = "751635dd458149957afa00a64308bc08";
    $(".figure").css("display", "none");
    $("#search-container").css("left", "320px");

    //Search button makes it all happen  
    function weatherNow(event) {
        event.preventDefault();
        $(".figure").empty(); //empty search results upon each new search
        $("#search-container").animate({ left: "10px" }, "400ms");
        let userInput = $(this).prev().val(); //getting value of user input
        let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&APPID=" + myKey;
        let userInputCreateEl = $('<li>').addClass("created-city btn btn-light").text(userInput);
        //calling the API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".figure").css("display", "block");
            //setting the values to a new DOM element 
            let city = $("<h1>").addClass("city-name").text(`City: ${response.name}`);
            let date = $("<h3>").addClass("date").text(`Date: ${time}`);
            let iconImage = $("<img>").addClass("icon-image").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            let tempF = parseInt((response.main.temp - 273.15) * 1.8 + 32); //kelvin to farenheight Conversion
            let temperature = $("<h4>").addClass("current-temp").text(`Current Temperature: ${tempF} F°`);
            let humidity = $("<h4>").addClass("humidity").text(`Humidity: ${response.main.humidity}%`);
            let windSpeed = $("<h4>").addClass("wind-speed").text(`Wind Speed ${response.wind.speed} mph`)
            //Appending the values to the figure box
            $(".figure").append(city, iconImage, date, temperature, humidity, windSpeed);
            $("#cityList").append(userInputCreateEl);
        })
    }
    //end current day call begin Five day forecast call
    function fiveDayForecast() {
        let userInput = $(this).prev().val(); //getting value of user input    
        let dayDisplay = 1;
        let fiveDayCall = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&APPID=" + myKey;
        //calling the 5 day forecast
        $.ajax({
            url: fiveDayCall,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let listArray = response.list;
            listArray.forEach(element => {   //use for each method to loop through object list
                //   console.log(element);
                let yearDateTime = element.dt_txt;
                //    console.log (yearDatetime);    
                let currentDate = yearDateTime.split(" ")[0]; //splitting the full date
                let currentTime = yearDateTime.split(" ")[1]; //and time  in the object

                if (currentTime === "15:00:00") {
                    let day = currentDate.split("-")[2];
                    let month = currentDate.split("-")[1];
                    let year = currentDate.split("-")[0];
                    $("#day-" + dayDisplay).children(".date-display").html(`${month}/${day}/${year}`);
                    $("#day-" + dayDisplay).children("#daily-icon").attr("src", "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png");
                    $("#day-" + dayDisplay).children("#daily-temp").html(`Temperature: ${parseInt((element.main.temp - 273.15) * 1.8 + 32)}°F`);
                    $("#day-" + dayDisplay).children("#5day-humidity").html(`Humidity: ${element.main.humidity}% `);
                    dayDisplay++

                }
            })
        })
    }


    function saveInput(event) {

        localStorage.setItem("City", userInput);
    };

    $("ul").on("click", function (event) {
        saveInput(localStorage.getItem("City"));

    })


});