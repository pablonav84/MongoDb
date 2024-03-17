import { Router } from 'express';
import { ProductsManager } from '../classes/ProductsManager.js';
import { rutaProducts } from '../utils.js';


export const router=Router()

let productsManager=new ProductsManager(rutaProducts)

router.get('/', async (req, res)=>{

  let products= await productsManager.getProducts()

  res.status(200).json({products})
})

router.post('/', async (req, res) => {

  const { title, description, price, thumbnail, code, stock, category } = req.body;
  // Verificar si alguno de los campos está incompleto
  if (!title || !description || !price || !code || !stock || !category) {
      res.status(400).json({ error: 'Hay campos que faltan ser completados' });
      return;
  }

  // Verificar si el código ya existe
  let existCode = await productsManager.getProductByCode(code);
  if (existCode) {
      res.status(400).json({ error: 'Ya existe un producto con el mismo código' });
      return;
  }

  let nuevoProducto = await productsManager.addProduct({ title, description, price, thumbnail, code, stock, category });
  
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({
      nuevoProducto
  });
});