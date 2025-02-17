let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Function to save inventory to local storage
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Function to add an item
document.getElementById("addItemForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const itemId = document.getElementById("itemId").value;
  const itemName = document.getElementById("itemName").value;
  const itemQuantity = document.getElementById("itemQuantity").value;

  // Check if item already exists
  const existingItem = inventory.find(item => item.id === itemId);
  if (existingItem) {
    alert("Item with this ID already exists!");
    return;
  }

  // Add new item to inventory
  inventory.push({ id: itemId, name: itemName, quantity: itemQuantity });
  saveInventory();
  alert("Item added successfully!");

  // Clear form
  document.getElementById("addItemForm").reset();

  // Update inventory table
  displayInventory();
});

// Function to display inventory
function displayInventory(items = inventory) {
  const tableBody = document.querySelector("#inventoryTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>
        <button class="btn btn-primary btn-sm btn-action" onclick="editItem('${item.id}')">Edit</button>
        <button class="btn btn-danger btn-sm btn-action" onclick="deleteItem('${item.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to search for an item
function searchItem() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const foundItems = inventory.filter(item =>
    item.id.toLowerCase().includes(searchInput) ||
    item.name.toLowerCase().includes(searchInput)
  );
  displayInventory(foundItems);
}

// Function to reset search and display all items
function resetSearch() {
  document.getElementById("searchInput").value = "";
  displayInventory();
}

// Function to delete an item
function deleteItem(itemId) {
  inventory = inventory.filter(item => item.id !== itemId);
  saveInventory();
  displayInventory();
}

// Function to edit an item
function editItem(itemId) {
  const item = inventory.find(item => item.id === itemId);
  if (item) {
    const newName = prompt("Enter new name:", item.name);
    const newQuantity = prompt("Enter new quantity:", item.quantity);

    if (newName !== null && newQuantity !== null) {
      item.name = newName;
      item.quantity = newQuantity;
      saveInventory();
      displayInventory();
    }
  }
}

// Initial display of inventory
displayInventory();