import { Router } from 'express';
import { creaHash, rutaProducts } from '../utils.js';
import { ProductsManager } from '../dao/ProductsManager.js';

export const router=Router()

let productsManager=new ProductsManager(rutaProducts);

router.get('/', async (req, res)=>{

  try {
    let products= await productsManager.getProducts()
  res.status(200).json({products})
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json(
      {
        error:`Error inesperado en el servidor`,
        detalle: `${error.message}`
      }
    )
  }
})

router.post('/', async (req, res) => {

  let { title, description, price, thumbnail, code, stock, category, password } = req.body;
  // Verificar si alguno de los campos está incompleto
  if (!title || !description || !price || !code || !stock || !category || !password) {
      res.status(400).json({ error: 'Hay campos que faltan ser completados' });
      return;
  }

  // Verificar si el código ya existe
  let existCode = await productsManager.getProductByCode(code);
  if (existCode) {
      res.status(400).json({ error: 'Ya existe un producto con el mismo código' });
      return;
  }

password=creaHash(password)

try {
  let nuevoProducto = await productsManager.addProduct({ title, description, price, thumbnail, code, stock, category, password });
  res.setHeader('Content-Type','application/json');
  return res.status(201).json({payload:nuevoProducto});
} catch (error) {
  res.setHeader('Content-Type','application/json');
  return res.status(500).json(
      {
          error:`Error inesperado en el servidor`,
          detalle:error.message
      }) 
}
});