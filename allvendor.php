<?php
include 'connection.php';

// Fetch vendors from the database
$sql = "SELECT * FROM allvendor";
$result = $con->query($sql);
?>

<div class="max-w-4xl mx-auto">
    <h1 class="text-center text-2xl font-semibold mb-4">All Vendors</h1>
    <p class="text-center mb-8">
        Discover the perfect <strong>vendors, venues, and services</strong> for your wedding day by trying your luck in our extensive database of verified professionals.
    </p>
    <div class="flex space-x-4 mb-8" id="vendors-container">
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<div class="bg-white shadow-md rounded-lg overflow-hidden w-1/4">';
                echo '<img alt="' . htmlspecialchars($row['name']) . '" class="w-full h-40 object-cover" src="' . htmlspecialchars($row['image_url']) . '"/>';
                echo '<div class="p-4">';
                echo '<span class="block text-sm text-purple-600 mb-1">' . htmlspecialchars($row['location']) . '</span>';
                echo '<span class="block text-sm font-medium mb-1">' . htmlspecialchars($row['type']) . '</span>';
                echo '<span class="block text-sm font-semibold">' . htmlspecialchars($row['name']) . '</span>';
                echo '</div>';
                echo '</div>';
            }
        } else {
            echo '<p>No vendors found.</p>';
        }
        ?>
        <div class="bg-white shadow-md rounded-lg flex items-center justify-center w-1/4 border-2 border-dashed border-purple-600" id="add-vendor-btn">
            <span class="text-purple-600 text-2xl">+</span>
            <span class="block text-sm text-purple-600 mt-2">Search and Add Vendors</span>
        </div>
    </div>
    <button id="refresh-btn" class="bg-red-500 text-white rounded-lg px-4 py-2">Refresh Vendors</button>
    <button id="download-pdf-btn" class="bg-green-500 text-white rounded-lg px-4 py-2">Download PDF</button>
</div>

<?php
// Close the connection
$con->close();
?>
