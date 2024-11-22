import app from './app';
import config from './app/config';

// getting-started.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    app.listen(config.port, () => {
      console.log(`The  Server Running and listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
