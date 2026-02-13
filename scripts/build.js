const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const srcDir = path.join(projectRoot, "public");
const outDir = path.join(projectRoot, "build");

async function ensureCleanDir(dirPath) {
  await fs.promises.rm(dirPath, { recursive: true, force: true });
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function copyRecursive(src, dest) {
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  await fs.promises.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function build() {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Missing public/ directory at ${srcDir}`);
  }

  await ensureCleanDir(outDir);
  await copyRecursive(srcDir, outDir);
}

build().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
