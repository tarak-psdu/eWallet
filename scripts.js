// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

//UI

showItems();

function showItems() {
    let items = getItemsFromLS();

    for (let item of items) {
        const collection = document.querySelector('.collection');
        const newhtml = `<div class="item">
        <div class="item-description-time">
          <div class="item-description">
            <p>${item.descr}</p>
          </div>
          <div class="item-time">
            <p>${item.time}</p>
          </div>
        </div>
        <div class="item-amount ${item.type === '+'? 'income-amount': 'expense-amount'}">
          <p>${item.type}$${sep(item.value)}</p>
        </div>
      </div>`;
      collection.insertAdjacentHTML('afterbegin', newhtml);
    }
}

document.querySelector('#ewallet-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const descr = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

if (descr && value) {
    addItems (type, descr, value);
    resetForm();
}
})

function addItems(type, descr, value) {
    const time = getFormattedTime();
    const newhtml = `<div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${descr}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${type === '+'? 'income-amount': 'expense-amount'}">
      <p>${type}${sep(value)}</p>
    </div>
  </div>`;
  const collection = document.querySelector('.collection');
  collection.insertAdjacentHTML('afterbegin', newhtml);

addItemsToLS(type, descr, time, value);
showTotalIncome();
showTotalExpenses();
showTotalBalance();

}

function resetForm(){
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

function getItemsFromLS() {
let items = localStorage.getItem('items');

if(items){
    items = JSON.parse(items);
} else {
    items = [];
}
return items;
};

function addItemsToLS(type, descr, time, value) {
let items = getItemsFromLS();
items.push({type, time, descr, value});
localStorage.setItem('items', JSON.stringify(items));
}
//Calcultion Function

showTotalIncome();

function showTotalIncome() {
  let items = getItemsFromLS();
  let totalIncome = 0;
  for (let item of items) {

    if (item.type === '+'){
      totalIncome += parseInt(item.value)
    } else {
      totalIncome -= parseInt(item.value)
    }
  }
  document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;
}

showTotalExpenses();

function showTotalExpenses() {
  let items = getItemsFromLS();
  let totalExpense = 0;
  for(let item of items) {
    if (item.type === '-') {
      totalExpense += parseInt(item.value);
    }
  }
  document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`;
}


// Show Total Balance 

showTotalBalance();

function showTotalBalance() {
  let items = getItemsFromLS();
  let total = 0;

  for (let item of items) {
    if (item.type === '+') {
      total += parseInt(item.value);
    } else {
      total -= parseInt(item.value);
    }
  }
  document.querySelector('.balance__amount p').innerText = `${sep(total)}`;
  if (total >= 0) {
    document.querySelector('header').className = 'green';
  } else {
    document.querySelector('header').className = 'red';
  }
}


//Utility Function

function getFormattedTime () {
    const now = new Date().toLocaleTimeString('en-us', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return formattedTime = `${date[1]}, ${date[0]}, ${time}`;
}

//Comma seperator function

function sep(amount) {
  amount = parseInt(amount);

  return amount.toLocaleString();
}