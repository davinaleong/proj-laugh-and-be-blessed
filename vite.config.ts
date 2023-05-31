import { resolve } from "path"

const root = resolve(__dirname, "src")
const outDir = resolve(__dirname, "dist")

export default {
  root,
  build: {
    outDir,
    emptyOutDir: true,
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        joke: resolve(root, "joke", "index.html"),
      },
    },
  },
}
