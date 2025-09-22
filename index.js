import fs from "node:fs/promises";
import http from "node:http";

const PORT = 5000;

const routes = new Map([
	["home", { file: "./index.html", code: 200 }],
	["about", { file: "./about.html", code: 200 }],
	["contact", { file: "./contact-me.html", code: 200 }],
	["404", { file: "./404.html", code: 404 }],
]);

const getRoute = (path) => {
	switch (path) {
		case "/":
			return routes.get("home");
		case "/about":
			return routes.get("about");
		case "/contact":
			return routes.get("contact");

		default:
			return routes.get("404");
	}
};

const getFileContent = async (pathUrl) => {
	const response = getRoute(pathUrl);
	const data = await fs.readFile(response.file, { encoding: "utf-8" });
	return { data, statusCode: response.code };
};

const server = http.createServer(async (req, res) => {
	try {
		const { data, statusCode } = await getFileContent(req.url);
		res.writeHead(statusCode, { "Content-Type": "text/html" });
		res.end(data);
	} catch (error) {
		console.error(error);
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Internal Server Error");
	}
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
