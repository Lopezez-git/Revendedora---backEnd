import connection from "./connection.js";

export async function salvarUsuario(usuario) {

    try {
        const comando = `insert into usuario(nome, email, senha, cargo) 
    values(?, ?, MD5(?), ?)`;

        let [info] = await connection.query(comando,
            [usuario.nome,
            usuario.email,
            usuario.senha,
            usuario.cargo]);

        return info.insertId;
    }
    catch (err) {

        console.error("Deu erro no bando de dados. ", err);
    }
}

export async function verificarUsuario(usuario) {

    const comando = `SELECT * FROM usuario WHERE email = ? AND senha =  MD5(?)`;

    let [info] = await connection.query(comando, [usuario.email, usuario.senha]);

    return info;

}