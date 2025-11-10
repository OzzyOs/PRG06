import express from 'express';
import {createProduct, deleteProduct, getProducts, updateProduct, getProductById} from "../controllers/product.controller.js";
const router = express.Router();

// This is where all routes are declared, here you can see whether the api route
// requires an ID or not. And which methods have access to which routes.

// GET
router.get('/', getProducts); // This route uses the 'getProducts' function in the product.controller.js.
router.get('/:id', getProductById); // This route uses the 'getProductById' function in the product.controller.js.
                                    // When making a request with this route, you will need to provide an id.

// POST
router.post('/', createProduct); // This route uses the 'createProduct' function in the product.controller.js.

// DELETE
router.delete('/:id', deleteProduct); // This route uses the 'deleteProduct' function in the product.controller.js.
                                      // This route will need an id.
// PUT
router.put('/:id', updateProduct); // This route uses the 'updateProduct' function in the product.controller.js
                                   // This route will need an id.
// PATCH
router.patch('/:id', patchProduct); // This route uses the 'patchProduct' function in the product.controller.js
                                     // This route will need an id.
export default router;

