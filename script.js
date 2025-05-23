
const API_BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://currency-converter-a7d7.onrender.com";
async function requestExchange(baseCurrency) {
    try {
        let response = await fetch(`${API_BASE_URL}/exchange-rates/${baseCurrency}`);
        let data = await response.json();
        return data;

    } catch(error) {
        console.error("Error fetching exchange rates:",error);
    }


    
}
async function getCurrencies() {
    let rates = await requestExchange("USD");
    if (!rates) return;
    let selectCurrency = document.querySelectorAll(".select-currency");

    Object.keys(rates).forEach(currency => {
        selectCurrency.forEach(select => {
            let option = document.createElement("option");
            option.value = currency;
            option.textContent = currency;
            select.appendChild(option);
        });
    });


}
document.addEventListener("DOMContentLoaded", getCurrencies);
document.getElementById("submit").addEventListener("click", async function(){
    let rates = await requestExchange("USD");
    if(!rates) {
        alert("Failed to get exchange rates!");
        return;
    }

    let fromCurrencies = document.getElementById("from-currencies").value;
    let toCurrencies = document.getElementById("to-currencies").value;
    let currencyAmount =  parseFloat(document.getElementById("amount").value);
    
    if(!currencyAmount || currencyAmount < 0) {
        alert("Enter a valid amount !");
        return;
    }
   let rateExchange = rates[toCurrencies] / rates[fromCurrencies];
   let amountConverted = (currencyAmount * rateExchange).toFixed(2);

   document.getElementById("result").innerText = `${currencyAmount} ${fromCurrencies} = ${amountConverted} ${toCurrencies}`;
});


