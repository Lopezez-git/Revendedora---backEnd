import { Router } from "express";
import autenticar from "../middleware/autenticar.js"; //importando o JWT 'jsonWebToken'
import { listarClientes } from "../repository/clienteRepository.js";
import { verificarAdm } from "../services/cargo.js";

const endPoints = Router();

endPoints.get('/adm/mostrar-clientes', autenticar, async (req, resp) => {

    try {
        let usuario = req.usuario;

        //verifica se o usuario é um ADM

        let verifica = verificarAdm(usuario.cargo);

        if(!verifica){

            resp.status(401).send({
                erro: "Usuario sem permissão"
            })
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