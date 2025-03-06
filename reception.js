let uploadedFilesList = [];

// Set Date Functionality
document.getElementById('setDate').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action
    const dateDisplay = document.getElementById('dateDisplay');
    const date = prompt("Please enter your reception date (YYYY-MM-DD):");
    if (date) {
        dateDisplay.textContent = date; // Update display text
        dateDisplay.setAttribute('data-date', date); // Store date in attribute
    }
});

// Set Location Functionality
document.getElementById('setLocation').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action
    const locationDisplay = document.getElementById('locationDisplay');
    const location = prompt("Please enter your reception location:");
    if (location) {
        locationDisplay.textContent = location; // Update display text
        locationDisplay.setAttribute('data-location', location); // Store location in attribute
    }
});

// File Upload Functionality
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('uploadInput').click();
});

document.getElementById('uploadInput').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 30) {
        alert("You can only upload up to 30 photos.");
        return;
    }

    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    uploadedFilesDiv.innerHTML = ''; // Clear previous file list
    uploadedFilesList = []; // Reset the array

    Array.from(files).forEach(file => {
        if (file.size > 20 * 1024 * 1024) { // 20MB
            alert(`File ${file.name} exceeds 20MB size limit.`);
        } else {
            uploadedFilesList.push(file); // Add file to the list
            uploadedFilesDiv.innerHTML += `<p>${file.name}</p>`; // Display file names
        }
    });
});

// Download PDF Functionality
document.getElementById('downloadPDF').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent any default action on button click

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const description = document.getElementById('receptionDescription').value;
    const date = document.getElementById('dateDisplay').getAttribute('data-date') || 'Not specified';
    const location = document.getElementById('locationDisplay').getAttribute('data-location') || 'Not specified';

    // Add reception details to PDF
    pdf.text('Reception Details', 10, 10);
    pdf.text(`Date: ${date}`, 10, 20);
    pdf.text(`Location: ${location}`, 10, 30);
    pdf.text(`Description: ${description || 'No description provided'}`, 10, 40);

    // Add uploaded files to the PDF
    if (uploadedFilesList.length > 0) {
        pdf.text('Uploaded Photos:', 10, 60);
        uploadedFilesList.forEach((file, index) => {
            pdf.text(file.name, 10, 70 + (index * 10));
        });
    } else {
        pdf.text('No photos uploaded.', 10, 60);
    }

    // Save the PDF
    pdf.save('reception-details.pdf'); // Save the PDF
});

document.getElementById('setDate').addEventListener('click', function() {
    const date = prompt("Enter the event date (YYYY-MM-DD):");
    if (date) {
        document.getElementById('dateDisplay').textContent = date;
        document.getElementById('eventDate').value = date; // Update hidden input
    }
});

document.getElementById('setLocation').addEventListener('click', function() {
    const location = prompt("Enter the event location:");
    if (location) {
        document.getElementById('locationDisplay').textContent = location;
        document.getElementById('eventLocation').value = location; // Update hidden input
    }
});
