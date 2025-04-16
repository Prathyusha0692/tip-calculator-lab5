document.addEventListener("DOMContentLoaded", function () {
    const billTotal = document.getElementById("billTotal");
    const tipRange = document.getElementById("tipRange");
    const tipPercentageOutput = document.getElementById("tipPercentage");
    const totalWithTax = document.getElementById("totalWithTax");
    const currencySelect = document.getElementById("currency");
    const convertedTipAmount = document.getElementById("convertedTipAmount");
    const convertedTotal = document.getElementById("convertedTotal");
    const error = document.getElementById("error");
    const tipCurrencySymbol = document.getElementById("tipCurrencySymbol");
    const totalCurrencySymbol = document.getElementById("totalCurrencySymbol");
  
    function getCurrencyRate(currency) {
      switch (currency) {
        case "eur":
          return { rate: 0.95, symbol: "€" };
        case "inr":
          return { rate: 85, symbol: "₹" };
        case "usd":
        default:
          return { rate: 1, symbol: "$" };
      }
    }
  
    function calculate() {
      const billValue = parseFloat(billTotal.value);
  
      if (isNaN(billValue) || billValue <= 0) {
        tipRange.value = 0;
        tipPercentageOutput.textContent = "0%";
        error.textContent = "Please enter a valid bill amount greater than 0.";
        totalWithTax.value = "";
        convertedTipAmount.value = "";
        convertedTotal.value = "";
        tipCurrencySymbol.textContent = "";
        totalCurrencySymbol.textContent = "";
        return;
      }
  
      error.textContent = "";
  
      const tax = 0.11 * billValue;
      const totalWithTaxValue = billValue + tax;
      totalWithTax.value = totalWithTaxValue.toFixed(2);
  
      const tipPercent = parseInt(tipRange.value);
      const tipAmount = (tipPercent / 100) * totalWithTaxValue;
  
      const currencyData = getCurrencyRate(currencySelect.value);
      const convertedTip = tipAmount * currencyData.rate;
      const convertedTotalValue = (totalWithTaxValue + tipAmount) * currencyData.rate;
  
      tipPercentageOutput.textContent = `${tipPercent}%`;
  
      convertedTipAmount.value = convertedTip.toFixed(2);
      convertedTotal.value = convertedTotalValue.toFixed(2);
  
      tipCurrencySymbol.textContent = currencyData.symbol;
      totalCurrencySymbol.textContent = currencyData.symbol;
    }
  
    billTotal.addEventListener("input", calculate);
    tipRange.addEventListener("input", calculate);
    currencySelect.addEventListener("change", calculate);
  });
  