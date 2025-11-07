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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'], // Allowed methods.
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'], // Allowed headers.
}));

app.options('*', (req, res) => { // Handle OPTION Preflight requests.
    res.setHeader('Access-Control-Allow-Origin', '*'); // Any origin can make requests.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD'); // These HTTP methods are allowed.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With'); // These headers are allowed in requests.
    res.setHeader('Access-Control-Max-Age', '86400'); // Set cache preflight 24 hours, reduces repeated OPTIONS requests for optimization.
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD'); // Inform client of allowed methods.
    res.status(204).end();
}); // Explicitly handle OPTIONS preflight requests

app.use((req, res, next) => { // General web security headers middleware
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block'); // Enable XSS protection
    next();
})

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

