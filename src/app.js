import 'dotenv/config.js';

import usuarioController from './controller/usuarioController.js'

import admController from './controller/admController.js'

import express from "express";

const servidor = express();

servidor.use(express.json());

servidor.use(usuarioController);

servidor.use(admController)


let PORTA = process.env.PORTA;

servidor.listen(PORTA, () => console.log(`Porta aberta ${PORTA}`));