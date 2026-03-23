import { Router } from "express";
import autenticar from "../middleware/autenticar.js";

let endPoints = Router();

//O carrinho sera criado no momendo do cadastro do usuario

endPoints.get('/carrinho/get', autenticar, async (req, resp) => {


});


export default endPoints;