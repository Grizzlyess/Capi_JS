import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { texto, nivel, min, max } = req.body;

  try {
    const novomensagem = await prisma.mensagem.create({
      data: {
        texto,
        nivel, 
        min: parseFloat(min),
        max: parseFloat(max)
      }
    });
    res.status(201).json(novomensagem);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: "Erro ao criar mensagem" });
  }
});

router.get('/', async (req, res) => {
  try {
    const mensagens = await prisma.mensagem.findMany({
      orderBy: { min: 'asc' } 
    });
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar mensagens" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { texto, nivel, min, max } = req.body;

  try {
    const mensagemAtualizada = await prisma.mensagem.update({
      where: { id: id },
      data: {
        texto,
        nivel,
        min: min ? parseFloat(min) : undefined,
        max: max ? parseFloat(max) : undefined
      }
    });

    res.json(mensagemAtualizada);

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    res.status(500).json({ error: "Erro ao atualizar mensagem" });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: { id: id },
    });

    res.status(204).send();

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    res.status(500).json({ error: "Erro ao deletar mensagem" });
  }
});

export default router;