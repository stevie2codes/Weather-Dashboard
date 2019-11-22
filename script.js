let searchBox = $("#searchBox");


$(document).ready(function () {

    let time = moment().format("LL");
    $("#time").text(time);

    let myKey = "751635dd458149957afa00a64308bc08";

    


    $("button").on("click",function(event){
        event.preventDefault();
        $(".figure").empty(); //empty search results upon each new search

        let userInput = $(this).prev().val(); //getting value of user input
        let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&APPID=" + myKey;
        //calling the API
       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response){ 
           console.log(response);
           //setting the values to a new DOM element 
           let city = $("<h1>").addClass("city-name").text(`City: ${response.name}`); 
           let date = $("<h3>").addClass("date").text(`Date: ${time}`); 
           let iconImage = $("<img>").addClass("icon-image").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
           let tempF = parseInt((response.main.temp - 273.15) * 1.8 + 32); //kelvin to farenheight Conversion
           let temperature = $("<h4>").addClass("current-temp").text(`Current Temperature: ${tempF} F°`); 
           let humidity = $("<h4>").addClass("humidity").text(`Humidity: ${response.main.humidity}%`);
           let windSpeed = $("<h4>").addClass("wind-speed").text(`Wind Speed ${response.wind.speed}`)
           
            //Appending the values to the figure box
           $(".figure").append(city,iconImage, date, temperature, humidity,windSpeed);


       })

       
    })















});