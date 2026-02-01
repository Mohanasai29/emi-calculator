const priceInput = document.getElementById("price");
const downPaymentInput = document.getElementById("downPayment");
const rateInput = document.getElementById("rate");
const tenureInput = document.getElementById("tenure");
const result = document.getElementById("result");

let isCalculated = false;

function calculateEMI() {
    isCalculated = true;
    calculateLogic();
    enableRealtime();
}

function calculateLogic() {
    let price = Number(priceInput.value);
    let downPayment = Number(downPaymentInput.value);
    let rate = Number(rateInput.value);
    let tenure = Number(tenureInput.value);

    if (!price || !rate || !tenure) {
        result.innerHTML = "";
        return;
    }

    if (downPayment > price) {
        result.style.color = "red";
        result.innerHTML = "Down payment cannot be greater than price!";
        return;
    }

    let loanAmount = price - (downPayment || 0);
    let monthlyRate = rate / 12 / 100;

    let emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);

    let totalPayment = emi * tenure;
    let totalInterest = totalPayment - loanAmount;

    result.style.color = "#1f3c88";
    result.innerHTML = `
        Loan Amount: ₹${loanAmount.toFixed(2)} <br>
        Monthly EMI: ₹${emi.toFixed(2)} <br>
        Total Interest: ₹${totalInterest.toFixed(2)} <br>
        Total Payable: ₹${totalPayment.toFixed(2)}
    `;
}

function enableRealtime() {
    if (!isCalculated) return;

    [priceInput, downPaymentInput, rateInput, tenureInput].forEach(input => {
        input.oninput = calculateLogic;
    });
}

function resetForm() {
    priceInput.value = "";
    downPaymentInput.value = "";
    rateInput.value = "";
    tenureInput.value = "";

    result.innerHTML = "";
    isCalculated = false;
}
