// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health +=20;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack +=6;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// fight function
var fight = function(enemy) {
  console.log(enemy)
  while (playerInfo.health > 0 && enemy.health > 0) {
  // ask player if they'd like to fight or run
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max (0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money);
      break;
    }
  }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0 , enemy.health - playerInfo.attack);
    console.log(damage)
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      // leave while () loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0 , playerInfo.health - enemy.attack);
    console.log(damage)
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }   
}

// run fight function to start game
var startGame = function(){
  // reset player stats
  playerInfo.reset ();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // let the player know what round they are in
      window.alert("Welcome to Robot Gladiators! Round " + (i+1) );

      //pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      //reset pickedEnemyObj.health before starting new fight
      pickedEnemyObj.health = randomNumber(40,60);  
      console.log(pickedEnemyObj.health);

      //use debugger to pause script from running and check what's happening in the script
      //debugger

      //pass the pickedEnemyObj variable's value into the fight function
      fight(pickedEnemyObj);
    
      //if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if the player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store() function
        if (storeConfirm){
          shop();
        }
      }
    }
    
  }

  //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame ();
};

var endGame = function () {
  if (playerInfo.health > 0){
    //if player is still alive, player wins
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm) {
    //restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};

// shop function
var shop = function() {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      playerInfo.refillHealth();

      break;

  case "upgrade":
  case "UPGRADE":
    playerInfo.upgradeAttack();

    break;

  case "LEAVE":
  case "leave":
    window.alert("Leaving the store.");
    break;

  default:
    window.alert("You did not pick a valid option. Try again.");

    //call shop() again to force player to pick a valid option
    shop();
    break;
  }
};

//start the game when the page loads

startGame();