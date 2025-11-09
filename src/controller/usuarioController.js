import { Router } from "express";
import { salvarCliente } from "../repository/usuarioRepository.js";
import { verificarUsuario } from "../repository/usuarioRepository.js";
import { gerarToken, verificarToken } from "../services/jwt.js";
const endPoints = Router();

endPoints.post('/usuario/cadastro/cliente', async (req, resp) => {
try{
    let usuario = req.body;

    let saida = await salvarCliente(usuario);

    if(!saida){

        resp.status(500).send({erro: "Erro ao inserir o usuario"});
    }

    resp.send({
        mensagem: "Usuario salvo com sucesso",
        novoId: saida
    })
}
catch(err){

    console.error("Erro no endPoint", err);

    resp.status(400).send({
        erro: err.message
    })
}

});

endPoints.post('/usuario/login', async (req, resp) => {
  try {
    const usuario = req.body;

    const verificaUsuario = await verificarUsuario(usuario);

    if(usuario === null){

      resp.status(400).send({erro: "Usuario nulo"})
    }

    if (verificaUsuario.length === 0) {
      return resp.status(400).send({ erro: "Email ou senha incorretos" });
    }

    //gerando token

    let token = gerarToken(verificaUsuario[0])

    //debug

    console.log(verificarToken(token));

    resp.send({
      mensagem: "Login feito com sucesso",
      token: token,
      usuarioId: verificaUsuario.id,
      usuarioEmail: verificaUsuario.email
    });
  } catch (err) {
    console.error("Não foi possível fazer o login", err);
    resp.status(500).send({ erro: "Erro interno ao fazer login." });
  }
});


export default endPoints;