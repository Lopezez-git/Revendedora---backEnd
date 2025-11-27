import connection from "./connection.js";

export async function criarVenda(idUsuario, itens) {

    try {
        // Iniciar transação (tudo ou nada)
        await connection.beginTransaction();

        let valorTotal = 0;

        // 1. Buscar preços atuais dos produtos e validar estoque
        for (let item of itens) {
            let [produto] = await connection.query(
                'SELECT id, preco, nome FROM produto WHERE id = ?',
                [item.id_produto]
            );

            if (produto.length === 0) {
                throw new Error(`Produto ${item.id_produto} não encontrado`);
            }

            // Calcular subtotal
            let subtotal = produto[0].preco * item.quantidade;
            valorTotal += subtotal;

            // Guardar preço atual no item (para não perder o histórico)
            item.preco_unitario = produto[0].preco;
        }

        // 2. Criar registro da VENDA
        let [vendaResult] = await connection.query(
            'INSERT INTO venda (id_usuario, valor_total, status) VALUES (?, ?, ?)',
            [idUsuario, valorTotal, 'PENDENTE']
        );

        const idVenda = vendaResult.insertId;

        // 3. Inserir os VENDA_ITEM
        for (let item of itens) {
            await connection.query(
                'INSERT INTO venda_item (id_venda, id_produto, qtd, preco_unitario) VALUES (?, ?, ?, ?)',
                [idVenda, item.id_produto, item.quantidade, item.preco_unitario]
            );
        }

        // 4. Confirmar transação
        await connection.commit();

        // 5. Buscar venda completa para retornar
        let [vendaCompleta] = await connection.query(`
            SELECT 
                v.id,
                v.data_venda,
                v.valor_total,
                v.status,
                u.nome as cliente_nome,
                u.email as cliente_email
            FROM venda v
            INNER JOIN usuario u ON v.id_usuario = u.id
            WHERE v.id = ?
        `, [idVenda]);

        // Buscar itens
        let [itensVenda] = await connection.query(`
            SELECT 
                vi.quantidade,
                vi.preco_unitario,
                (vi.quantidade * vi.preco_unitario) as subtotal,
                p.nome as produto_nome,
                p.marca as produto_marca
            FROM venda_item vi
            INNER JOIN produto p ON vi.id_produto = p.id
            WHERE vi.id_venda = ?
        `, [idVenda]);

        return {
            ...vendaCompleta[0],
            itens: itensVenda
        };

    } catch (error) {
        // Se der erro, desfaz tudo
        await connection.rollback();
        console.error("Erro ao criar venda:", error);
        throw error;

    }
}

export async function buscarTodasVendas(usuarioId) {
    let comando = `
        SELECT v.id, v.data_venda, v.valor_total, v.status
        FROM venda v
        WHERE v.id_usuario = ?
        ORDER BY v.data_venda DESC
    `;
    let [select] = await connection.query(comando, [usuarioId]);
    return select;
}

export async function buscarVendaPorId(usuarioId, vendaId) {
    let comando = `
        SELECT *
        FROM venda
        WHERE id = ? AND id_usuario = ?
    `;
    let [venda] = await connection.query(comando, [vendaId, usuarioId]);
    return venda;
}

export async function buscaVendaItem(vendaId) {

    let comandoItens = `
            SELECT 
                vi.id,
                vi.quantidade,
                vi.preco_unitario,
                (vi.quantidade * vi.preco_unitario) as subtotal,
                p.nome as produto_nome,
                p.marca as produto_marca,
                p.imagem as produto_imagem
            FROM venda_item vi
            INNER JOIN produto p ON vi.id_produto = p.id
            WHERE vi.id_venda = ?
        `;
    let [itens] = await connection.query(comandoItens, [vendaId]);

    return itens;
}