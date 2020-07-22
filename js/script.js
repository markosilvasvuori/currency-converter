let baseCurrency = 'EUR';
let targetCurrency = 'USD';
let url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`;
let rates = '';

const updateRates = () => fetch(url)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Server Error: ' + response.status);
                return;
            }

            response.json().then(function(data) {
                rates = Object.entries(data.rates);
                convert();
            });
        }
    )
    .catch(function(err) {
        console.log('Error: ', err);
    });

window.addEventListener('load', updateRates);


// Convert currencies
const convert = () => {
    const baseCurrency = document.querySelector('#top-input').value;
    let bottomCurrency = document.querySelector('#bottom-input');

    for (let i = 0; i < rates.length; i++) {
        if (rates[i][0] === targetCurrency) {
            const result = baseCurrency * rates[i][1];
            bottomCurrency.value = result.toFixed(2);
        }
    }
    clearBottomInput();
};

// Update selected currencies
const updateCurrencies = () => {
    baseCurrency = document.querySelector('#top-currency').value;
    targetCurrency = document.querySelector('#bottom-currency').value;
    url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`;
    updateRates();
};

const swapCurrencies = () => {
    const baseCurrency = document.querySelector('#top-currency');
    const targetCurrency = document.querySelector('#bottom-currency');
    const baseCurrencyValue = baseCurrency.value;
    const targetCurrencyValue = targetCurrency.value;
    baseCurrency.value = targetCurrencyValue;
    targetCurrency.value = baseCurrencyValue;
    updateCurrencies();
};

const clearBottomInput = () => {
    const topInput = document.querySelector('#top-input');
    const bottomInput = document.querySelector('#bottom-input');
    if (topInput.value == '') {
        bottomInput.value = '';
    }
}