import 'dotenv/config.js';

import cors from 'cors';

import express from "express";
import rotas from './rotas.js';
import path from 'path';

const servidor = express();

servidor.use(express.json());

servidor.use(cors());

servidor.use('/storage/imagemProduto', express.static(path.join(process.cwd(), 'storage', 'imagemProduto')));

rotas(servidor);

let PORTA = process.env.PORT;

servidor.listen(PORTA, () => console.log(`Porta aberta ${PORTA}`));