<?php
include 'connection.php';

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $category = $_POST['category'];
    $item_name = $_POST['item_name'];
    $price = $_POST['price'];

    $sql = "INSERT INTO budget (category, item_name, price) VALUES (?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssd", $category, $item_name, $price);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    $stmt->close();
    exit; // Prevent further processing
}

// Fetch budget items from the database
$sql = "SELECT * FROM budget";
$result = $con->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Budget Planner</title>
    <link rel="stylesheet" href="budget.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body>

<!-- (Sidebar and header code omitted for brevity) -->

<section class="budget">
    <h2>Budget</h2>
    <p>Keep track of every penny you spend. Drag and drop your budget categories and individual items into your preferred order.</p>

    <div class="budget-value">
        <h3>Budget <span>₹0.00</span></h3>
        <a href="#" class="set-value">Set value</a>
    </div>

    <div class="budget-categories">
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<div class="category">';
                echo '<h4>' . htmlspecialchars($row['category']) . '</h4>';
                echo '<div class="item">';
                echo '<span>' . htmlspecialchars($row['item_name']) . '</span>';
                echo '<span class="price">₹' . htmlspecialchars(number_format($row['price'], 2)) . '</span>';
                echo '</div></div>';
            }
        } else {
            echo '<p>No budget items found.</p>';
        }
        ?>
        
        <div class="add-category">
            <h4>Add New Category</h4>
            <form id="budget-form">
                <input type="text" name="category" class="category-input" placeholder="Category Name" required />
                <input type="text" name="item_name" class="category-input" placeholder="Item Name" required />
                <input type="number" name="price" class="category-input" placeholder="Price" required />
                <button type="submit" class="add-item">+ Add Item</button>
            </form>
        </div>

        <div class="item">
            <span style=" font-size: 18px; margin-bottom: 10px;color: black; font-weight:bold; margin-top:20px;">Total Price</span>
            <span class="price">₹0.00</span>
        </div>
        <button id="downloadBudgetPdfButton">Download Budget PDF</button>
    </div>
</section>

<script src="budget.js"></script>
</body>
</html>

<?php
// Close the connection
$con->close();
?>
