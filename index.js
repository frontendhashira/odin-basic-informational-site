import path from "node:path";
import url from "node:url";
import express from "express";

const app = express();

const PORT = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
