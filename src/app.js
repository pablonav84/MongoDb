import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { join } from "path";
import __dirname from "./utils.js";
import { router as productRouter } from "./routes/productRouter.js";
import { router as vistasRouter} from "./routes/vistasRouter.js";
import { router as cartRouter } from "./routes/cartRouter.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pablonav84:pablo1810@cluster0.1ym0zxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { dbName: "zapas" }
    );
    console.log("DB Online");
  } catch (error) {
    console.log("Fallo conexión. Detalle:", error.message);
  }
};

connect();
