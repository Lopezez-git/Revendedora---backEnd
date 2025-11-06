import { Router } from "express";

import autenticar from "../middleware/autenticar.js";

import { listarClientes } from "../repository/clienteRepository.js";

const endPoints = Router();

endPoints.get('/adm/mostrar-clientes', autenticar, async (req, resp) => {

    try {
        let usuario = req.usuario;

        if (usuario.cargo !== 'ADM') {

            console.log(usuario.cargo);

            resp.status(400).send(
                {
                    erro: "Usuario sem permissão",
                    cargo: usuario.cargo
                }
            );
        }

        let saida = await listarClientes();

        if (saida.length > 0) {

            resp.send({ clientes: saida })

        }
        else {

            resp.send({ mensagem: "Ainda não se tem clientes" });
        }

    }
    catch (err) {

        console.error("Erro no controller", err)
    }

});


export default endPoints;