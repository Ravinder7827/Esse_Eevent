document.getElementById('add-vendor-btn').addEventListener('click', function() {
    const vendorName = prompt("Enter the vendor name:");
    const vendorType = prompt("Enter the vendor type (e.g., Wedding Planner):");
    const vendorLocation = prompt("Enter the vendor location (e.g., Destination):");
    const vendorImage = prompt("Enter the vendor image URL:");

    if (vendorName && vendorType && vendorLocation && vendorImage) {
        addVendor(vendorName, vendorType, vendorLocation, vendorImage);
        saveVendorToDatabase(vendorName, vendorType, vendorLocation, vendorImage);
    } else {
        alert("All fields are required to add a vendor.");
    }
});

function addVendor(name, type, location, image) {
    const vendorsContainer = document.getElementById('vendors-container');

    const vendorDiv = document.createElement('div');
    vendorDiv.className = 'bg-white shadow-md rounded-lg overflow-hidden w-1/4';
    vendorDiv.innerHTML = `
        <img alt="${name}" class="w-full h-40 object-cover" src="${image}"/>
        <div class="p-4">
            <span class="block text-sm text-purple-600 mb-1">${location}</span>
            <span class="block text-sm font-medium mb-1">${type}</span>
            <span class="block text-sm font-semibold">${name}</span>
        </div>
    `;

    vendorsContainer.appendChild(vendorDiv);
}

function saveVendorToDatabase(name, type, location, image) {
    fetch('add_vendor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, location, image })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Vendor saved to database successfully.");
        } else {
            alert("Error saving vendor: " + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('download-pdf-btn').addEventListener('click', function() {
    fetch('fetch_vendors.php')
        .then(response => response.json())
        .then(vendors => {
            if (vendors.length === 0) {
                alert("No vendors to download.");
                return;
            }

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            pdf.text('List of Vendors:', 10, 10);
            vendors.forEach((vendor, index) => {
                pdf.text(`${vendor.name} - ${vendor.type} - ${vendor.location}`, 10, 20 + (index * 10));
            });

            pdf.save('vendors.pdf');
        })
        .catch(error => console.error('Error fetching vendors:', error));
});

// Load vendors on page load
window.onload = function() {
    loadVendors();
}

function loadVendors() {
    fetch('fetch_vendors.php')
        .then(response => response.json())
        .then(vendors => {
            vendors.forEach(vendor => {
                addVendor(vendor.name, vendor.type, vendor.location, vendor.image_url);
            });
        })
        .catch(error => console.error('Error loading vendors:', error));
}
