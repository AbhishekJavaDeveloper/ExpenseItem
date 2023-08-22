document.addEventListener("DOMContentLoaded", function () {
    const addExpenseButton = document.getElementById("addExpenseButton");
    const expensesList = document.getElementById("expensesList");

    // Load saved expenses from local storage on page load
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    savedExpenses.forEach(expense => {
        createExpenseItem(expense.amount, expense.description, expense.category);
    });

    addExpenseButton.addEventListener("click", function () {
        const expenseAmount = document.getElementById("expenseAmount").value;
        const description = document.getElementById("choosedescription").value;
        const category = document.getElementById("categorySelect").value;

        if (expenseAmount && description && category) {
            createExpenseItem(expenseAmount, description, category);
            saveToLocalStorage(expenseAmount, description, category);

            document.getElementById("expenseAmount").value = "";
            document.getElementById("choosedescription").value = "";
            document.getElementById("categorySelect").value = "";
        }
    });

    function createExpenseItem(amount, description, category) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span><strong>Amount:</strong> ${amount}</span>
            <span><strong>Description:</strong> ${description}</span>
            <span><strong>Category:</strong> ${category}</span>
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
        `;
        expensesList.appendChild(listItem);
    }

    // Function to save data to local storage
    function saveToLocalStorage(amount, description, category) {
        const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
        expenseData.push({ amount, description, category });
        localStorage.setItem("expenses", JSON.stringify(expenseData));
    }

function editExpense(button) {
    const listItem = button.parentElement;
    const expenseAmount = listItem.querySelector("span:nth-of-type(1)").textContent.split(":")[1].trim();
    const description = listItem.querySelector("span:nth-of-type(2)").textContent.split(":")[1].trim();
    const category = listItem.querySelector("span:nth-of-type(3)").textContent.split(":")[1].trim();

    document.getElementById("expenseAmount").value = expenseAmount;
    document.getElementById("choosedescription").value = description;
    document.getElementById("categorySelect").value = category;

    listItem.remove();
}

function deleteExpense(button) {
    const listItem = button.parentElement;
    const expenseAmount = listItem.querySelector("span:nth-of-type(1)").textContent.split(":")[1].trim();
    const description = listItem.querySelector("span:nth-of-type(2)").textContent.split(":")[1].trim();
    const category = listItem.querySelector("span:nth-of-type(3)").textContent.split(":")[1].trim();

    listItem.remove();
    removeExpenseFromLocalStorage(expenseAmount, description, category);
}

function removeExpenseFromLocalStorage(amount, description, category) {
    const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenseData = expenseData.filter(expense => {
        return !(expense.amount === amount && expense.description === description && expense.category === category);
    });
    localStorage.setItem("expenses", JSON.stringify(updatedExpenseData));
}

});
