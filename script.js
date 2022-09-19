const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionersBtn = document.getElementById('show-millioners');
const sortBtn = document.getElementById('sort');
const calWealthBtn = document.getElementById('cal-wealth');



let data = [];

getRandomUsers();
getRandomUsers();
getRandomUsers();

//Fetching random users and add money
async function getRandomUsers(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money:Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

function doubleMoney(){
  data = data.map((user) => {
    return { ...user, money: user.money * 2};
  });

  updateDOM();
}

function sortMoney(){
  data.sort((a,b) => b.money - a.money)
  updateDOM();
}

function showOnlyMillioners(){
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}

function calculateWealth(){
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  
  main.appendChild(wealthEl);
}

//add user 
function addData(obj){
  data.push(obj);

  updateDOM();
}

// updata Dom
function updateDOM(providedData = data){
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element);
  })
}


//Format number as money
function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event Listeners

addUserBtn.addEventListener('click', getRandomUsers);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionersBtn.addEventListener('click', showOnlyMillioners);
calWealthBtn.addEventListener('click', calculateWealth);