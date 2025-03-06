// Function to enable editing on hover and blur events
function makeItemEditable(item) {
    const priceElement = item.querySelector('.price');

    item.addEventListener('mouseenter', () => {
        priceElement.contentEditable = true; // Make price editable
        priceElement.focus(); // Focus on the price
        priceElement.classList.add('highlight'); // Highlight when editing
    });

    priceElement.addEventListener('blur', () => {
        const enteredPrice = priceElement.textContent.replace('₹', '').trim();
        if (!isNaN(enteredPrice) && enteredPrice !== '') {
            const itemName = item.querySelector('span').textContent.trim();
            localStorage.setItem(itemName, enteredPrice); // Save price to localStorage
            priceElement.textContent = `₹${parseFloat(enteredPrice).toFixed(2)}`; // Format as currency
        } else {
            priceElement.textContent = '₹0.00'; // Reset to default if invalid
        }
        priceElement.contentEditable = false; // Disable editing after focus lost
        priceElement.classList.remove('highlight'); // Remove highlight
    });

    priceElement.addEventListener('click', () => {
        priceElement.contentEditable = true; // Make price editable
        priceElement.focus(); // Focus on the price
        priceElement.classList.add('highlight'); // Highlight when editing
    });
}

// Function to delete an item
function deleteItem(event) {
    event.preventDefault();
    const item = event.target.closest('.item');
    const itemName = item.querySelector('span').textContent.trim();

    if (item) {
        item.remove(); // Remove the item from the DOM
        localStorage.removeItem(itemName); // Remove from localStorage
    }
}

// Function to add a new item
function addNewItem(event) {
    event.preventDefault();

    const newItem = document.createElement('div');
    newItem.classList.add('item');

    const deleteButton = document.createElement('a');
    deleteButton.href = "#";
    deleteButton.classList.add('delete-item');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Use trash icon

    deleteButton.addEventListener('click', deleteItem); // Attach delete event listener

    const itemName = document.createElement('span');
    itemName.contentEditable = true;
    itemName.textContent = "New Item";

    const priceElement = document.createElement('span');
    priceElement.classList.add('price');
    priceElement.textContent = "₹0.00";

    newItem.appendChild(itemName);
    newItem.appendChild(deleteButton);
    newItem.appendChild(priceElement);

    const category = event.target.closest('.category');
    category.querySelector('.item-container').appendChild(newItem); // Insert the new item into the item container

    makeItemEditable(newItem);
}

// Load initial items and functionality
const items = document.querySelectorAll('.item');
items.forEach(item => {
    const itemKey = item.querySelector('span').textContent.trim();
    const savedPrice = localStorage.getItem(itemKey);
    if (savedPrice) {
        item.querySelector('.price').textContent = `₹${parseFloat(savedPrice).toFixed(2)}`;
    }
    makeItemEditable(item);
});

// Add new item functionality
const addItemButtons = document.querySelectorAll('.add-item');
addItemButtons.forEach(button => {
    button.addEventListener('click', addNewItem);
});

// Set value functionality
const setValueButton = document.querySelector('.set-value');
const budgetValueDisplay = document.querySelector('.budget-value span');

setValueButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newBudget = prompt("Enter your budget:");
    if (!isNaN(newBudget) && newBudget !== '' && newBudget >= 0) {
        localStorage.setItem('budget', newBudget); // Save budget to localStorage
        budgetValueDisplay.textContent = `₹${parseFloat(newBudget).toFixed(2)}`; // Update displayed budget
    } else {
        alert("Please enter a valid number.");
    }
});

// Load initial budget from localStorage if it exists
const savedBudget = localStorage.getItem('budget');
if (savedBudget) {
    budgetValueDisplay.textContent = `₹${parseFloat(savedBudget).toFixed(2)}`; // Set initial budget display
}

// Add new category functionality
document.getElementById('add-category-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const categoryInput = document.querySelector('.category-input');
    const categoryName = categoryInput.value.trim();

    if (categoryName) {
        const newCategory = document.createElement('div');
        newCategory.classList.add('category');
        newCategory.innerHTML = `
            <h4>${categoryName}</h4>
            <div class="item-container"></div>
            <a href="#" class="add-item">+ Add New Item</a>
            <a href="#" class="deleteitem1">- Delete Category</a>
        `;

        const addCategoryDiv = document.querySelector('.add-category');
        addCategoryDiv.parentNode.insertBefore(newCategory, addCategoryDiv);

        categoryInput.value = ''; // Clear the input

        newCategory.querySelector('.add-item').addEventListener('click', addNewItem);
        newCategory.querySelector('.deleteitem1').addEventListener('click', deleteCategory);
    } else {
        alert("Please enter a category name.");
    }
});

// Function to delete a category
function deleteCategory(event) {
    event.preventDefault();
    const category = event.target.closest('.category');
    if (category) {
        category.remove(); // Remove the category from the DOM
    }
}

// Download PDF functionality
document.getElementById('downloadBudgetPdfButton').addEventListener('click', function() {
    const budgetElement = document.createElement('div');
    budgetElement.innerHTML = `<h2>Budget Details</h2>`;

    // Budget value
    budgetElement.innerHTML += `<div class="budget-value"><h3>Budget: <span>${document.querySelector('.budget-value span').textContent}</span></h3></div>`;

    // Categories and items
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const categoryName = category.querySelector('h4').textContent;
        budgetElement.innerHTML += `<h4>${categoryName}</h4>`;
        const items = category.querySelectorAll('.item');
        items.forEach(item => {
            const itemName = item.querySelector('span').textContent;
            const itemPrice = item.querySelector('.price').textContent;
            budgetElement.innerHTML += `<p>${itemName}: ${itemPrice}</p>`;
        });
    });

    html2pdf()
        .from(budgetElement)
        .save('budget.pdf')
        .catch(err => console.error('PDF download failed:', err));
});
