// Inventory array
let inventory = [];

// Utility: find product index
function findProductIndex(productName) {
  const lowerName = productName.toLowerCase();
  return inventory.findIndex(item => item.name === lowerName);
}

// Add or update product
function addProduct(product) {
  const lowerName = product.name.toLowerCase();
  const index = findProductIndex(lowerName);

  if (index !== -1) {
    inventory[index].quantity += product.quantity;
    logToConsole(`${lowerName} quantity updated`);
  } else {
    inventory.push({ name: lowerName, quantity: product.quantity });
    logToConsole(`${lowerName} added to inventory`);
  }
  renderTable();
}

// Remove product
function removeProduct(productName, quantity) {
  const lowerName = productName.toLowerCase();
  const index = findProductIndex(lowerName);

  if (index === -1) {
    logToConsole(`${lowerName} not found`);
    return;
  }

  const product = inventory[index];

  if (product.quantity < quantity) {
    logToConsole(`Not enough ${lowerName} available, remaining pieces: ${product.quantity}`);
  } else if (product.quantity === quantity) {
    inventory.splice(index, 1);
    logToConsole(`Remaining ${lowerName} pieces: 0 (removed from inventory)`);
  } else {
    product.quantity -= quantity;
    logToConsole(`Remaining ${lowerName} pieces: ${product.quantity}`);
  }
  renderTable();
}

// Find product
function findProduct(name) {
  const index = findProductIndex(name);
  if (index !== -1) {
    const p = inventory[index];
    logToConsole(`Found ${p.name}: ${p.quantity} in stock`);
  } else {
    logToConsole(`${name.toLowerCase()} not found`);
  }
}

// Render inventory table
function renderTable() {
  const tbody = document.getElementById('inventoryBody');
  tbody.innerHTML = '';
  inventory.forEach(item => {
    const row = `<tr><td>${item.name}</td><td>${item.quantity}</td></tr>`;
    tbody.innerHTML += row;
  });
}

// Console output
function logToConsole(message) {
  const consoleDiv = document.getElementById('consoleOutput');
  const time = new Date().toLocaleTimeString();
  consoleDiv.innerHTML += `[${time}] ${message}<br>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', () => {
  const name = document.getElementById('productName').value.trim();
  const qty = parseInt(document.getElementById('productQuantity').value);

  if (!name || isNaN(qty) || qty <= 0) {
    logToConsole('⚠️ Please enter a valid product name and quantity.');
    return;
  }

  addProduct({ name, quantity: qty });
  document.getElementById('productName').value = '';
  document.getElementById('productQuantity').value = '';
});

document.getElementById('removeBtn').addEventListener('click', () => {
  const name = document.getElementById('productName').value.trim();
  const qty = parseInt(document.getElementById('productQuantity').value);

  if (!name || isNaN(qty) || qty <= 0) {
    logToConsole('⚠️ Please enter a valid product name and quantity.');
    return;
  }

  removeProduct(name, qty);
  document.getElementById('productName').value = '';
  document.getElementById('productQuantity').value = '';
});

document.getElementById('findBtn').addEventListener('click', () => {
  const name = document.getElementById('productName').value.trim();
  if (!name) {
    logToConsole('⚠️ Please enter a product name to find.');
    return;
  }
  findProduct(name);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  inventory = [];
  renderTable();
  logToConsole('🧹 Inventory has been reset.');
});
