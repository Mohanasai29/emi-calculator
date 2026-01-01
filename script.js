function calculateEMI() {
    let price = Number(document.getElementById("price").value);
    let downPayment = Number(document.getElementById("downPayment").value);
    let rate = Number(document.getElementById("rate").value);
    let tenure = Number(document.getElementById("tenure").value);
    let result = document.getElementById("result");
    if (!price || !rate || !tenure) {
        result.style.color = "red";
        result.innerHTML = "Please fill all required fields!";
        return;
    }

    if (downPayment > price) {
        result.style.color = "red";
        result.innerHTML = "Down payment cannot be greater than price!";
        return;
    }

    let loanAmount = price - downPayment;
    let monthlyRate = rate / 12 / 100;

    let emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
              (Math.pow(1 + monthlyRate, tenure) - 1);

    let totalPayment = emi * tenure;
    let totalInterest = totalPayment - loanAmount;

    result.style.color = "green";
    result.innerHTML = `
        Loan Amount: ₹${loanAmount.toFixed(2)} <br>
        Monthly EMI: ₹${emi.toFixed(2)} <br>
        Total Interest: ₹${totalInterest.toFixed(2)} <br>
        Total Payable: ₹${totalPayment.toFixed(2)}
    `;
}
