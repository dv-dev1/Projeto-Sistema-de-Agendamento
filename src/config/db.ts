import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI as string;

  if (!uri) {
    console.error('[DB] URI do MongoDB não encontrada no .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('[DB] Conectado ao MongoDB com sucesso.');
  } catch (error) {
    console.error('[DB] Erro ao conectar no MongoDB:');
    console.error(error);
    process.exit(1);
  }
}
