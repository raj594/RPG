var targetNumber = 0;
var wins = 0;
var losses = 0;
var counter = 0;

//Print Original State
$("#wins").text(wins);
$("#losses").text(losses);
$("#currentNumber").text(counter);


// Set game state



// Create number to guess from 19 - 120
targetNumber = (Math.floor(Math.random() * 102) + 19);
$("#number-to-guess").text(targetNumber);

// Get 4 random numbers from 1 - 12 and set them in an array
var one = (Math.floor(Math.random() * 12) + 1);
var two = (Math.floor(Math.random() * 12) + 1);
var three = (Math.floor(Math.random() * 12) + 1);
var four = (Math.floor(Math.random() * 12) + 1);
var numberOptions = [one, two, three, four];



// Create a for loop to create crystals for every numberOption.
for (var i = 0; i < numberOptions.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    imageCrystal.attr("number", i);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
}

// This time, our click event applies to every single crystal on the page. Not just one.
$(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    $("#currentNumber").text(counter);

    if (counter === targetNumber) {
      wins++;
      $("#wins").text(wins);
      alert("You win!");
      clearStatus();
    } else if (counter >= targetNumber) {
      losses++;
      $("#losses").text(losses);
      alert("You lose!!");
      clearStatus();
    }

});

function clearStatus() {
  counter = 0;
  $("#currentNumber").text(counter);
  targetNumber = (Math.floor(Math.random() * 102) + 19);
  $("#number-to-guess").text(targetNumber);
  one = (Math.floor(Math.random() * 12) + 1);
  two = (Math.floor(Math.random() * 12) + 1);
  three = (Math.floor(Math.random() * 12) + 1);
  four = (Math.floor(Math.random() * 12) + 1);
  numberOptions = [one, two, three, four];
  $(".crystal-image").each(function(i, number){
    $(this).attr('data-crystalvalue', numberOptions[i]);
  });
};