import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import db from './database';

const cors = require('cors')

const app = express();
const port = 3000;

const corsOptions = {
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

app.use(cors(corsOptions)); // Enable CORS
app.use(bodyParser.json());
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.get('/items', async (req: Request, res: Response) => {
  await delay(1000);

  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.put('/items/:id', async (req: Request, res: Response) => {
  await delay(1000);

  const id = req.params.id;
  const { stock_quantity } = req.body;
  db.run(
    'UPDATE items SET stock_quantity = ? WHERE item_id = ?',
    [stock_quantity, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Stock quantity updated', changes: this.changes });
    }
  );
});

app.put(
  '/items/price/category/:category',
  async (req: Request, res: Response) => {
    await delay(1000);

    const category = req.params.category;
    const { percentage } = req.body;

    db.run(
      'UPDATE items SET price = price + (price * ? / 100) WHERE category = ?',
      [percentage, category],
      function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: `Prices increased by ${percentage}% for all items in category ${category}`,
          changes: this.changes,
        });
      }
    );
  }
);

app.get('/analytics', async (req: Request, res: Response) => {
  await delay(1000);

  db.all(
    `SELECT category, COUNT(*) as totalItems, AVG(price) as avgPrice
     FROM items
     GROUP BY category`,
    [],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: rows });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
