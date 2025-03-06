function toggleGuestForm() {
    const formContainer = document.getElementById('guest-form-container');
    formContainer.classList.toggle('hidden'); // Toggle visibility of the form
}

function addGuest(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get guest details from the form
    const name = document.getElementById('guest-name').value;
    const family = document.getElementById('guest-family').value;
    const table = document.getElementById('guest-table').value;
    const mainCourse = document.getElementById('guest-main-course').value;
    const comment = document.getElementById('guest-comment').value;

    // Create a new row for the guest
    const tableBody = document.getElementById('guest-list-body');
    const newRow = `
        <tr>
            <td contenteditable="true" onblur="saveData()">${name}</td>
            <td contenteditable="true" onblur="saveData()">${family}</td>
            <td contenteditable="true" onblur="saveData()">${table}</td>
            <td contenteditable="true" onblur="saveData()">${mainCourse}</td>
            <td contenteditable="true" onblur="saveData()">${comment}</td>
            <td><button class="delete-button" onclick="deleteGuest(this)">Delete</button></td>
        </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', newRow);

    // Save the updated list to localStorage
    saveData();

    // Clear the form inputs
    document.getElementById('guest-form').reset();

    // Close the form after adding the guest
    toggleGuestForm(); // Hide the form
}

function filterGuests() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const guestRows = document.querySelectorAll('#guest-list-body tr');

    guestRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let rowContainsSearchTerm = false;

        for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                rowContainsSearchTerm = true;
                break;
            }
        }

        row.style.display = rowContainsSearchTerm ? '' : 'none';
    });
}

function saveData() {
    const tableRows = document.querySelectorAll('#guest-list-body tr');
    const guestData = [];

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.innerText || cell.querySelector('input')?.value);
        guestData.push(rowData);
    });

    // Save to local storage
    localStorage.setItem('guestList', JSON.stringify(guestData));

    // Update PDF content
    updatePdfContent(guestData);
}

function updatePdfContent(guestData) {
    const pdfBody = document.getElementById('guest-list-body-pdf');
    pdfBody.innerHTML = ''; // Clear existing rows

    guestData.forEach(guest => {
        const newRow = `
            <tr>
                <td>${guest[0]}</td>
                <td>${guest[1]}</td>
                <td>${guest[2]}</td>
                <td>${guest[3]}</td>
                <td>${guest[4]}</td>
            </tr>
        `;
        pdfBody.insertAdjacentHTML('beforeend', newRow);
    });
}

function loadData() {
    const storedData = localStorage.getItem('guestList');
    if (storedData) {
        const guestData = JSON.parse(storedData);
        const tableBody = document.getElementById('guest-list-body');

        // Clear existing rows
        tableBody.innerHTML = '';

        guestData.forEach(guest => {
            const newRow = `
                <tr>
                    <td contenteditable="true" onblur="saveData()">${guest[0]}</td>
                    <td contenteditable="true" onblur="saveData()">${guest[1]}</td>
                    <td contenteditable="true" onblur="saveData()">${guest[2]}</td>
                    <td contenteditable="true" onblur="saveData()">${guest[3]}</td>
                    <td contenteditable="true" onblur="saveData()">${guest[4]}</td>
                    <td><button class="delete-button" onclick="deleteGuest(this)">Delete</button></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', newRow);
        });

        // Update PDF content
        updatePdfContent(guestData);
    }
}

// Delete guest function
function deleteGuest(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    saveData(); // Update local storage after deletion
}

// Call loadData on page load
document.addEventListener('DOMContentLoaded', loadData);
document.getElementById('guest-form').addEventListener('submit', addGuest);
document.querySelector('.close-button').addEventListener('click', toggleGuestForm);

 // Download PDF functionality
 document.getElementById('downloadPdfButton').addEventListener('click', function() {
    const element = document.querySelector('.guest-list'); // or the element you want to convert to PDF
    html2pdf()
        .from(element)
        .save('guest_list.pdf')
        .catch(err => console.error('PDF download failed:', err));
});

