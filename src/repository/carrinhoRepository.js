import connection from "./connection.js";


//------------ Create---------------

export async function postCarrinho(id_produto, carrinho, qtd) {

    try{
    
    let comando = `INSERT INTO carrinho_item(id_carrinho, id_produto, qtd)
                    VALUES(?, ?, ?)`;

    let [insert] = await connection.query(comando, [carrinho.id_usuario, id_produto, qtd]);

    comando = `SELECT * FROM carrinho_item WHERE id = ?`;

    let [select] = await connection.query(comando, [insert.insertId]);

    return select;

    }
    catch(err){

        console.error("Erro no repositorio do carrinho:", err);
    }


}

//--------------------READ---------------------

export async function getCarrinho(idUsuario) {

    try{

        let comando = `
        SELECT produto.nome, produto.marca, carrinho_item.qtd from carrinho_item
        INNER JOIN produto on produto.id = carrinho_item.id_produto
        INNER JOIN carrinho on carrinho.id = carrinho_item.id_carrinho
        INNER JOIN usuario on usuario.id = carrinho.id_usuario
        WHERE usuario.id = ?;`;

        let [select] = await connection.query(comando, [idUsuario]);

        return select;
    }
    catch(err){

        console.error("Erro no repositorio do carrinho:", err)
    }
    
}

//Get by Id

