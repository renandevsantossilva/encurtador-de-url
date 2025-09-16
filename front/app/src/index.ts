import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// gerar slug aleatório
function generateSlug(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

// endpoint para encurtar URL
app.post("/shorten", async (req, res) => {
  const { url, customSlug } = req.body as { url?: string; customSlug?: string };

  if (!url) return res.status(400).json({ error: "URL é obrigatória" });

  try {
    new URL(url); // validação
  } catch {
    return res.status(400).json({ error: "URL inválida" });
  }

  let slug = customSlug?.trim() || generateSlug();

  // garantir que slug não exista
  let exists = await prisma.url.findUnique({ where: { slug } });
  while (exists) {
    slug = generateSlug();
    exists = await prisma.url.findUnique({ where: { slug } });
  }

  const created = await prisma.url.create({
    data: { slug, original: url },
  });

  return res.json({
    shortUrl: `${req.protocol}://${req.get("host")}/${created.slug}`,
    slug: created.slug,
    original: created.original,
  });
});

// endpoint de redirecionamento
app.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const found = await prisma.url.findUnique({ where: { slug } });
  if (!found) return res.status(404).send("URL não encontrada");

  return res.redirect(found.original);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
