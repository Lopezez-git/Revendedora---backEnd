import { Router } from "express";
import autenticar from "../middleware/autenticar.js";
import { buscarProdutoPorId } from "../repository/produtoRepository.js";
import { buscarTodasVendas, buscarVendaPorId, buscaVendaItem, criarVenda} from "../repository/vendaRepository.js";

const endPoints = Router();

//endPOint para fazer uma venda

endPoints.post('/cliente/venda', autenticar, async (req, resp) => {

    try {
        let usuario = req.usuario.id;

        const { itens } = req.body;
        /*
        Formato esperado do body:
        {
            "itens": [
                {
                    "id_produto": 1,
                    "quantidade": 2
                },
                {
                    "id_produto": 3,
                    "quantidade": 1
                }
            ]
        }
        */

        // Validar se tem itens
        if (!itens || !Array.isArray(itens) || itens.length === 0) {
            return resp.status(400).send({
                erro: "O carrinho está vazio. Adicione produtos antes de finalizar a compra."
            });
        }

        // Validar cada item
        for (let item of itens) {
            if (!item.id_produto || !item.quantidade) {
                return resp.status(400).send({
                    erro: "Cada item precisa ter id_produto e quantidade"
                });
            }

            if (item.quantidade <= 0) {
                return resp.status(400).send({
                    erro: "A quantidade deve ser maior que zero"
                });
            }
        }

        //criar a venda

        let venda = await criarVenda(usuario, itens);

        resp.status(201).send({
            mensagem: "Compra realizada com sucesso!",
            venda: venda
        });


    } catch (err) {
        console.error("Erro ao criar venda:", err);

        if (err.message.includes("não encontrado") || err.message.includes("estoque")) {
            return resp.status(400).send({ erro: err.message });
        }

        resp.status(500).send({ erro: "Erro ao processar compra" });
    }

});

endPoints.get('/cliente/minhas-vendas', autenticar, async (req, resp) => {

    const usuario = req.usuario.id;

    const vendas = await buscarTodasVendas(usuario);

    if (vendas.length === 0) {

        return resp.status(400).send({ erro: "Usuario sem produtos comprados" });

    }

    resp.status(200).send({
        total: vendas.length,
        vendas: vendas
    });
});

endPoints.get('/cliente/venda/:id', autenticar, async (req, resp) => {

    let venda = req.params.id;

    let usuario = req.usuario.id;

    let [vendas] = await buscarVendaPorId(usuario, venda);

    if (vendas.length === 0) {
        return resp.status(404).send({ erro: "Venda não encontrada" });
    }

    let itens = await buscaVendaItem(venda);

    resp.status(200).send({
            venda: vendas[0],
            itens: itens
        });
})



export default endPoints;