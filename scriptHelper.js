// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
    let div = document.getElementById("missionTarget");
    div.innerHTML=
        `<h2>Mission Destination</h2>
   <ol>
       <li>Name: ${name}</li>
       <li>Diameter: ${diameter}</li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance}</li>
       <li>Number of Moons: ${moons}</li>
   </ol>
   <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    }
    else if (isNaN(testInput)) {
        return "Not a Number"
    }
    else if (!isNaN(testInput)) {
        return "Is a number"
    }
}

//on implementing formSubmission
//this formSubmission function will be invoked inside the form submit event listener in script.js to validate all our inputs
//it has 5 parameters:
/* -document, which is just the document object so you just pass it document as its first parameter 
    -list which is the faultyItems div
    -pilot, which is the value of our pilotName input
    -copilot,
    -fuelLevel,
    -cargoLevel, value of cargoMass input*/

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //given all of these inputs, we now need to determine what are our conditions?
    //note that this will be a sizeable series of if/else if blocks (ONE LONG BLOCK OF IF ELSE BLOCKS!!!)
    /* CONDITION 1: all fields are required!
            if any value is empty, we need to send an alert that reads "All fields required!"(in the book?)
        CONDITION 2: make sure the data input in each field, is the right data type
            if pilot and/or copilot are numbers, alert the user
            if fuelLevel and/or cargoLevel are not numbers, alert the user 
            (refer to the hint on using the isNaN function)
        Based on these conditions, if we have gotten to this point and haven't had to alert the user that they entered bad data,
        we can assume that we have validated the input and we are good to go to start checking our fuel and cargo levels
       
        What if fuelLevel AND cargoLevel are LESS than 10000? 
        What if they are both greater than 10000?
        What if one is greater and one is less than? or the other way around?
        What should we do as a result of these conditions?

        In any of these cases, faulty items, our list parameter (faultyItems), should become visible.
        Also, the pilotStatus and copilotStatus should be updated using a template literal that would read something like:
            `nameOfPilot/nameOfCopilot is ready for launch`
        How do we update the text/html inside of an HTML element?
        Do we already have the the pilotStatus and copilotStatus HTML elemets selected, 
        or do we still need to select those to update them?

        If we are ready for launch, that means that we have enough fuel and our cargo mass is low enough.
        In any other case, we are not ready for launch.
        We'll need to update launchStatus text to reflect whether or not we are ready for launch as well.
        Just like pilotStatus and copilotStatus, do we need to select launchStatus?

        you might select all your necessary elements before
    */
    let fuel = document.getElementById("fuelStatus");
    let cargo = document.getElementById("cargoStatus");
    // let pilot = document.getElementById("pilotStatus");
    // let copilot = document.getElementById("copilotStatus") ;
     
    


    if (validateInput(pilot) === "Empty"||validateInput(copilot)==="Empty"||validateInput(fuelLevel)==="Empty"||validateInput(cargoLevel)==="Empty") {
        alert("All fields are required ");
    } else if (validateInput(pilot) === "Is a number"||validateInput(copilot) === "Is a number"||validateInput(fuelLevel) === "Not a Number"||validateInput(cargoLevel) === "Not a Number"){
        alert("Please input a valid data type");
   } else {
       list.style.visibility = "visible";
       pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
       copilotStatus.innerHTML = `Co-Pilot ${copilot} is ready for launch`;
       let launchStatus = document.getElementById("launchStatus");
       
       if(fuelLevel < 10000 && cargoLevel <= 10000){
        fuel.innerHTML = 'Fuel Level too low for launch';
        cargo.innerHTML = 'Cargo load is low enough for launch';
        launchStatus.innerHTML = "Not ready for launch!";
        launchStatus.style.color = "#ff0000";
       }else if (fuelLevel >= 10000 && cargoLevel > 10000){
        fuel.innerHTML = "Fuel Level is high enough for launch";
        cargo.innerHTML = "Cargo load is too high for launch";
        launchStatus.innerHTML = "Not ready for launch!";
        launchStatus.style.color = "#ff0000";
       }else if (fuelLevel < 10000 && cargoLevel > 10000){
        fuel.innerHTML = "Fuel Level too low for launch";
        cargo.innerHTML = "Cargo load is too high for launch";
        launchStatus.innerHTML = "Not ready for launch!";
        launchStatus.style.color = "#ff0000";
       }else{
        fuel.innerHTML = "Fuel Level is sufficient for launch";
        cargo.innerHTML = "Cargo load is low enough for launch";
        launchStatus.innerHTML = "Ready for launch!";
        launchStatus.style.color = "#008000";
       }
       
   } 
 
}
async function myFetch(){
    let planetsReturned;
    //this function executes the fetch to our planets url
    //then it returns the json array we get as a Promise
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    if (response.status >= 400){
        throw new Error("Bad Response")
    }else{
        return response.json();
    }  
    });
    return planetsReturned;
}


//inplement the pick planet function 
//it takes an array of planet object
//it creates a random index and uses that index to select a random element from the inputted planets array
// 12.6.1. in the book
function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
