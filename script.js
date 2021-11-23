// Write your JavaScript code here!



// const { formSubmission, pickPlanet, addDestinatid

window.addEventListener("load", function () {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        let selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
    });
    let list = document.getElementById("faultyItems");
    list.style.visibility ="hidden";
    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        //default behavior is that when we submit HTML forms, the form sends an HTTP request and refreshes the page. we don't want this to happen. We just want
        //the code in our form submit event listener to execute
        event.preventDefault();
        //the rest of our code in this form event listener, should go below this line
        
        //we now need to validate our form inputs using the dom and conditionals
        //we are going to use the formSubmission function to validate the values of each of our form inputs; pilotName, copilotName, fuelLevel, and cargoMass
        //before we can validate the input values, we need to select all of the form inputs with the dom (will be in the validation in js chapter 25.9.2)
        let pilotInput = document.querySelector("input[name=pilotName]");
        let pilot = pilotInput.value;
        let copilotInput = document.querySelector("input[name=copilotName]");
        let copilot = copilotInput.value;
        let fuelInput = document.querySelector("input[name=fuelLevel]");
        let fuelLevel = (fuelInput.value);
        let cargoInput = document.querySelector("input[name=cargoMass]");
        let cargoLevel = (cargoInput.value);
        // we will want to do this 4 times, one for each element
        //Now that we have all 4 form input elements selected
        //we can pass their VALUES into our formSubmission function
        //very important to understand the difference between an html element and its value!!!
        
        //this is where we will invoke our formSubmission function eventually
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
        //alert("WARNING: Make sure names are text and fuel and cargo mass are numbers!")

    });
        // based on these console statements, we now know that listedPlanets is our array of fetched json information
        // we now have access to our fetched planets, so we need to select a random planet with our pickPlanet function
        //then we need to update the text of our missionTarget div from index.html to display data about this random planet
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       
        //invoke pickPlanet and pass it our list of planets and store that in a variable
        
        //we can use that randomly selected planet object to fill in our template
        //we can simply access the properties in our template literal and then add this template literal in to the missionTarget div (but it's incomplete)
       
        //innerHTML?
        // `<h2>Mission Destination</h2>
        //          <ol>
        //              <li>Name:${} </li>
        //              <li>Diameter:${} </li>
        //              <li>Star: ${}</li>
        //              <li>Distance from Earth:${} </li>
        //              <li>Number of Moons:${} </li>
        //          </ol>
        //          <img src=""></img>`
    });


    //On adding validation
    // First, we are already inside a window load even listener
    // before we even worry about validating the form inputs, we need to select the form (using the dom) and listen for the submit event
    
   

