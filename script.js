"use strict";
const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const interestRate = document.getElementById("rate");
const repaymentRadioBtn = document.getElementById("repayment");
const interestsRadioBtn = document.getElementById("interest");
const calculationBtn = document.querySelector(".calculate-btn");
const clearBtn = document.querySelector(".clear span");
const repaymentValue = document.querySelector(".repayment-value");
const termValue = document.querySelector(".term-value");

// Calulate monthly repayment value function
const monthlyRepayment = () => {
  let amountValue = mortgageAmount.value;
  let years = mortgageTerm.value * 12;
  let rateValue = interestRate.value / 100 / 12;

  // Monthly Repayment Formula
  let monthlyRepayment = (
    (amountValue * rateValue * Math.pow(1 + rateValue, years)) /
    (Math.pow(1 + rateValue, years) - 1)
  ).toFixed(2);

  // Total amount Over Term Formula
  let overTerm = (monthlyRepayment * years).toFixed(2);

  // Convert values to (100,000) format
  const formattedMonthlyValue = Intl.NumberFormat("en", {
    currency: "GBP",
    style: "currency",
  }).format(monthlyRepayment);

  const formattedTotalValue = Intl.NumberFormat("en", {
    currency: "GBP",
    style: "currency",
  }).format(overTerm);

  // Insert the formatted values into their proper place
  repaymentValue.textContent = formattedMonthlyValue;
  termValue.textContent = formattedTotalValue;
};

// Calulate interests value function
const monthlyInterestsRate = () => {
  let amountValue = mortgageAmount.value;
  let years = mortgageTerm.value * 12;
  let rateValue = interestRate.value / 100;

  // Monthly interests formula
  let interestsValue = (amountValue * (rateValue / 12)).toFixed(2);

  // Total amount Over Term Formula
  let overTerm = (interestsValue * years).toFixed(2);

  // Convert values to (100,000) format
  const formattedInterestsValue = Intl.NumberFormat("en", {
    currency: "GBP",
    style: "currency",
  }).format(interestsValue);

  const formattedTotalValue = Intl.NumberFormat("en", {
    currency: "GBP",
    style: "currency",
  }).format(overTerm);

  // Insert the formatted values into their proper display place
  repaymentValue.textContent = formattedInterestsValue;
  termValue.textContent = formattedTotalValue;
};

const choices = () => {
  if (repaymentRadioBtn.checked) {
    monthlyRepayment();
  }
  if (interestsRadioBtn.checked) {
    monthlyInterestsRate();
  }
};

const isValid = (inputField)=>{
  let parentElem = inputField.parentElement;
  let prevElem = inputField.previousElementSibling;
  let nextElem = inputField.nextElementSibling;
let order = prevElem || nextElem;

if(prevElem){
  parentElem.classList.remove("border-danger");
  parentElem.nextElementSibling.classList.remove("d-block");
  prevElem.classList.remove("bg-danger");
  prevElem.classList.remove("border-danger");
  prevElem.style.color = "hsl(202, 55%, 16%)";
}
if(nextElem){
  parentElem.classList.remove("border-danger");
  parentElem.nextElementSibling.classList.remove("d-block");
  nextElem.classList.remove("bg-danger");
  nextElem.classList.remove("border-danger");
  nextElem.style.color = "hsl(202, 55%, 16%)";
  nextElem.classList.remove("d-block");
}

}
const notValid = (inputField)=>{
  let parentElem = inputField.parentElement;
  let prevElem = inputField.previousElementSibling;
  let nextElem = inputField.nextElementSibling;
  let order = prevElem || nextElem;

if(prevElem){
  parentElem.classList.add("border-danger");
  parentElem.nextElementSibling.classList.add("d-block");
  prevElem.classList.add("bg-danger");
  prevElem.classList.add("border-danger");
  prevElem.style.color = "#ffffff";
}
if(nextElem){
  parentElem.classList.add("border-danger");
  parentElem.nextElementSibling.classList.add("d-block");
  nextElem.classList.add("bg-danger");
  nextElem.classList.add("border-danger");
  nextElem.style.color = "#ffffff";
  nextElem.classList.add("d-block");
}
document.querySelector(".empty").classList.remove("d-none");
document.querySelector(".output").classList.add("d-none");

};


const inputsValidation=()=>{
if(!mortgageAmount.value){
  notValid(mortgageAmount);
}else{
  isValid(mortgageAmount);
}
if(!mortgageTerm.value){
  notValid(mortgageTerm);
}else{
  isValid(mortgageTerm);
}
if(!interestRate.value){
  notValid(interestRate);
}else{
  isValid(interestRate);
}

if(!repaymentRadioBtn.checked && !interestsRadioBtn.checked){
  interestsRadioBtn.closest('.form-check').nextElementSibling.classList.add('d-block');
}else{
  interestsRadioBtn.closest('.form-check').nextElementSibling.classList.remove('d-block');
}
if(mortgageAmount && mortgageTerm && interestRate){
  document.querySelector(".empty").classList.add("d-none");
document.querySelector(".output").classList.remove("d-none");
choices();
}

}

//Reset function
const clearAll=()=>{
    document.querySelector(".empty").classList.remove("d-none");
    document.querySelector(".output").classList.add("d-none");
    document.getElementsByTagName('form')[0].reset();
}



// Event handlers
calculationBtn.addEventListener("click", () => {
 inputsValidation();
  
});
clearBtn.addEventListener("click", () => {
  clearAll();
});
