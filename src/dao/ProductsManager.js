import { modeloProductos } from "./models/productos.modelo.js"

export class ProductsManager{
    constructor(){
        
    }

    async getProducts(){
        return await modeloProductos.find()
}

async getProductById(id){
  //este es un metodo propio de mongoose(findById)
  return await modeloProductos.findById(id)
}

async getProductByCode(code){
  return await modeloProductos.findOne({code})
}

async getProductBy(filtro){
  return await modeloProductos.findOne(filtro)
}

async addProduct(product) {
    return await modeloProductos.create(product);
}

async updateProduct(id, modificacion={}){
  return await modeloProductos.updateOne({_id:id}, modificacion)
}

}