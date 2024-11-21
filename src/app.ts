// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

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
