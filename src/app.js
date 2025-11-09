import 'dotenv/config.js';

import cors from 'cors';

import express from "express";
import rotas from './rotas.js';

const servidor = express();

servidor.use(express.json());

servidor.use(cors());

rotas(servidor);

let PORTA = process.env.PORT;

servidor.listen(PORTA, () => console.log(`Porta aberta ${PORTA}`));