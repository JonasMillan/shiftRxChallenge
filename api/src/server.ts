import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 4200;

app.use(cors());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' });
});

app.listen(port, () => {
  console.log(`API running at ${port}`);
});
