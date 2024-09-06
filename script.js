const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');

const countries = [
    {code: "USD", name: "United States Dollar"},
    {code: "INR", name: "Indian Rupee"},
    {code : "NZD", name: "New Zealand Dollar"}
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    option1.value = country.code;
    option1.textContent = `${country.code} (${country.name})`
    fromCurrencyElement.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = country.code;
    option2.textContent = `${country.code} (${country.name})`
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});

const getExchangeRate = async () =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching exchange rates..."

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

    const data = await response.json();
    console.log(data)

    const coversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * coversionRate);

    convertedAmountElement.value = convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}` 
}

fromAmountElement.addEventListener('input',getExchangeRate);
fromCurrencyElement.addEventListener('change',getExchangeRate);toCurrencyElement.addEventListener('input',getExchangeRate);