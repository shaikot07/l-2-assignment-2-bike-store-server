// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/product', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Its ready to be get API end point services !!');
});

// akhon theke copy core Serrver .ts file a bosate hbe
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// path dekhar conno
// console.log("here",process.cwd());

export default app;
