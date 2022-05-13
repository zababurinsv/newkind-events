import path from 'path'
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from 'cors'
import express from 'express'
let app = express.Router();
app.use(await cors({ credentials: true }));
import corsOptions from '../../../security/corsOptions.mjs'
const pkg = require("../../../package.json");

app.use((req, res, next) => {
    console.log(`service: ${pkg.targets.service.publicUrl}${req.path}`);
    next();
});

app.use(express.static(path.join(__dirname, `../service/${pkg.targets.service.publicUrl}`)));
export default app;