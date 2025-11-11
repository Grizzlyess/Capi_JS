const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o script de seed...');
  
  const empresas = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('prisma/empresas.csv')
      .pipe(csv())
      .on('data', (data) => {
        // data é um objeto JS com os dados da linha
        delete data.id;
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  console.log(`Lidos ${empresas.length} registros do CSV. Importando para o banco...`);

  await prisma.empresa.createMany({
    data: empresas,
  });

  console.log('Seed finalizado. Empresas importadas com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Desconectado do banco.');
  });