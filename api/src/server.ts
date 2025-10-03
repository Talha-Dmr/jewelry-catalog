import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/products', productsRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
};

app.use(errorHandler);

const port = process.env.PORT ?? 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

export default app;
