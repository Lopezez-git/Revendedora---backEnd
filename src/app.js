import 'dotenv/config.js';

import cors from 'cors';

import usuarioController from './controller/usuarioController.js'

import admController from './controller/admController.js'

import express from "express";

const servidor = express();

servidor.use(express.json());

servidor.use(cors());

servidor.use(usuarioController);

servidor.use(admController)


let PORTA = process.env.PORT;

servidor.listen(PORTA, () => console.log(`Porta aberta ${PORTA}`));