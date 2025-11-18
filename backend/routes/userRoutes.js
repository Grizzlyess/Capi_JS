import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

router.get("/by-email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

router.get("/by-name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name, pass } = req.body;
    const newUser = await prisma.user.create({
      data: { email, name, pass },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível criar o usuário" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name, pass } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, name, pass },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível atualizar o usuário" });
  }
});

router.delete("/by-email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    await prisma.user.delete({
      where: { email: email },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Usuário com este email não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Não foi possível deletar o usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.json({ "Info": "Usuario deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível deletar o usuário" });
  }
});

export default router;
