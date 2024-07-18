import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './routes' 

const app = express();
const port = 4200;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api", api);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' });
});


app.listen(port, () => {
  console.log(`API running at ${port}`);
});
