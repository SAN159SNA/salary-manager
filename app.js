let incomes = [];
let expenses = [];

function addIncome() {
  const type = document.getElementById("income-type").value;
  const amount = parseFloat(document.getElementById("income-amount").value);
  if (type && amount) {
    incomes.push({ type, amount });
    document.getElementById("income-type").value = "";
    document.getElementById("income-amount").value = "";
    updateSummary();
  }
}

function addExpense() {
  const type = document.getElementById("expense-type").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  if (type && amount) {
    expenses.push({ type, amount });
    document.getElementById("expense-type").value = "";
    document.getElementById("expense-amount").value = "";
    updateSummary();
    updateChart();
  }
}

function updateSummary() {
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  document.getElementById("total-income").innerText = totalIncome.toFixed(2);
  document.getElementById("total-expenses").innerText = totalExpenses.toFixed(2);
  document.getElementById("balance").innerText = balance.toFixed(2);
}

function groupExpensesByType() {
  const grouped = {};
  for (let item of expenses) {
    if (grouped[item.type]) {
      grouped[item.type] += item.amount;
    } else {
      grouped[item.type] = item.amount;
    }
  }
  return grouped;
}

let expenseChart;
function updateChart() {
  const grouped = groupExpensesByType();
  const labels = Object.keys(grouped);
  const data = Object.values(grouped);

  if (expenseChart) expenseChart.destroy();

  const ctx = document.getElementById('expenseChart').getContext('2d');
  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Expenses by Category',
        data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#E67E22'
        ]
      }]
    }
  });
}



let currentMode = "income"; // or "expense"

const incomeTypes = ["Salary", "Bonus", "Investment", "Freelance", "Other"];
const expenseTypes = ["Rent", "Food", "Transport", "Utilities", "Entertainment", "Other"];

function openModal(mode) {
  currentMode = mode;
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-title").innerText = mode === "income" ? "Add Income" : "Add Expense";

  const typeSelect = document.getElementById("modal-type");
  typeSelect.innerHTML = "";
  const options = mode === "income" ? incomeTypes : expenseTypes;
  options.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });

  document.getElementById("modal-amount").value = "";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function submitTransaction() {
  const type = document.getElementById("modal-type").value;
  const amount = parseFloat(document.getElementById("modal-amount").value);
  if (!type || isNaN(amount)) return;

  if (currentMode === "income") {
    incomes.push({ type, amount });
  } else {
    expenses.push({ type, amount });
  }

  updateSummary();
  updateChart();
  closeModal();
}
