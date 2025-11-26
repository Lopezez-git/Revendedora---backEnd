export function verificarAdm(cargo) {

    if (cargo !== 'ADM') {

            console.log(cargo);

            return false;
        }
        else{

            return true;
        }
    
}

export function verificarCliente(cargo){

    if(cargo !== 'CLIENTE'){

        console.log(cargo);

        return false;
    }
    else{
        return true;
    }

}