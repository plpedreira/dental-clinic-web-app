import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API Odonto Rodando!');
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { name, phone, email, birthDate, healthInsurance, service, notes } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    // Cria ou conecta o Paciente pelo telefone e vincula o Agendamento
    const appointment = await prisma.appointment.create({
      data: {
        service,
        notes: notes || null,
        status: 'PENDING',
        patient: {
          connectOrCreate: {
            where: { phone },
            create: {
              name,
              phone,
              email: email || null,
              birthDate: birthDate || null,
              healthInsurance: healthInsurance || null
            }
          }
        }
      },
      include: {
        patient: true
      }
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error('Erro no Prisma:', error);
    return res.status(500).json({ error: 'Erro ao salvar agendamento.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});