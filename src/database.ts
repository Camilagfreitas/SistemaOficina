export const PORT = process.env.PORT || 3000;

export const connectDB = async () => {
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
