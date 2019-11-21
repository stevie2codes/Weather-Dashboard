let searchBox = $("#searchBox");


$(document).ready(function () {

    let time = moment().format("LLLL");
    $("#time").text(time);

console.log("hi")
    let myKey = "751635dd458149957afa00a64308bc08";

    /*when user inputs a paramater a new li is added 
    and the api is called then displayed in main card*/

    let citySaver = text => {
        let li = document.createElement('li');
        li.textContent = text;
        $("#cityList").append(li);
    }

    $("button").on("click",function(event){
        event.preventDefault();
        let userInput = $(this).val();
        citySaver(userInput);
        console.log("hello there");
        
    })















});