import connection from "./connection.js";

// ========================================
// CREATE
// ========================================
export async function inserirProduto(produto, nomeImagem) {
    try {
        let comando = `INSERT INTO produto(nome, marca, preco, descricao, imagem, estoque)
                       VALUES(?, ?, ?, ?, ?, ?)`;

        let valores = [
            produto.nome,
            produto.marca,
            produto.preco,
            produto.descricao,
            nomeImagem,
            produto.estoque
        ];

        let [inserir] = await connection.query(comando, valores);

        comando = `SELECT * FROM produto WHERE id = ?`;
        let [select] = await connection.query(comando, [inserir.insertId]);

        return select[0];
        
    } catch (error) {
        console.log("Erro no banco:", error);
        throw error;
    }
}

// ========================================
// READ - Listar Todos
// ========================================
export async function listarProdutos() {
    try {
        let comando = `SELECT * FROM produto ORDER BY id DESC`;
        
        let [produtos] = await connection.query(comando);
        
        return produtos;
        
    } catch (error) {
        console.log("Erro no banco:", error);
        throw error;
    }
}

// ========================================
// READ - Buscar por ID
// ========================================
export async function buscarProdutoPorId(id) {
    try {
        let comando = `SELECT * FROM produto WHERE id = ?`;
        
        let [produto] = await connection.query(comando, [id]);
        
        return produto[0];
        
    } catch (error) {
        console.log("Erro no banco:", error);
        throw error;
    }
}

// ========================================
// UPDATE
// ========================================
export async function atualizarProduto(id, produto, nomeImagem) {
    try {
        let comando = `UPDATE produto 
                       SET nome = ?, 
                           marca = ?, 
                           preco = ?, 
                           descricao = ?, 
                           imagem = ?,
                           estoque = ?
                       WHERE id = ?`;

        let valores = [
            produto.nome,
            produto.marca,
            produto.preco,
            produto.descricao,
            nomeImagem,
            produto.estoque,
            id         
        ];

        await connection.query(comando, valores);

        // Buscar produto atualizado
        comando = `SELECT * FROM produto WHERE id = ?`;
        let [select] = await connection.query(comando, [id]);

        return select[0];
        
    } catch (error) {
        console.log("Erro no banco:", error);
        throw error;
    }
}

// ========================================
// DELETE
// ========================================
export async function deletarProduto(id) {
    try {
        let comando = `DELETE FROM produto WHERE id = ?`;
        
        await connection.query(comando, [id]);
        
    } catch (error) {
        console.log("Erro no banco:", error);
        throw error;
    }
}