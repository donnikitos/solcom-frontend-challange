import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./coding_challenge.db');

const categories = [
  'Electronics',
  'Clothing',
  'Groceries',
  'Furniture',
  'Toys',
  'Books',
  'Sports Equipment',
];
const items: { [key: string]: string[] } = {
  Electronics: ['Laptop', 'Smartphone', 'Headphones', 'Camera', 'Smartwatch'],
  Clothing: ['T-shirt', 'Jeans', 'Jacket', 'Sneakers', 'Socks'],
  Groceries: ['Apple', 'Milk', 'Bread', 'Cheese', 'Eggs'],
  Furniture: ['Chair', 'Table', 'Sofa', 'Bed', 'Lamp'],
  Toys: ['Action Figure', 'Doll', 'Puzzle', 'Toy Car', 'Building Blocks'],
  Books: ['Novel', 'Cookbook', 'Biography', 'Science Fiction', 'Self-help'],
  'Sports Equipment': [
    'Basketball',
    'Tennis Racket',
    'Soccer Ball',
    'Yoga Mat',
    'Dumbbells',
  ],
};

const dataset: {
  item_id: number;
  category: string;
  item_name: string;
  price: number;
  stock_quantity: number;
}[] = [];
for (let item_id = 1; item_id <= 100; item_id++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const item_name =
    items[category][Math.floor(Math.random() * items[category].length)];
  const price = parseFloat((Math.random() * (500 - 5) + 5).toFixed(2));
  const stock_quantity = Math.floor(Math.random() * 100) + 1;
  dataset.push({ item_id, category, item_name, price, stock_quantity });
}

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS items (
            item_id INTEGER PRIMARY KEY,
            category TEXT NOT NULL,
            item_name TEXT NOT NULL,
            price REAL NOT NULL,
            stock_quantity INTEGER NOT NULL
        )
    `);

  const stmt = db.prepare(`
        INSERT INTO items (item_id, category, item_name, price, stock_quantity)
        VALUES (?, ?, ?, ?, ?)
    `);

  dataset.forEach((item) => {
    stmt.run(
      item.item_id,
      item.category,
      item.item_name,
      item.price,
      item.stock_quantity
    );
  });

  stmt.finalize();
});

db.close();
