import jwt from 'jsonwebtoken';

const SECRET_KEY = 'ehSegredo';

export function gerarToken(usuario) {

    const token = jwt.sign({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo
    },
        SECRET_KEY,
        { expiresIn: '24h' });

        return token;

}
export function verificarToken(token){
    try{

        return jwt.verify(token, SECRET_KEY);
    }catch(err){

        throw new Error('token invalido ou expirado');
    }
}

export function decodificarToken(token){

    return jwt.decode(token);
}