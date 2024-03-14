import express from 'express';
import mongoose from 'mongoose';
import __dirname from './utils.js'
import { router as vistaRouter } from './routes/vistaRouter.js';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('error 404 - page not found');
});

app.use('/api/productos', vistaRouter);

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto PORT ${PORT}`);
});

const connect=async()=>{
  try {
    await mongoose.connect("mongodb+srv://pablonav84:pablo1810@cluster0.1ym0zxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName:"zapas"})
    console.log("DB Online")
  } catch (error) {
    console.log("Fallo conexión. Detalle:", error.message)
  }
}

connect()