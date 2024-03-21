import { Router } from "express";
import { CartManagerMongo } from "../dao/CartManagerMongo.js";
export const router=Router()

let cartManager=new CartManagerMongo()

router.get("/", async (req,res)=>{

let cart=await cartManager.getCart()

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(cart)
})

router.post("/", async (req, res) => {
  let { id, code } = req.body;

  // Verificar si alguno de los campos está incompleto
  if (!id || !code) {
    res.status(400).json({ error: "Hay campos que faltan ser completados" });
    return;
  }

  // Verificar si el código ya existe
  let existCode = await cartManager.getCartBy({ code: code });
  if (existCode) {
    res
      .status(400)
      .json({ error: "Ya existe un producto con el mismo código" });
    return;
  }

  // Verificar si el id ya existe
  let existId = await cartManager.getCartBy({ id: id });
  if (existId) {
    res.status(400).json({ error: "Ya existe un producto con el mismo id" });
    return;
  }

  try {
    let nuevoCart = await cartManager.addCart({
      id,
      code,
    });
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ payload: nuevoCart });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: `Error inesperado en el servidor`,
      detalle: error.message,
    });
  }
});
