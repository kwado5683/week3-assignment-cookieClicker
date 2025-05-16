
console.log("hello world");


//declaring all variables
const cookieCounter = document.getElementById("cookie-counter");
const cps = document.getElementById("cps");
const cookie = document.getElementById("cookie");
const upgradeContainer = document.getElementById("upgrades-container");


//linking variables to html elements

let cookies = 0;
let cookiesPerSecond = 0;

cookieCounter.innerHTML = cookies;
cps.innerHTML = cookiesPerSecond;

//add event to increase cookies on click
cookie.addEventListener("click",function(){
    cookies += 20;
    cookieCounter.innerHTML = cookies;
})

//fetch shop upgrades===============================

async function fetchupgrades(){
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
    const fetchedData = await response.json();
    return fetchedData;
}

//create and append upgrades after fetching

async function displayUpgrades() {
    const upgrades = await fetchupgrades();
    upgrades.forEach(element => {
        const p = document.createElement("button");
        p.id = element.name;
        p.textContent = element.name;
         //append cost and increase to the text content
        p.textContent += " Cost: " + element.cost + " Increase: " + element.increase;

        upgradeContainer.appendChild(p);



        p.addEventListener("click",function(){
            if (cookies >= element.cost) {
                cookies -= element.cost;
                cookiesPerSecond += element.increase;

                cookieCounter.innerHTML = cookies; //updating
                cps.innerHTML = cookiesPerSecond;


                //to prevent multiple purchase
                p.disabled = true;
                p.textContent = "Purchased";
            } else {
                alert("not enough cookies!");
            }


        });
    });
}


displayUpgrades();



// Generate cookies automatically based on cps
setInterval(function () {
    cookies += cookiesPerSecond;
    cookieCounter.innerHTML = cookies;
  }, 1000); // Every second



  ///saving stat
  const save = document.getElementById("save");
  save.addEventListener("click", function(){
    const gameState = {
        cookies: cookies,
        cookiesPerSecond: cookiesPerSecond
    };
    localStorage.setItem('gameState',JSON.stringify(gameState));
    alert("game saved!");

  })

  //reset stat
  const reset = document.getElementById("reset");
  reset.addEventListener("click", function(){
    if(confirm("Game data will be lost. Are you sure?")){
        cookies = 0;
        cookiesPerSecond = 0;
        localStorage.removeItem("gameState");

        cookieCounter.innerHTML = cookies;
        cps.innerHTML = cookiesPerSecond

    }
    
  });


//loading saved game if any
const savedState = localStorage.getItem("gameState");
if (savedState) {
    const gameState = JSON.parse(savedState);
    cookies = gameState.cookies;
    cookiesPerSecond = gameState.cookiesPerSecond;

    cookieCounter.innerHTML = cookies;
    cps.innerHTML = cookiesPerSecond;
}