import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import { join } from "path";
import __dirname from "./utils.js";
import { router as productRouter } from "./routes/productRouter.js";
import { router as vistasRouter} from "./routes/vistasRouter.js";
import { router as cartRouter } from "./routes/cartRouter.js";
import { chatModelo } from "./dao/models/chat.modelo.js";

const PORT = 8080;
let io;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, 'public')));
app.engine("handlebars", engine());
//con estas propiedades tambien se puede solucionar el problema de no poder ver los elementos de mi db
/*app.engine("handlebars", engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMetthodsByDefault: true,
  },
}));*/
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

app.use("/api/cart", cartRouter)
app.use("/api/productos", productRouter);
app.use("/", vistasRouter);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("error 404 - page not found");
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto PORT ${PORT}`);
});

io = new Server(server);

io.on('connection', (socket) => {
  console.log(`Cliente Conectado con el id ${socket.id}`);
  socket.emit('saludo', { emisor: 'server', mensaje: 'Bienvenido al server' });

  socket.on('confirmacion', async (nombre) => {
    const chat = await chatModelo.findOne();
    chat.user.push(nombre);
    socket.emit("historial", chat.message);
    socket.broadcast.emit("nuevoUsuario", nombre);
    await chat.save();
  });

  socket.on("mensaje", async (nombre, mensaje) => {
    const chat = await chatModelo.findOne();
    if (chat) {
      chat.message.push({ user: nombre, message: mensaje });
      await chat.save();
    }
    io.emit("nuevoMensaje", nombre, mensaje);
  });  

  socket.on("disconnect", () => {
    let usuario = chatModelo.findOne(u => u.id === socket.id);
    if (usuario) {
      socket.broadcast.emit("saleUsuario", usuario.nombre);
    }
  });

  socket.on("connection", (socket) => {
    console.log(`Se conecto un cliente con id ${socket.id}`);
  });
});

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pablonav84:pablo1810@cluster0.1ym0zxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { dbName: "ecommerce" }
    );
    console.log("DB Online");
  } catch (error) {
    console.log("Fallo conexión. Detalle:", error.message);
  }
};

connect();