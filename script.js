let searchBox = $("#searchBox");


$(document).ready(function () {

    let time = moment().format("LL");
    $("#time").text(time);


    let myKey = "751635dd458149957afa00a64308bc08";

    /*when user inputs a paramater a new li is added 
    and the api is called then displayed in main card*/

    

    

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
           let city = $("<h2>").text(`City: ${response.name}`);
           let date = $("<h3>").text(`Date: ${time}`);
           let iconImage = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
           let temp = $("<h4>").text(`Current temperature: ${response.main.temp}`) 
           
            //Appending the values to the figure box
           $(".figure").append(city,date, iconImage,temp);


       })

       
    })















});