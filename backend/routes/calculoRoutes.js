import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { userId, resultado } = req.body;

  try {
    const novoCalculo = await prisma.calculoCarbono.create({
      data: {
        userId: userId,
        valorTotal: resultado,
      },
    });

    const calculosDoUsuario = await prisma.calculoCarbono.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'asc' }, 
    });


    if (calculosDoUsuario.length > 2) {
      const calculoMaisAntigo = calculosDoUsuario[0];
      
      await prisma.calculoCarbono.delete({
        where: { id: calculoMaisAntigo.id }
      });
      
      console.log(`${calculoMaisAntigo.id} foi deletado`);
    }

    res.status(201).json(novoCalculo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar" });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const calculos = await prisma.calculoCarbono.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(calculos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

export default router;