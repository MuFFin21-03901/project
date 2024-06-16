const dropList = document.querySelectorAll(".from-to-container select");
const from = document.getElementById('from');
const to = document.getElementById('to');
const amount = document.getElementById('amount');
const result = document.getElementById('exchange-rate');
const flag1 = document.getElementById('flag1');
const flag2 = document.getElementById('flag2');

const country_code = {
    "USD": "United States Dollar",
    "RUB": "Russian Ruble",
    "EUR": "Euro",
    "UAH": "Ukrainian Hryvnia",
    "GBP": "British Pound Sterling",
    "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan"
    // додайте інші валютні коди тут
};

function backwards() {
    [from.value, to.value] = [to.value, from.value];
    changeFlag(from.value, flag1);
    changeFlag(to.value, flag2);
    convertCurrency();
}

function changeFlag(currency, flagElement) {
    if (currency === 'UAH') {
        flagElement.src = "https://flagsapi.com/UA/flat/64.png";
    } else if (currency === 'RUB') {
        flagElement.src = "https://flagsapi.com/RU/flat/64.png";
    } else if (currency === 'USD') {
        flagElement.src = "https://flagsapi.com/US/flat/64.png";
    } else if (currency === 'EUR') {
        flagElement.src = "https://flagsapi.com/FR/flat/64.png";
    } else if (currency === 'GBP') {
        flagElement.src = "https://flagsapi.com/GB/flat/64.png";
    } else if (currency === 'JPY') {
        flagElement.src = "https://flagsapi.com/JP/flat/64.png";
    } else if (currency === 'CAD') {
        flagElement.src = "https://flagsapi.com/CA/flat/64.png";
    } else if (currency === 'AUD') {
        flagElement.src = "https://flagsapi.com/AU/flat/64.png";
    } else if (currency === 'CHF') {
        flagElement.src = "https://flagsapi.com/CH/flat/64.png";
    } else if (currency === 'CNY') {
        flagElement.src = "https://flagsapi.com/CN/flat/64.png";
    } else if (currency === 'SEK') {
        flagElement.src = "https://flagsapi.com/SE/flat/64.png";
    } else if (currency === 'NZD') {
        flagElement.src = "https://flagsapi.com/NZ/flat/64.png";
    } 
}

from.addEventListener('change', () => changeFlag(from.value, flag1));
to.addEventListener('change', () => changeFlag(to.value, flag2));

async function convertCurrency() {
    let fromCurrency = from.value;
    let toCurrency = to.value;
    let amountValue = amount.value;

    if (amountValue === '' || isNaN(amountValue)) {
        result.textContent = 'Please enter a valid amount';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amountValue * rate).toFixed(2);
        result.textContent = `${amountValue} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
    }
}

document.getElementById('rate-id').addEventListener('click', convertCurrency);
document.getElementById('icon').addEventListener('click', backwards);

changeFlag(from.value, flag1);
changeFlag(to.value, flag2);
