'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class = "movements__row">
    <div class = "movements__type movements__type--${type}">${i+1} ${type} </div>
    <div class = "movements__value">${mov}€ </div>
    </div>`;
    containerMovements.insertAdjacentHTML ('afterbegin', html);
  });
};
displayMovements(account1.movements);

// let username = account1.owner.toLowerCase().split(' ').map(name =>name[0]).join('');

const createUserNames = function(accts) {
  accts.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name =>name[0]).join('');
  })
};

createUserNames(accounts);

let currentAccount;
btnLogin.addEventListener('click', event => {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => inputLoginUsername.value === acc.username
  );
  if(currentAccount && currentAccount.pin == inputLoginPin.value) {
    displayMovements(currentAccount.movements);
    calcBalance(currentAccount.movements);
    containerApp.style.opacity = 1;
  
  }
  else {
    console.log("Wrong Username or Pin");
  }
});

const calcBalance = function(movements) {
  let balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
}

btnTransfer.addEventListener('click', function(event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => inputTransferTo.value === acc.username
  );

  let balance = currentAccount.movements.reduce((acc, mov) => acc+mov,0);

  if(receiverAcc && amount <= balance && receiverAcc.username != currentAccount.username && amount>0) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    displayMovements(currentAccount.movements);
    calcBalance(currentAccount.movements);
  }
  else {
    console.log('Invalid Transaction')
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', (event) => {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount>0 && amount<=10000) {
    currentAccount.movements.push(amount);
    displayMovements(currentAccount.movements);
    calcBalance(currentAccount.movements);
    calcDeposit(currentAccount.movements);
    calcWithdrawal(currentAccount.movements);
  }
  else {
    console.log('Invalid Amount');

  }
  inputLoanAmount.value = '';
} );

const calcDeposit = function(movements) {
  let balance=0;
  for(let i=0;i<movements.length;i++) {
    if(movements[i] > 0) {
      balance += movements[i];
    }
    labelSumIn.textContent = `${balance}€`;
  }
};

const calcWithdrawal = function(movements) {
  let balance=0;
  for(let i=0;i<movements.length;i++) {
    if(movements[i] < 0) {
      balance += movements[i];
    }
    labelSumOut.textContent = `${-balance}€`;
  }
};


