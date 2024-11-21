import express from 'express';

const app = express();
const localhost = `http://localhost:${process.env.PORT || 8000}`;

app.use(express.json());

const run = async () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at ${localhost}`);
  });
};

void run();
