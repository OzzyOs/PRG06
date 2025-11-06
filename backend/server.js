import dotenv from "dotenv";
import express, {response} from 'express';
import { connectDB } from './config/db.js';
import cors from "cors";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({ // Cross-Origin Resource Sharing, allows origin string to load resources. Normally fetch() has the same origin policy.
    origin:'*', // Open to all origins, only use during development.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods.
    allowedHeaders: ['Content-Type', 'Accept'], // Allowed headers.
}));

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Allow', 'GET, POST, PUT, DELETE');
    res.status(204).end();
}); // Explicitly handle OPTIONS preflight requests

app.use(express.json()); // Allows for json data to be accepted in the body.

app.use(express.urlencoded({extended: true})); // Allows for submission of forms or data sent with the 'application/x-www-form-urlencoded' content type.
                                               // Parses the request body and populated the 'req.body' with the parsed data.
                                               // Makes use of quick serialization (qs lib), allowing rich objects and array to be encoded in URL format.
                                               // set on true to support nested objects (complex) / set on false to NOT support nested objects (simple).

app.use("/api/products", productRoutes); // All of the products (in the route folder) will be prefixed to /api/products.

app.listen(PORT,'0.0.0.0', () => {
    connectDB();
    console.log(`Server started at http://localhost:`+ PORT);
});

