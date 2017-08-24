var vince = {
    name: "Vince Young",
    health: 57,
    attack: 6,
    counterAttack: 9,
    pic: "assets/images/vince.jpg"
}

var boz = {
    name: "The Boz",
    health: 56,
    attack: 7,
    counterAttack: 8,
    pic: "assets/images/theboz.jpg"
}

var crabtree = {
    name: "Crabtree",
    health: 55,
    attack: 8,
    counterAttack: 7,
    pic: "assets/images/crabtree.jpg"
}

var jff = {
    name: "Johnny Football",
    health: 53,
    attack: 9,
    counterAttack: 6,
    pic: "assets/images/manziel.jpg"
}

var charSelected = false;
var defenderSelected = false;
var alive = false;
var heroHealth = 0;
var heroAttack = 0;
var defenderHealth = 0;
var defenderAttack = 0;
var heroName = "";
var cpuName = "";
var defeated = 0;
var damage = 0;
var baseAttack = 0;

var chars = [vince, boz, crabtree, jff];

for (var i = 0; i < chars.length; i++) {
    var newChar = $("<div>");
    newChar.addClass("character");
    newChar.prepend("<img id=" + chars[i].name + " class=\"char\" src=" + chars[i].pic + ">");
    newChar.prepend("<p>" + chars[i].name + "</p>");
    newChar.append("<div class=\"health\">" + chars[i].health);
    newChar.attr("health", chars[i].health);
    newChar.attr("attack", chars[i].attack);
    newChar.attr("counterattack", chars[i].counterAttack);
    newChar.attr("player", chars[i].name);
    $("#characters").append(newChar);
}

//Print Original State
function originalState() {
    $(".character").each(function(i) {
        $(this).show("#characters");
        $(this).appendTo("#characters");
        $(this).find('div').html($(this).attr('health'));
        $(this).removeClass('hero');

    });

    //Reset HTML
    $("#yourhp").text("");
    $("#cpuhp").text("");
    $('.reset').remove();

    //Reset flags and vars
    charSelected = false;
    defenderSelected = false;
    alive = false;
    heroName = "";
    cpuName = "";
    defeated = 0;


};

originalState();

//Event handler for when a character is pressed.
$(".character").on("click", function() {
    //if a character hasnt been selected, we'll select one
    if (charSelected === false) {
        charSelected = true;
        alive = true;
        $(this).siblings('.character').appendTo('#enemies');
        $(this).addClass('hero');
        $(this).appendTo('#yourChar');
        heroHealth = $(this).attr("health");
        heroAttack = $(this).attr("attack");
        baseAttack = $(this).attr("attack");
        heroName = $(this).attr("player");

    //if we have a character, if an enemy is pressed we will make it the defender
    } else if (charSelected === true && defenderSelected === false && $(this).hasClass("hero") === false) {
        defenderHealth = $(this).attr("health");
        defenderAttack = $(this).attr("counterattack");
        cpuName = $(this).attr("player");
        $(this).appendTo('#defender');
        defenderSelected = true;
    }

});

//Event handler for when attack button is pressed
$("#attack").on("click", function() {
    if (charSelected === true && defenderSelected === true && alive === true) {
        heroHealth -= defenderAttack;
        defenderHealth -= heroAttack;
        damage = heroAttack;
        heroAttack = parseInt(heroAttack) + parseInt(baseAttack);

        $(".character").each(function(i) {

            if ($(this).attr('player') === heroName) {
                $(this).find('div').html(heroHealth);
            };

            if ($(this).attr('player') === cpuName) {
                $(this).find('div').html(defenderHealth);
            };

        });

        if (heroHealth <= 0) {
            $("#yourhp").text("you lose, loser.");
            $("#cpuhp").text("");
            alive = false;
            $("#reset").append("<button class='reset'>reset</button>");

        } else if (defenderHealth <= 0) {
            defenderSelected = false;
            defeated++;
            $("#yourhp").text("You have defeated " + cpuName + ", you can choose to fight another enemy.");
            $("#cpuhp").text("");

            $(".character").each(function(i) {
                if ($(this).attr('player') === cpuName) {
                    $(this).hide();
                };
            });

        } else {
            $("#yourhp").text("You attacked " + cpuName + " for " + damage + " damage.");
            $("#cpuhp").text(cpuName + " attacked you back for " + defenderAttack + " damage.");
        }

        if (defeated === 3) {
            defeated = 0;
            $("#reset").append("<button class='reset'>reset</button>");
            $("#yourhp").text("You won Game Over!");
            $("#cpuhp").text("");
        };
    } else if (charSelected === true && defenderSelected === false && alive === true) {
        $("#yourhp").text("No enemy here.");
        $("#cpuhp").text("");
    }

});

//Event handler for when reset button is pressed
$("#reset").on("click", function() {
    originalState();
});