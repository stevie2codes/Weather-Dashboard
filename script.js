let searchBox = $("#searchBox");


$(document).ready(function () {

    let time = moment().format("LLLL");
    $("#time").text(time);

console.log("hi")
    let myKey = "751635dd458149957afa00a64308bc08";

    /*when user inputs a paramater a new li is added 
    and the api is called then displayed in main card*/

    function citySaver(text){
        let listEl = document.createElement("<li>");
        listEl.text(searchBox).val();
        $(listEl).append("#cityList");
    }

    

    $("button").on("click",function(event){
        event.preventDefault();
        let userInput = $(this).val();
        citySaver();
        console.log("hello there");
        
    })















});