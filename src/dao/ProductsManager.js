import { modeloProductos } from "./models/productos.modelo.js"

export class ProductsManager{
    constructor(){
        
    }

    async getProducts(){
        return await modeloProductos.find()
}

async getProductByCode(code){
  return await modeloProductos.findOne({code})
}

saveDatos(ruta, datos){
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 5))
}

async addProduct(product) {
    return await modeloProductos.create(product);
}

  updateProduct(id, updatedFields) {
      const products = this.getProducts();
      const index = products.findIndex((p) => p.id === id);
       
      if (index !== -1) { 
        products[index] = { ...products[index], ...updatedFields };
        
        this.saveDatos(this.path, products);
    } return products[index];
  }

  deleteProduct(id) {
      const products = this.getProducts();
      const index = products.findIndex((p) => p.id === id);
    
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        this.saveDatos(this.path, products);
        return deletedProduct;
      } else {
        return null;
      }
    }
}