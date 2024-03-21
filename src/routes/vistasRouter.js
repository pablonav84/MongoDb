import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManager.js';
import { rutaProducts } from '../utils.js';

ProductsManager
export const router=Router()

let productsManager=new ProductsManager(rutaProducts)

router.get("/",(req, res) => {
    
      res.setHeader("Content-Type", "text/html");
      return res.status(200).render("home");
  });

  router.get("/products", async (req, res) => {
    
let products=await productsManager.getProducts()

    res.setHeader("Content-Type", "text/html");
    return res.status(200).render("products", {products});
});