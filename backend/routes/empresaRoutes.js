import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {

  const { 
    company_name, 
    location, 
    sector, 
    near_term_status, 
    near_term_target_year 
  } = req.body;

  try {
    const novaEmpresa = await prisma.empresa.create({
      data: {
        company_name: company_name,
        location: location,
        sector: sector,
        near_term_status: near_term_status,
        near_term_target_year: near_term_target_year,
      },
    });

    res.status(201).json(novaEmpresa); 

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Já existe uma empresa com esse nome!" });
    }
    
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a empresa" });
  }
});

//Esse daqui é para limitar o numero de páginas
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 20; 
  const skip = (page - 1) * limit;

  try {
    const empresas = await prisma.empresa.findMany({
      skip: skip,
      take: limit,
    });
    
    const total = await prisma.empresa.count();

    res.json({
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      data: empresas
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empresas" });
  }
});

//Buscar por nome
router.get('/busca/:nome', async (req, res) => {
  const { nome } = req.params;

  try {
    const empresas = await prisma.empresa.findMany({
      where: {
        company_name: {
          contains: nome,
          mode: 'insensitive', 
        },
      },
      take: 20, 
    });

    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao pesquisar empresa" });
  }
});

//Buscar ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: id },
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }

    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar detalhes da empresa" });
  }
});


//Filtrar por país
router.get('/busca-local/:local', async (req, res) => {
  const { local } = req.params;

  try {
    const empresas = await prisma.empresa.findMany({
      where: {
        location: {
          contains: local, 
          mode: 'insensitive', 
        },
      },
      take: 20,
    });

    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar por localização" });
  }
});

//Filtrar por setor
router.get('/busca-setor/:setor', async (req, res) => {
  const { setor } = req.params;

  try {
    const empresas = await prisma.empresa.findMany({
      where: {
        sector: {
          contains: setor,
          mode: 'insensitive',
        },
      },
      take: 20, 
    });

    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar por setor" });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    company_name, 
    location, 
    sector, 
    near_term_status, 
    near_term_target_year 
  } = req.body;

  try {
    const empresaAtualizada = await prisma.empresa.update({
      where: { id: id },
      data: {
        company_name,
        location,
        sector,
        near_term_status,
        near_term_target_year
      },
    });

    res.json(empresaAtualizada);

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Já existe outra empresa com esse nome!" });
    }
    
    res.status(500).json({ error: "Erro ao atualizar empresa" });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.empresa.delete({
      where: { id: id },
    });

    res.status(204).send(); 

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }
    
    res.status(500).json({ error: "Erro ao deletar empresa" });
  }
});

export default router;