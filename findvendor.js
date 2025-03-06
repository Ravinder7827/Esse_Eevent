let map;

document.getElementById("searchBtn").addEventListener("click", function() {
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const vendorContainer = document.getElementById("vendorContainer");

    // Clear previous results
    vendorContainer.innerHTML = '';

    // Sample data - replace this with your actual data source
    const vendors = [
        {
            imgSrc: "https://storage.googleapis.com/a1aa/image/0rQpJk5ICPYIFRsyAsyE4FU9xERI8eGcI1Ssg4rYECSppNzJA.jpg",
            title: "Caterer",
            category: "Caterer",
            lat: 40.7128,
            lng: -74.0060
        },
        {
            imgSrc: "https://storage.googleapis.com/a1aa/image/RKA59MUwzqprElgdVH8avcYj0k5Kfa0uFtkqCyh8dGUnpNzJA.jpg",
            title: "Caterer",
            category: "Caterer",
            lat: 34.0522,
            lng: -118.2437
        },
    ];

    vendors.forEach(vendor => {
        // Create a card for each vendor
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${vendor.imgSrc}" alt="${vendor.title}" />
            <div class="card-content">
                <p>${vendor.category}</p>
                <h3>${vendor.title}</h3>
            </div>
        `;
        
        // Add click event to navigate to vendor.html
        card.addEventListener("click", function() {
            localStorage.setItem("selectedVendor", JSON.stringify(vendor));
            window.location.href = "vendor.html";
        });
        
        vendorContainer.appendChild(card);
    });

    // Store vendors for map display
    window.vendorsData = vendors;
});

document.getElementById("showMapBtn").addEventListener("click", function() {
    const mapContainer = document.getElementById("map");
    mapContainer.style.display = 'block'; // Show the map

    if (!map) {
        map = new google.maps.Map(mapContainer, {
            center: { lat: 39.8283, lng: -98.5795 }, // Center of the US
            zoom: 4
        });
    }

    // Clear previous markers
    const markers = window.markers || [];
    markers.forEach(marker => marker.setMap(null));

    window.markers = []; // Reset markers array

    // Add new markers for each vendor
    window.vendorsData.forEach(vendor => {
        const marker = new google.maps.Marker({
            position: { lat: vendor.lat, lng: vendor.lng },
            map: map,
            title: vendor.title
        });
        window.markers.push(marker);
    });
});
