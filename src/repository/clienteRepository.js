import connection from "./connection.js";

export async function listarClientes() {

    try {
        let comando = `
        select 
        nome,
        email,
        cargo
        from usuario where cargo = 'CLIENTE'`;

        let [info] = await connection.query(comando);



        return info;
    }
    catch (err) {
        console.error("Erro no ropositorio", err);
    }
}