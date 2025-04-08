import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import defectCategoryRoutes from "./routes/defectCategoryRoutes";
import partRoutes from "./routes/partRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import serviceOrderRoutes from "./routes/serviceOrderRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/defectCategories", defectCategoryRoutes);
app.use("/parts", partRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/serviceOrder", serviceOrderRoutes);

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  const mongoose = require('mongoose');
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔌 Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB", err);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
