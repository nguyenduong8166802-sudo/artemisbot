
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";
const DATA_FILE = path.join(__dirname, "data", "packages.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readPackages() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

function writePackages(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function requireAdmin(req, res, next) {
  const password = req.header("x-admin-password");
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Sai mật khẩu admin." });
  }
  next();
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/packages", (_req, res) => {
  res.json(readPackages());
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Sai mật khẩu." });
  }
  res.json({ success: true });
});

app.put("/api/admin/packages", requireAdmin, (req, res) => {
  const packages = req.body;
  if (!Array.isArray(packages)) {
    return res.status(400).json({ error: "Dữ liệu phải là mảng." });
  }

  for (const item of packages) {
    if (!item.name || !item.price) {
      return res.status(400).json({ error: "Mỗi gói phải có name và price." });
    }
  }

  writePackages(packages);
  res.json({ success: true, items: packages });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
