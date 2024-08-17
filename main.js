// defining elements
let transactionRecords = document.querySelector('.transaction-records');
const atmCard = document.querySelector('.atm-card-container');
const atmReceipt = document.querySelector('.atm-receipt-container');
const screen = document.querySelector('.screen');

// declared varibles
let IS_CARD_INSERT = false;
let screenContent = '';
let pinPassowrdCombination = '123456';
let atmAccountBalance = 10000;

// atm receipt transaction history
let transactionHistory = [];
// store the history of deposit acvtivity
let depositCashHistory = [];

// 1. balance 2. deposti 3. withdraw 4. transfer
let transactionFlow = 1;


// =========================== MENU ===========================
// ==========================  SECTION  =========================

// inserting card function
atmCard.addEventListener('click', insertAtmCard);

function insertAtmCard() {
    depositCashHistory = [];
    transactionHistory = [];
    atmCard.style.animationName = 'cardIn';
    atmCard.style.animationPlayState = 'running';
    IS_CARD_INSERT = true;
    setTimeout(() => {
        atmCard.style.display = 'none';
        displayMenu();

        // start the transaction on atm
    }, 2000);
}

//display the menu of atm
function displayMenu() {
    screenContent =
        `<div class="atm-menu-options">
        <div class="options">
            <button class="balance-option">Balance</button>
        </div>
        <div class="options">
            <button class="deposit-option">Deposit</button>
        </div>
        <div class="options">
            <button class="withdraw-option">Withdraw</button>
        </div>
        <div class="options">
            <button class="transfer-option">Transfer</button>
        </div>        
    </div>`;
    transactionRunning();
}

// atm menu options
function menuOptions() {
    const goToBalance = document.querySelector('.balance-option');
    const goToDeposit = document.querySelector('.deposit-option');
    const goToWithdraw = document.querySelector('.withdraw-option');
    const goToTransfer = document.querySelector('.transfer-option');

    // go to check balance process
    goToBalance.addEventListener('click', function () {
        transactionFlow = 1;
        atmPinSectionDisplay();
        atmPinValidation();
    })

    // go to deposit cash process
    goToDeposit.addEventListener('click', function () {
        transactionFlow = 2;
        atmPinSectionDisplay();
        atmPinValidation();
    })

    // go to winthdraw cash process
    goToWithdraw.addEventListener('click', function () {
        transactionFlow = 3;
        SelectAmountToWithdraw();
    })

    // go to transfer money process
    goToTransfer.addEventListener('click', function () {
        transactionFlow = 4;
        atmPinSectionDisplay();
        atmPinValidation();
    })
}

// ==================== UPDATE SCREEN==========================
// ======================== EVERY TRANSACTION ======================

updatingScreen();
// update screen every changes on ATM
function updatingScreen() {
    if (IS_CARD_INSERT === true) {
        screen.innerHTML = screenContent;
    } else {
        screen.innerHTML =
            `<div class="welcome-message">
            <h3>Please insert your card.</h3>
        </div>`;
    }

}
// while transaction is ongoing 
function transactionRunning() {
    updatingScreen();
    menuOptions();

}


// ====================  CHECK PIN  ==========================
// ================  EVERY TRANSACTION  ==========================
// check the account balance
function atmPinSectionDisplay() {
    screenContent =
        `<form class="balance-section">
        <div class="left-side">
            <h4>Please Enter your Personal Identification Number (PIN)</h4>
        </div>
        <div class="right-side">
            <input type="password" name="" id="pin-number">
        </div>
    </form>`;
    updatingScreen();
}

// atm pin validation 
function atmPinValidation() {

    numButtonsAndControls();
    // update of DOM 
    let enterButton = document.querySelector('.enter');
    let pinNumber = document.querySelector('#pin-number');
    let cancelButton = document.querySelector('.cancel');


    // continue to balance section
    enterButton.addEventListener('click', function () {
        cancelButton.removeEventListener('click', displayMenu);

        if (pinNumber.value === pinPassowrdCombination) {
            loadingSection();
            pinNumber.value = '';
        }
    })
}

// functional keys numbers and controls
function numButtonsAndControls() {
    // defining element of atm key buttons
    let pinNumber = document.querySelector('#pin-number');
    const numButtons = document.querySelectorAll('.num-buttons');
    const clearButton = document.querySelector('.clear');
    let cancelButton = document.querySelector('.cancel');

    // pass the value of clicked buttons to the input on PIN number
    numButtons.forEach(function (button, index, array) {
        button.addEventListener('click', function () {
            pinNumber.value += button.value;
            // console.dir(button.value);
        })
    })

    // back to menu
    cancelButton.addEventListener('click', displayMenu);

    clearButton.addEventListener('click', function () {
        pinNumber.value = ''; // clear value of input
    })
}

// loading every pin validation
function loadingSection() {

    // loading message
    screenContent =
        `<div class="loading">
        <h3>We're working on it</h3>
    </div>`;
    updatingScreen();

    // change course of flow
    setTimeout(() => {
        switch (transactionFlow) {
            case 1:
                viewBalance();
                break;
            case 2:
                depositMoney();
                break;
            case 3:
                doYouNeedAReceipt();
                break;
            case 4:
                transferMoney();
                break;
        }
    }, 2500)
}


// ====================  CHECKING  =====================
// ====================  BALANCE =================
// view balance options
function viewBalance() {
    screenContent =
        ` <div class="view-account-balance">
        <div class="left-side">
            <h4>How would you like to view your balance?</h4>
        </div>
        <div class="right-side">
            <button class="show-balance-on-screen">Show on screen</button>
            <button class="print-receipt">Print receipt</button>
        </div>
    </div>`
    updatingScreen();

    const showBalanceOnScreen = document.querySelector('.show-balance-on-screen');
    const printReceipt = document.querySelector('.print-receipt');

    showBalanceOnScreen.addEventListener('click', function () {
        displayBalanceOnScreen(); // display the balance on screen
    })

    printReceipt.addEventListener('click', function () {
        printReceiptAndCardOut();
    })
}

// display the account balance on screen
function displayBalanceOnScreen() {
    screenContent =
        ` <div class="account-balance-section">
        <div class="left-side">
            <h4>Account Balance</h4>
        </div>
        <div class="right-side">
            <h5>Your balance</h5>
            <h4>PHP ${atmAccountBalance.toLocaleString('en-US')}</h4>
            <div class="after-account-balance-option">
                <button class="eject-card">Eject card</button>
                <button class="do-another-transaction">Do another transaction</button>
            </div>
        </div>
    </div>`
    updatingScreen();
    const ejectCard = document.querySelector('.eject-card');
    const doAnotherTransaction = document.querySelector('.do-another-transaction');

    ejectCard.addEventListener('click', function () {
        cardPullOut();
        // if no transaction after balance
        endOfTransaction();
    });

    doAnotherTransaction.addEventListener('click', displayMenu)
}

function cardPullOut() {
    // take the card out of atm
    atmCard.style.transform = 'translate(-50%, -50%) rotateX(90deg)  rotateZ(90deg)';
    atmCard.style.animationPlayState = 'running';
    atmCard.style.animationName = 'cardOut';
    atmCard.style.display = 'block';
    setTimeout(() => {
        atmCard.style.transform = 'translate(-50%, -20%) rotateX(70deg)  rotateZ(90deg)';
    }, 2000);
}

// end of transaction
function endOfTransaction() {
    // cannot insert the card when it is being pulled out
    atmCard.removeEventListener('click', insertAtmCard);
    endNoReceipt()

    setTimeout(() => {
        // can insert atm after 5 seconds
        atmCard.addEventListener('click', insertAtmCard)
        IS_CARD_INSERT = false;
        updatingScreen();
    }, 5000)
}

// end No Receipt
function endNoReceipt() {
    screenContent =
        ` <div class="loading">
        <h3>Please take your card</h3>
    </div>`;
    updatingScreen();
}

// end with receipt
function endYesReceipt() {
    screenContent =
        `<div class="loading">
        <h3>Please take your card and receipt</h3>
    </div>`;
    updatingScreen();
}

// atm push out a receipt of transaction
function printReceiptAndCardOut() {
    transactionHistory.push({ transactionType: "Balance", amount: atmAccountBalance });
    // create conent of receipt first
    createATMTransactionReceipt();
    transactionHistory = [];

    // cannot insert the card when it is being pulled out
    atmCard.removeEventListener('click', insertAtmCard);

    // define the elements of receipt containers/wrappers
    const receiptSlotWarpper = document.querySelector('.receipt-slot-wrapper');
    const receiptSlot = document.querySelector('.receipt-slot');
    receiptSlot.style.zIndex = '11';

    // receipt will come out
    atmReceipt.style.animation = 'receiptOut 2s linear';

    // money out if withdraw was chosen
    if (transactionFlow === 3) {
        animationCashWithdraw();
    }

    endYesReceipt();

    cardPullOut();  // pull out the card after the transaction

    // make sure the receipt can ba take at the same time with the card
    setTimeout(() => {
        receiptSlotWarpper.style.height = '0';
        receiptSlotWarpper.style.overflow = 'visible';
        atmReceipt.style.top = '0';
        atmReceipt.style.animation = '';
    }, 2000);

    setTimeout(() => {

        // can insert atm after 5 seconds
        atmCard.addEventListener('click', insertAtmCard)
        IS_CARD_INSERT = false;
        updatingScreen();
    }, 5000);

    // // if the atm receipt is not remove by atm user
    // setTimeout(() => {
    //     transactionRecords.innerHTML = '';
    //     receiptSlotWarpper.style.overflow = 'hidden';
    //     receiptSlotWarpper.style.height = '400px';
    //     receiptSlot.style.zIndex = '9';
    //     atmReceipt.style.top = '-50%';
    // }, 8000);

    // click to remove the atm and receipt
    atmReceipt.addEventListener('click', function () {
        transactionRecords.innerHTML = '';
        receiptSlotWarpper.style.overflow = 'hidden';
        receiptSlotWarpper.style.height = '400px';
        receiptSlot.style.zIndex = '9';
        atmReceipt.style.top = '-50%';
    })
}

// create transaction history for receipt
function createATMTransactionReceipt() {
    // get the date
    const transactionTime = new Date();
    const currentDate = transactionTime.getDate();
    const currentMonth = transactionTime.getMonth();
    const currentYear = transactionTime.getFullYear();

    // get time
    const currentHour = transactionTime.getHours();
    const currentMinute = transactionTime.getMinutes();

    transactionRecords = document.querySelector('.transaction-records');

    transactionHistory.forEach((element, index, array) => {
        let TR = document.createElement('tr');
        // transaction type
        let TD1 = document.createElement('td');
        TD1.classList = 'transaction-activity';

        // amount of money engage during transaction
        let TD2 = document.createElement('td');
        TD2.classList = 'transaction-money-amount';


        transactionRecords.appendChild(TR);
        TR.appendChild(TD1);
        TR.appendChild(TD2);

        TD1.textContent = array[index].transactionType;
        TD2.textContent = `PHP ${array[index].amount.toLocaleString('en-US')}`;
        console.log(typeof array[index].amount)
    });
    let TR = document.createElement('tr');

    // date and time
    let transcationDate = document.createElement('td');
    transcationDate.classList = 'transaction-date';
    let exactTimeOfTransaction = document.createElement('td');
    exactTimeOfTransaction.classList = 'exact-time-of-transaction';

    // manage hour in Filipino time.
    let pmOrAm = 'AM';
    let modifiedHour;
    if (currentHour > 11) {
        pmOrAm = 'PM';
    } else if (currentHour === 24) {
        pmOrAm = 'AM';
    }

    if (currentHour > 12) {
        modifiedHour = currentHour - 12;
    } else {
        modifiedHour = currentHour;
    }

    // setting value of date and time
    transcationDate.textContent = `${currentMonth.toString().padStart(2, '0')}/${currentDate}/${currentYear.toString().slice(2)}`;
    exactTimeOfTransaction.textContent = `${modifiedHour}:${currentMinute.toString().padStart(2, '0')} ${pmOrAm}`;
    TR.appendChild(transcationDate);
    TR.appendChild(exactTimeOfTransaction);
    transactionRecords.appendChild(TR);
    console.log(transactionRecords)

}


// ================= DEPOSITING =====================
// ================== MONEY ====================
function depositMoney() {

    // insert money display
    inputCashMoney();


    let cashValue = '';
    const cashDeposit = document.querySelector('#cash-deposit');
    cashDeposit.addEventListener('input', function () {
        //number only
        const nums = '1234567890';

        // sheesh sarili kong idea tong nasa baba 🤧, kaso di pa to perfect
        // console.log(nums.includes(this.value[this.value.length - 1]))
        for (let i = 0; i < nums.length; i++) {
            if (nums.includes(this.value[this.value.length - 1])) {
                this.value = this.value;
            } else if (!nums.includes(this.value[this.value.length - 1])) {
                this.value = this.value.slice(0, this.value.length - 1);
            }
        }
        cashValue = this.value;
    })

    const submitCashDeposit = document.querySelector('#submit-cash-deposit');

    // submit the amout of cash to deposit
    submitCashDeposit.addEventListener('click', function () {


        // add history of deposit
        cashValue = Number(cashValue);
        atmAccountBalance += cashValue;
        depositCashHistory.push(cashValue)
        
        console.log(depositCashHistory)
        transactionHistory.push({ transactionType: "Deposit", amount: cashValue });

        // money in animation
        animationCashWithdraw();
        
        // create the list of transaction detail
        function createListOfDeposit() {
            let totalDeposisCash = 0;
            let transactionDepositUL = document.querySelector('.list-of-deposit');
            
            depositCashHistory.forEach(function(deposit, index, array) {
                // list of deposit transaction
                let transactionDepositLI = document.createElement('li');
                let depositLabel = document.createElement('p');
                let depositValue = document.createElement('p');
                depositValue.classList = 'deposit-cash';
                totalDeposisCash += cashValue;

                depositLabel.textContent = 'Added';
                depositValue.textContent = `PHP ${array[index].toLocaleString('en-US')}`;

                transactionDepositUL.appendChild(transactionDepositLI);
                transactionDepositLI.appendChild(depositLabel);
                transactionDepositLI.appendChild(depositValue);

            })

            // value for the current balance after the deposit transaction
            let lastTransactionDepositLI = document.createElement('li');
            let lastDepositLabel = document.createElement('p');
            let lastDepositValue = document.createElement('p');
            lastDepositLabel.classList = 'total-deposit-cash';

            lastDepositLabel.textContent = 'Added';
            lastDepositValue.textContent = `PHP ${totalDeposisCash.toLocaleString('en-US')}`;

            transactionDepositUL.appendChild(lastTransactionDepositLI);
            lastTransactionDepositLI.appendChild(lastDepositLabel);
            lastTransactionDepositLI.appendChild(lastDepositValue);

            console.log(transactionDepositUL)
        }
        // choose to add more cash deposit or confirm it
        screenContent =
            ` <div class="deposit-transaction-details">
            <div class="left-side">
                <h4>Confirm transaction details?</h4>
            </div>
            <div class="right-side">
                <ul class="list-of-deposit">
                
                </ul>
                <div class="deposit-options">
                    <button class="add-more-deposit">Add more</button>
                    <button class="confirm-cash-deposit">Confirm</button>
                </div>
            </div>
        </div>`;
        
        updatingScreen();
        createListOfDeposit();


        const addMoreDeposit = document.querySelector('.add-more-deposit');
        addMoreDeposit.addEventListener('click', function () {
            loadingSection();
        })

        // confirm the deposit transaction
        const confirmDeposit = document.querySelector('.confirm-cash-deposit');
        confirmDeposit.addEventListener('click', doYouNeedAReceipt)

    });

}

function doYouNeedAReceipt() {
    screenContent =
        `<div class="do-you-need-receipt">
        <div class="left-side">
            <h4>Do you need a print receipt?</h4>
        </div>
        <div class="right-side">
            <button class="no-receipt">No</button>
            <button class="yes-receipt">Yes</button>
        </div>
    </div>`;
    updatingScreen();


    const noReceipt = document.querySelector('.no-receipt');
    const yesReceipt = document.querySelector('.yes-receipt');

    // choose to have a printed receipt or not.
    noReceipt.addEventListener('click', function () {
        atmCard.removeEventListener('click', insertAtmCard)
        endNoReceipt();
        cardPullOut();

        // money out if withdraw was chosen
        if (transactionFlow === 3) {
            animationCashWithdraw();
        }
        setTimeout(() => {
            // can insert atm after 5 seconds
            atmCard.addEventListener('click', insertAtmCard)
            IS_CARD_INSERT = false;
            updatingScreen();
        }, 5000)
    });
    yesReceipt.addEventListener('click', printReceiptAndCardOut);

}

function inputCashMoney() {
    screenContent =
        `<div class="money-to-deposit-wrapper">
        <form class="deposit-money-display" action="#" autocomplete="off">
            <h2>Enter amount of money to deposit</h2>
            <p>PHP
                <input type="text" id="cash-deposit" inputmode="numeric">
            </p>
            <button type="submit" class="enter-deposit-money" id="submit-cash-deposit">Enter</button>
        </form>
    </div>`;
    updatingScreen();
}


// ================= WITHDRAWING  =======================
// ===================== MONEY ===================
function SelectAmountToWithdraw() {
    screenContent =
        ` <div class="withdraw-cash-amount-option">
        <div class="left-side">
            <h4>Select the amount to withdraw?</h4>
        </div>
        <div class="right-side">
            <div class="cash-option">
                <button class="cash-amount" value="500">500</button>
                <button class="cash-amount" value="1000">1000</button>
                <button class="cash-amount" value="2000">2000</button>
                <button class="cash-amount" value="3000">3000</button>
                <button class="cash-amount" value="5000">5000</button>
                <button class="cash-amount" value="6000">6000</button>
                <button class="cash-amount" value="8000">8000</button>
                <button class="cash-amount" value="10000">10000</button>
            </div>
            <p>PHP <input type="text" class="enter-amount-withdraw" placeholder="Enter amount" id="cash-amount-withdraw"></p>
        </div>
    </div>`;

    updatingScreen();

    // buttons to select amount to withdraw
    const cashAmount = document.querySelectorAll('.cash-amount');
    const enterAmountWithdraw = document.querySelector('.enter-amount-withdraw');

    // amount of cash to withdraw
    let selectedCashAmount = 0;
    cashAmount.forEach(function (amount) {
        amount.addEventListener('click', function () {
            selectedCashAmount = this.value;
            atmAccountBalance -= selectedCashAmount;
            transactionHistory.push({ transactionType: "Withdraw", amount: selectedCashAmount });
            // Input PIN after entering amount of money to withdraw
            atmPinSectionDisplay();
            atmPinValidation();
            // show the cash

        })
    });
    // when the user choose to withdraw a specific amount of cash
    enterSpecificCashAMount();
}

// emter specific cash amount to withdraw
function enterSpecificCashAMount() {

    // update DOM
    let amountToWithdraw;
    const numButtons = document.querySelectorAll('.num-buttons');
    let enterButton = document.querySelector('.enter');
    const clearButton = document.querySelector('.clear');
    let cancelButton = document.querySelector('.cancel');
    let enterAmountWithdraw = document.querySelector('.enter-amount-withdraw');

    numButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            enterAmountWithdraw.value += this.value;
        })
    })
    
    clearButton.addEventListener('click', function() {
        enterAmountWithdraw.value = '';
    })
    
    // continue to balance section
    enterButton.addEventListener('click', withdrawCash);
    
    
    function withdrawCash() {
        cancelButton.removeEventListener('click', displayMenu);
        
        
        if (enterAmountWithdraw.value !== '') {
            amountToWithdraw = enterAmountWithdraw.value;
            // make the value a number type
            atmAccountBalance -= enterAmountWithdraw.value;
            amountToWithdraw = Number(amountToWithdraw);
            console.log(typeof amountToWithdraw)
            transactionHistory.push({ transactionType: "Withdraw", amount: amountToWithdraw });

            enterButton.removeEventListener('click', withdrawCash)
            
            atmPinSectionDisplay();
            atmPinValidation();
            // show the cash
        }
    }
}

function animationCashWithdraw() {
    // take out the cash from atm
    const cashWithdraw = document.querySelector('.cash-container');
    const bottomWrapper = document.querySelector('.bottom-wrapper');
    // bttom wrapper index to see the money clearly
    bottomWrapper.style.zIndex = '111';

    if (transactionFlow === 2) {
        cashWithdraw.style.animation = 'moneyIn 4s linear';
    } else if (transactionFlow === 3) {
        cashWithdraw.style.animation = 'moneyOut 4s linear';
    }
    setTimeout(() => {
        if (transactionFlow === 2) {
            cashWithdraw.style.animation = '';
        } else if (transactionFlow === 3) {
            cashWithdraw.style.top = '110%';
        }
        bottomWrapper.style.zIndex = '';
        cashWithdraw.style.animationPlayState = 'paused';

        // click to remove the withdrawed cash
        cashWithdraw.addEventListener('click', function () {
            cashWithdraw.style.animation = '';
            cashWithdraw.style.top = '100%';
        })
    }, 3900);
}


// ====================  TRANSFER  ==============================
// ======================  MONEY  ==============================\
function transferMoney() {
    screenContent =
        `<div class="enter-account-number-to-transfer">
        <div class="left-side">
            <h4>Enter account number you would like to send to (PIN).</h4>
        </div>
        <div class="right-side">
            <input type="password" name="" id="pin-number" />
        </div>
    </div>`;

    updatingScreen();
    // store the value of pinnumber of account to transfer
    let transferAccountNumber = '';
    let pinNumber = document.querySelector('#pin-number');
    function receiverATMNumber() {
        // defining element of atm key buttons
        const numButtons = document.querySelectorAll('.num-buttons');
        const clearButton = document.querySelector('.clear');
        let cancelButton = document.querySelector('.cancel');

        // pass the value of clicked buttons to the input on PIN number
        numButtons.forEach(function (button, index, array) {
            button.addEventListener('click', function () {
                pinNumber.value += button.value;
            })
        })
        
        // back to menu
        cancelButton.addEventListener('click', displayMenu);
        
        clearButton.addEventListener('click', function () {
            pinNumber.value = ''; // clear value of input
        })

        // account number where to transfer
    }
    receiverATMNumber();
    
    
    let cancelButton = document.querySelector('.cancel');
    let enterButton = document.querySelector('.enter');
    // continue to enter amount of money to transfer section
    enterButton.addEventListener('click', function () {
        transferAccountNumber = pinNumber.value;
        if (transferAccountNumber !== '') {
            cancelButton.removeEventListener('click', displayMenu);
            enterAmountToTransfer(transferAccountNumber);
        }

    })
}

// function enter the amount to transfer
function enterAmountToTransfer(transferAccountNumber) {

    screenContent =
        `<div class="enter-amount-to-transfer">
            <div class="left-side">
                <h4>Enter the amount of you want to send.</h4>
            </div>
            <div class="right-side">
                <p>PHP <input type="text" id="amount-to-transfer"/></p>
            </div>
        </div>`;

    // enter amount of money to transfer
    updatingScreen();


    // amount of money to transfer store here
    let amountToTransfer = document.querySelector('#amount-to-transfer');
    let transferCash = 0;
    let enterButton = document.querySelector('.enter');
    const numButtons = document.querySelectorAll('.num-buttons');
    const clearButton = document.querySelector('.clear');
    let cancelButton = document.querySelector('.cancel');
    // pass the value of clicked buttons to the input amount of money
    numButtons.forEach(function (button, index, array) {
        button.addEventListener('click', function () {
            amountToTransfer.value += button.value;
        })
    })
    
    // back to menu
    cancelButton.addEventListener('click', displayMenu);

    clearButton.addEventListener('click', function () {
        pinNumber.value = ''; // clear value of input
    })
    console.log(transactionHistory)
    // transfer the money
    enterButton.addEventListener('click', transferMoneyToOtherAccount);
    function transferMoneyToOtherAccount() {
        transferCash = amountToTransfer.value;
        console.log(transferCash)
        if (transferCash !== '') {
            confirmTransferTransaction(transferAccountNumber, transferCash);
            enterButton.removeEventListener('click', transferMoneyToOtherAccount);
        }
    }

}

// to confirm details of transaction before transferring
function confirmTransferTransaction(pinNumber, transferCash) {
    atmAccountBalance -= transferCash;
    transferCash = Number(transferCash)
    transactionHistory.push({ transactionType: "Transfer", amount: transferCash});

    screenContent =
    `<div class="transfer-transaction-details">
        <div class="left-side">
        <h4>Confirm transaction details</h4>
        </div>
        <div class="right-side">
        <div class="transfer-details-list">
        <p class="pin-of-receiver">Account no: ${pinNumber}</p>
        <p class="amount-to-transfer">Amount: PHP ${transferCash.toLocaleString('en-US')}</p>
        </div>
        <div class="transfer-options">
        <button class="edit-transfer">Edit</button>
        <button class="confirm-transfer">Confirm</button>
        </div>
        </div>
    </div>`;

    updatingScreen();

    const editTransfer = document.querySelector('.edit-transfer');
    const confirmTransfer = document.querySelector('.confirm-transfer');

    // edit the transfer details again
    editTransfer.addEventListener('click', transferMoney);
    confirmTransfer.addEventListener('click', doYouNeedAReceipt);
}

