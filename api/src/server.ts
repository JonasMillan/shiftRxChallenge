import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import * as dotenv from 'dotenv';
import api from './routes' ;

dotenv.config()

const app = express();
const port = 4200;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const allowedOrigins: string[] = ['http://localhost:3000']; 
const allowedMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (allowedOrigins.includes(origin || '') || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: allowedMethods,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", api);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' });
});


app.listen(port, () => {
  console.log(`API running at ${port}`);
});
