import express from 'express';

const router = express.Router();

router.get('/codigo/:barcode', async (req, res) => {
  const { barcode } = req.params;

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`, {
      headers: { 'User-Agent': 'CAPI_Backend - Dev - v1.0' }
    });
    
    const data = await response.json();

    if (data.status === 0) {
      return res.status(404).json({ error: "Produto não encontrado no Open Food Facts." });
    }

    const product = data.product;
    
    const produtoFormatado = {
      codigo_de_barras: product.code,
      nome: product.product_name_pt || product.product_name || "Nome não disponível",
      imagem: product.image_url || product.image_front_url || null,
      ecoscore: product.ecoscore_grade ? product.ecoscore_grade.toUpperCase() : "Não avaliado"
    };

    return res.status(200).json(produtoFormatado);

  } catch (error) {
    console.error("Erro na busca por código:", error);
    return res.status(500).json({ error: "Erro interno ao consultar a API externa." });
  }
});


router.get('/nome/:nomeProduto', async (req, res) => {
  const { nomeProduto } = req.params;

  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${nomeProduto}&search_simple=1&action=process&json=1`, {
      headers: { 'User-Agent': 'CAPI_Backend - Dev - v1.0' }
    });
    
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ error: "Nenhum produto encontrado com esse nome." });
    }

    const listaFormatada = data.products.map(product => ({
      codigo_de_barras: product.code,
      nome: product.product_name_pt || product.product_name || "Nome não disponível",
      imagem: product.image_url || product.image_front_url || null,
      ecoscore: product.ecoscore_grade ? product.ecoscore_grade.toUpperCase() : "Não avaliado"
    }));

    // Retorna no máximo 20 resultados
    return res.status(200).json(listaFormatada.slice(0, 20));

  } catch (error) {
    console.error("Erro na busca por nome:", error);
    return res.status(500).json({ error: "Erro interno ao consultar a API externa." });
  }
});

export default router;