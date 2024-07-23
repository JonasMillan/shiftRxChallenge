import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import api from "./routes";

import { connectSocket } from "./socket/socket";

dotenv.config();

const app = express();


const port = 4200;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE"];

const corsOptions: CorsOptions = {
  origin: ['*', 'http://localhost:3000'],
  methods: allowedMethods,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", api);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

const server = connectSocket(app);

server.listen(port, () => {
  console.log(`API running at ${port}`);
});
