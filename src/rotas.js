import admController from './controller/admController.js';

import clienteController from './controller/clienteController.js';

import usuarioController from './controller/usuarioController.js';

import produtoController from './controller/produtoController.js'

export default function rotas(servidor){

    servidor.use(admController);

    servidor.use(clienteController);

    servidor.use(usuarioController);

    servidor.use(produtoController);

}