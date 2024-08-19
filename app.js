// const baseURL = "https://v6.exchangerate-api.com/v6/f5cddc86c84a346292337848/latest/USD";

const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector(".btn")

const fromCurr = document.querySelector('.form select');

const toCurr = document.querySelector('.to select');


for (let select of dropdown) {
    for (currCode in countryList) {
        // console.log(currCode,countryList[currCode]);
        let optionElement = document.createElement("option");
        optionElement.innerHTML = currCode;
        optionElement.value = currCode;

        if (select.name === "form" && currCode === "USD") {
            optionElement.selected = "selected"
        } else if (select.name === "to" && currCode === "INR") {
            optionElement.selected = "selected"
        }
           select.append(optionElement);
    }



    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    }
    )
}



const updateFlag = (element) => {

    
   let currValue = element.value //select currency code
let countryValue = countryList[currValue] // select cuntry code
let flagSrc = `https://flagsapi.com/${countryValue}/flat/64.png`
let img = element.parentElement.querySelector("img");
img.src = flagSrc

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input")
    let amtValue = amount.value


    if(amtValue === "" || amtValue <1){
         amtValue = 1;
         amount.value = "1"
    }
    console.log(amount.value);

console.log(fromCurr.value,toCurr.value);

let fromCurrency = fromCurr.value;
let toCurrency = toCurr.value;
let URL = `https://v6.exchangerate-api.com/v6/f5cddc86c84a346292337848/latest/${fromCurrency}`;

try {
    let response = await fetch(URL);
    let data = await response.json();
    let conversionRate = data.conversion_rates[toCurrency];
    const convertedAmount = (amtValue * conversionRate).toFixed(2);
    document.querySelector(".msg").innerHTML = `${amtValue} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
} catch (error) {
    console.error('Error fetching exchange rate:', error);
    document.querySelector(".msg").innerText = "Unable to fetch exchange rate. Please try again later.";
}
    
})