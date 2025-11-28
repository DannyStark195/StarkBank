//Get all needed elements by id
const signUpWrapper = document.getElementById('sign-up-wrapper');
const signInWrapper = document.getElementById('sign-in-wrapper');
const signInDisplay = document.getElementById('sign-in-display');
const signUpDisplay = document.getElementById('sign-up-display');

const signUpBtn = document.getElementById('sign-up-btn');
const signInBtn = document.getElementById('sign-in-btn');

const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');

const signInOverlayBtn = document.getElementById('sign-in-overlay-btn'); 
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const confirmPasswordInput = document.getElementById('confirm-password-input');
const accountNumberInput = document.getElementById('account-number-input');
const accountPasswordInput = document.getElementById('account-password-input');

const usernameError = document.getElementById('username-error-message');
const passwordError = document.getElementById('password-error-message');
const allErrorMessages = document.querySelectorAll('.error-message');

const confirmPasswordError = document.getElementById('confirm-password-error-message');
const accountError = document.getElementById('account-error-message');
const accountPasswordError = document.getElementById('account-password-error-message');

const darkOverlay = document.getElementById('dark-overlay');
const usernameSpan = document.getElementById('username-span')
const accountNumberSpan = document.getElementById('account-number');

const accountBalance = document.getElementById('account-balance');
const expenseTracker = document.getElementById('expense-tracker');

const noExpense = document.getElementById('no-expense');

const depositForm = document.getElementById('deposit-form');
const withdrawForm = document.getElementById('withdraw-form');
const transferForm = document.getElementById('transfer-form');

const amountInput = document.getElementById('amount-input');
const transactionDescInput = document.getElementById('transaction-desc-input');
const amountError = document.getElementById('amount-error-message');
const transactionDescError = document.getElementById('tansaction-desc-error-message');

const destinationAccountNumberInput = document.getElementById('destination-account-number-input');
const destinationAccountError = document.getElementById('destination-account-error-message');

const dashboard = document.getElementById('dashboard');
const expenses = document.getElementById('expenses');
const deposit = document.getElementById('deposit');
const transfer = document.getElementById('transfer');


//Icon elements
const eyeIcon = document.getElementById('eye-icon');
const lightThemeIcon = document.getElementById('light-theme');
const darkThemeIcon = document.getElementById('dark-theme');
const systemDefaultIcon = document.getElementById('system-default');


//Icon names
const eyeClose = 'eye-off';
const eyeOpen = 'eye';
const iconOn = 'radio-button-on-outline';
const iconOff = 'radio-button-off-outline';

document.addEventListener('DOMContentLoaded', function(){
    saveUsers(), 
    changeTheme()
});

// Save all users to local storage
function saveUsers(){
    let Users = retrieveUsers()
    if(Users.length ===0){ //Create inital user if no user
        Users.push({
        username: 'DannyStark',
        password: '****', 
        accountNumber: '101010',
        balance: 1000000,
        expenses: []
        }
    )
    }
    localStorage.setItem('Users', JSON.stringify(Users));
}

//Retrieve all users from local storage
function retrieveUsers(){
    let Users = localStorage.getItem('Users');
    Users = Users ? JSON.parse(Users) : [];
    return Users
}

//Update users and save to localStorage
function updateUsers(Users){
     localStorage.setItem('Users', JSON.stringify(Users));
}

//Save current user to local storage
function saveCurrentUser(currentUser){
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

//Update current user to local storage
function updateCurrentUser(currentUser){
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
//Retrieve current user from local storage
function retrieveCurrentUser(){
    let currentUser = localStorage.getItem('currentUser');
    currentUser = currentUser ? JSON.parse(currentUser) : [];
    return currentUser;
}

if(signUpDisplay){signUpDisplay.addEventListener('click', showSignUp);}

if(signInDisplay){signInDisplay.addEventListener('click', showSignIn);}

if(signInOverlayBtn){signInOverlayBtn.addEventListener('click', showSignIn);}

if(signUpForm){signUpForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    validateSignUp(usernameInput, passwordInput, confirmPasswordInput)
});
}

if(signInForm){
    signInForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    signIn(accountNumberInput, accountPasswordInput)
});
}

//Show Sign up form
function showSignUp(){
    signInWrapper.classList.remove('active');
    signUpWrapper.classList.add('active');
    darkOverlay.classList.remove('active');
}

//Show Sign in form
function showSignIn(){
    signUpWrapper.classList.remove('active');
    signInWrapper.classList.add('active');
    darkOverlay.classList.remove('active');
}

//Validate sign up inputs
function validateSignUp(usernameInput, passwordInput, confirmPasswordInput){
    let valid = true;
    allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        }); //remove all error messages

    if(usernameInput.value.trim()===''){
            usernameError.classList.add('active');
            usernameError.textContent = 'Username required*'
            valid = false;
    } 
    if(passwordInput.value.trim()===''){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password required*';
            valid = false;
    } 
    if(passwordInput.value.trim()!=='' && passwordInput.value.length <6){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password must be at least 6 characters long';
            valid = false;
    } 
    if(confirmPasswordInput.value.trim()===''){
            confirmPasswordError.classList.add('active');
            confirmPasswordError.textContent = 'Confirm password required*';
            valid = false;
    }
    if(confirmPasswordInput.value.trim()!== passwordInput.value.trim()){confirmPasswordError.classList.add('active');
            confirmPasswordError.textContent = 'Password must match*';
            valid = false;
    }
    if(valid){
         allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        });
        //Sign up user once all inputs are valid
        signUp(usernameInput, passwordInput);
    }
}

function signUp(usernameInput, passwordInput){
    let Users = retrieveUsers();
    const userName = usernameInput.value.trim();
    const passWord = passwordInput.value.trim();

   for(const user of Users){
        if(user.username === userName){
            console.log(user.username)
            usernameError.classList.add('active');
            usernameError.textContent = 'Username already exists';
            return
        }
   }

   let newAccountNumber = generateAccountNumber();

   const newAccount ={
        username: userName,
        password: passWord,
        accountNumber: newAccountNumber,
        balance: 0,
        expenses: []
   }

   Users.push(newAccount);
   updateUsers(Users)
   displayAccountNumber(newAccountNumber);
}

function generateAccountNumber(){
    let number = '';
    for(let i=0; i<10; i++){
        number += Math.floor(Math.random() *10);
    }
    return number
}

function displayAccountNumber(accountNumber){
    darkOverlay.classList.add('active');
    accountNumberSpan.textContent = accountNumber;
}

function signIn(accountNumberInput, accountPasswordInput){
    let Users = retrieveUsers()
    let currentUser = null;
    const accountNumber = accountNumberInput.value.trim();
    const accountPassword = accountPasswordInput.value.trim();

    allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        });

    for(const user of Users){
        if(user.accountNumber === accountNumber){
            if(user.accountNumber === accountNumber && user.password === accountPassword){
                currentUser = user;
                console.log(user);
                console.log('user');
                redirectDashboard(currentUser);
                return
            }
            else{
                accountPasswordError.classList.add('active');
                accountPasswordError.textContent = 'Password is incorrect*';
                return
            }
        }
   }
    accountError.classList.add('active');
    accountError.textContent = 'Account number does not exist*';
    return
}

function redirectDashboard(currentUser){
    if(!currentUser){
        return
    }
    saveCurrentUser(currentUser)
    window.location.href ='dashboard.html'; //redirect to dashboard
}

//Show dashboard once in dashboard.html
if(dashboard){
    showDashboard()
}

//Show dashboard function
function showDashboard(){
    console.log('dasboard')
    let Users = retrieveUsers()
    console.log(Users)
    let currentUser = retrieveCurrentUser();
    console.log(currentUser);
    accountNumberSpan.textContent = currentUser.accountNumber;
    usernameSpan.textContent = currentUser.username;
    accountBalance.textContent = "****";
    eyeIcon.setAttribute('name', 'eye-off');
    
}   

//Show expenses function
function showExpenses(currentUser){
    if(currentUser.expenses.length === 0){
        noExpense.classList.add('active');
        return
    }
    for(const expense of currentUser.expenses){
        const expenseDiv = document.createElement('div');
        const  expenseP = document.createElement('p');
        const expenseP2 = document.createElement('p');
        const amountSpan = document.createElement('span');
        const removeExpenseIcon = document.createElement('i');
        const currencyIcon = document.createElement('img');
       

        expenseDiv.classList.add('expense');
        expenseDiv.classList.add('display-flex-jcc')
       
        expenseP.classList.add('expense-info');
        expenseP.textContent = expense.description;
        expenseDiv.appendChild(expenseP);

        currencyIcon.src = 'https://img.icons8.com/material-outlined/24/naira.png';
        currencyIcon.width = '24';
        currencyIcon.height = '24';

        expenseP2.appendChild(currencyIcon);

        
         if(expense.entry === 'credit'){
             expenseDiv.classList.add('green');
             amountSpan.textContent = expense.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
             });
        }
        if(expense.entry == 'debit'){
             expenseDiv.classList.add('red');
             amountSpan.textContent = '- '+ expense.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
             });
        }
        amountSpan.classList.add('amount');
        
        expenseP2.appendChild(amountSpan);

        removeExpenseIcon.classList.add('fas', 'fa-times', 'remove-expense-icon');

        removeExpenseIcon.addEventListener('click', () =>{
            expenseTracker.removeChild(expenseDiv);
            let Users = retrieveUsers()
            let currentUser = retrieveCurrentUser()
            const expenseIndex = currentUser.expenses.findIndex(e => e.description === expense.description && e.amount === expense.amount && e.entry === expense.entry);

            if(expenseIndex!==-1){
                const removedExpense = currentUser.expenses.splice(expenseIndex, 1)[0]

                if(removedExpense.entry === 'credit'){
                    currentUser.balance = Number(currentUser.balance) - Number(removedExpense.amount);
                    
                }
                if(removedExpense.entry === 'debit'){
                    currentUser.balance = Number(currentUser.balance) + Number(removedExpense.amount);
                }

                updateUsers(Users)

                updateCurrentUser(currentUser)
            }
            currentUser = retrieveCurrentUser()
            showDashboard(currentUser)
            if(currentUser.expenses.length === 0){
                noExpense.classList.add('active');
            }
        })
        expenseP2.appendChild(removeExpenseIcon);

        expenseP2.classList.add('display-flex-jcc', 'expense-info');
        expenseDiv.appendChild(expenseP2);
        
        expenseTracker.appendChild(expenseDiv)
    }
}

//Show expenses once in expenses.html
if(expenses){
    let currentUser = retrieveCurrentUser();
    showExpenses(currentUser)
}

//Show deposit once in deposit.html
if(deposit){
    let currentUser = retrieveCurrentUser();
    console.log(currentUser);
    if(depositForm){
        depositForm.addEventListener('submit', (e) =>{
            e.preventDefault();
            showDeposit(currentUser, accountNumberInput,  amountInput, transactionDescInput);
        })
    }
}

function showDeposit(currentUser, accountNumberInput,  amountInput, transactionDescInput){
    let Users = retrieveUsers()
    const accountNumber = accountNumberInput.value.trim();
    const depositAmount = Number(amountInput.value.trim());
    const depositDesc = transactionDescInput.value.trim();
    
    console.log(typeof depositAmount)

    console.log(accountNumber)
    console.log(depositAmount)
    allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        });
    if(accountNumber === ''){
        accountError.classList.add('active');
        accountError.textContent = 'Please enter your account number*';
        return
    }
    if(!depositAmount || depositAmount<0 || (typeof depositAmount !== 'number')){
        amountError.classList.add('active');
        amountError.textContent = 'Amount must be a positive number!*';
        return
    }
    if(depositAmount> 1000000){
        amountError.classList.add('active');
        amountError.textContent = 'Amount too high*';
        return
    }
    if(depositDesc ===''){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description cannot be empty';
        return
    }
    if(depositDesc.length > 30){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description must be less than 30 characters!*';
        return
    }
        
    if(currentUser.accountNumber === accountNumber){
    
        currentUser.balance += depositAmount;
        currentUser.expenses.push({
                description: depositDesc,
                amount: depositAmount,
                entry: 'credit'
        }
        )

        updateUsers(Users)
        updateCurrentUser(currentUser)
        Users = retrieveUsers()
    }
    else{
        accountError.classList.add('active');
        accountError.textContent = 'This is not your account number*';
        return
    }
    
    accountNumberInput.value = '';  
    amountInput.value = '';
    transactionDescInput.value = '';
   }



const withdraw = document.getElementById('withdraw');

//Show withdraw once in withdraw.html
if(withdraw){
    let currentUser = retrieveCurrentUser();
    console.log(currentUser);
    if(withdrawForm){
        console.log('withdraw')
        withdrawForm.addEventListener('submit', (e) =>{
            e.preventDefault();
            showWithdraw(currentUser, accountNumberInput,  amountInput, transactionDescInput, passwordInput);
        })
    }
}

//Show withdraw function
function showWithdraw(currentUser, accountNumberInput,  amountInput, transactionDescInput, passwordInput){
    let Users = retrieveUsers()
    const accountNumber = accountNumberInput.value.trim();
    const withdrawAmount = Number(amountInput.value.trim());
    const withdrawDesc = transactionDescInput.value.trim();
    const withdrawPassword = passwordInput.value.trim();
    console.log(typeof withdrawAmount)

    console.log(accountNumber)
    console.log(withdrawAmount)
    allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        });
    if(accountNumber === ''){
        accountError.classList.add('active');
        accountError.textContent = 'Please enter your account number*';
        return
    }
    if(!withdrawAmount || withdrawAmount<0 || (typeof withdrawAmount !== 'number')){
        amountError.classList.add('active');
        amountError.textContent = 'Amount must be a positive number!*';
        return
    }
    if(withdrawDesc ===''){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description cannot be empty';
        return
    }
    if(withdrawDesc.length > 30){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description must be less than 30 characters!*';
        return
    }
    if(withdrawPassword===''){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password required*';
    } 
    
    if(currentUser.accountNumber === accountNumber){
        if(withdrawPassword!== currentUser.password){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password is incorrect*';
            return
        }
        if(currentUser.balance< withdrawAmount){
            amountError.classList.add('active');
            amountError.textContent = 'Insufficient funds!*';
            return
        }
        currentUser.balance -= withdrawAmount;
        currentUser.expenses.push({
                description: withdrawDesc,
                amount: withdrawAmount,
                entry: 'debit'
        }
        )
        updateUsers(Users)
        updateCurrentUser(currentUser)
        Users = retrieveUsers()
    }
    else{
        accountError.classList.add('active');
        accountError.textContent = 'This is not your account number*';
        return
    }
    accountNumberInput.value = '';  
    amountInput.value = '';
    transactionDescInput.value = '';
    passwordInput.value = '';
}

//Show transfer once in transfer.html
if(transfer){
    let currentUser = retrieveCurrentUser();
    console.log(currentUser);
    if(transferForm){
        console.log('transfer')
        transferForm.addEventListener('submit', (e) =>{
            e.preventDefault();
            showTransfer(currentUser, accountNumberInput, destinationAccountNumberInput, amountInput, transactionDescInput, passwordInput);
        })
    }
}

//Show transfer function
function showTransfer(currentUser, accountNumberInput, destinationAccountNumberInput, amountInput, transactionDescInput, passwordInput){
    let Users = retrieveUsers()
    const accountNumber = accountNumberInput.value.trim();
    const destinationAccountNumber = destinationAccountNumberInput.value.trim();
    const transferAmount = Number(amountInput.value.trim());
    const transferDesc = transactionDescInput.value.trim();
    const transferPassword = passwordInput.value.trim();
    let destinationAccount

    allErrorMessages.forEach((element) => {
            element.classList.remove('active');
        });
    if(accountNumber === ''){
        accountError.classList.add('active');
        accountError.textContent = 'Please enter your account number*';
        return
    }
    if(destinationAccountNumber === ''){
        destinationAccountError.classList.add('active');
        destinationAccountError.textContent = 'Please enter destination account number*';
        return
    }
    if(destinationAccountNumber === accountNumber){
        destinationAccountError.classList.add('active');
        destinationAccountError.textContent = 'Destination account number cannot be the same as your account number*';
        return
    }
    if(!transferAmount || transferAmount<0 || (typeof transferAmount !== 'number')){
        amountError.classList.add('active');
        amountError.textContent = 'Amount must be a positive number!*';
        return
    }
    if(transferDesc ===''){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description cannot be empty';
        return
    }
    if(transferDesc.length > 30){
        transactionDescError.classList.add('active');
        transactionDescError.textContent = 'Transaction description must be less than 30 characters!*';
        return
    }
    if(transferPassword===''){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password required*';
    } 
    for(const user of Users){
            if(user.accountNumber === destinationAccountNumber){
                destinationAccount = user;
            }
        }
    if(!destinationAccount){
        destinationAccountError.classList.add('active');
        destinationAccountError.textContent = 'Account does not exist*';
        return
    }
    
    if(currentUser.accountNumber === accountNumber){
        
        if(transferPassword!== currentUser.password){
            passwordError.classList.add('active');
            passwordError.textContent = 'Password is incorrect*';
            return
        }
        if(currentUser.balance< transferAmount){
            amountError.classList.add('active');
            amountError.textContent = 'Insufficient funds!*';
            return
        }
        currentUser.balance -= transferAmount;
        
        currentUser.expenses.push({
                description: transferDesc,
                amount: transferAmount,
                entry: 'debit'
        }
        )
        destinationAccount.balance += transferAmount;
        destinationAccount.expenses.push({
                description: transferDesc,
                amount: transferAmount,
                entry: 'credit'
        }
        )
        updateUsers(Users)
        updateCurrentUser(currentUser)
        Users = retrieveUsers()
    }
    else{
        accountError.classList.add('active');
        accountError.textContent = 'This is not your account number*';
        return
    }
    accountNumberInput.value = '';  
    destinationAccountNumberInput.value = '';
    amountInput.value = '';
    transactionDescInput.value = '';
    passwordInput.value = '';
}

if(eyeIcon){
    eyeIcon.addEventListener('click', ()=>{
        let currentName = eyeIcon.getAttribute('name');
        let currentUser = retrieveCurrentUser();
        
        newName = currentName===eyeClose?eyeOpen:eyeClose;
        eyeIcon.setAttribute('name', newName);
        if(newName===eyeOpen){
            const balance = currentUser.balance;
            const formattedBalance = balance.toLocaleString('en-US',{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
            )
            accountBalance.textContent = formattedBalance;
        }
        if(newName===eyeClose){
            accountBalance.textContent = '****';
        }

    })
}

//Copy to cliptray when account number is clicked
if(accountNumberSpan){
    accountNumberSpan.addEventListener('click', ()=>{
    navigator.clipboard.writeText(accountNumberSpan.textContent);
    })
}

//swap css varaibles' value with light or dark theme value
function swapCssVariables(oldVar, newVar){
    document.querySelector(':root').style.setProperty(oldVar, newVar)
}

if(lightThemeIcon){
    lightThemeIcon.addEventListener('click', () => {
    localStorage.setItem('theme', 'light')
        
        changeTheme()
    })
}

if(darkThemeIcon){
    darkThemeIcon.addEventListener('click', () => {
        localStorage.setItem('theme', 'dark')
        changeTheme()
    })
}

if(systemDefaultIcon){
    systemDefaultIcon.addEventListener('click', () => {
        localStorage.setItem('theme', 'system-default');
        changeTheme()
    })
}

function setLightTheme(){
    localStorage.setItem('theme', 'light');

    if(lightThemeIcon && darkThemeIcon && systemDefaultIcon){
        lightThemeIcon.setAttribute('name', iconOn)
        darkThemeIcon.setAttribute('name', iconOff);
        systemDefaultIcon.setAttribute('name', iconOff)
    } 
    swapCssVariables('--text-light', '#000');
    swapCssVariables('--text-dark', '#fff');
    swapCssVariables('--bg-dark-overlay', 'rgba(0, 0, 0, 0.03)');        
    swapCssVariables('--text-gray', '#000');
    swapCssVariables('--border-light', 'rgba(0,0,0, 0.1)');
    swapCssVariables('--bg-dark', '#fff');
}

function setDarkTheme(){
    localStorage.setItem('theme', 'dark');

    if(lightThemeIcon && darkThemeIcon && systemDefaultIcon){
        darkThemeIcon.setAttribute('name', iconOn)
        lightThemeIcon.setAttribute('name', iconOff);
        systemDefaultIcon.setAttribute('name', iconOff)
    }
    swapCssVariables('--text-light', '#fff');
    swapCssVariables('--text-dark', '#000');
    swapCssVariables('--bg-dark', '#050810');
    swapCssVariables('--text-gray', 'rgba(255, 255, 255, 0.44)');
    swapCssVariables('--border-light', 'rgba(255, 255, 255, 0.1)');
    swapCssVariables('--bg-dark-overlay', 'rgba(255, 255, 255, 0.03)');        
}

//Change Theme
function changeTheme(){
    let theme = localStorage.getItem('theme');
    console.log(theme)
    if(theme === 'light'){
        setLightTheme()
    }
    if(theme === 'dark'){
        setDarkTheme()
    }
    if(theme === 'system-default'){
        const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkTheme.matches){
            setDarkTheme()
        }
        else{
            setLightTheme()
        }
        if(lightThemeIcon && darkThemeIcon && systemDefaultIcon){
                darkThemeIcon.setAttribute('name', iconOff)
                lightThemeIcon.setAttribute('name', iconOff);
                systemDefaultIcon.setAttribute('name', iconOn)
            }
    }
}