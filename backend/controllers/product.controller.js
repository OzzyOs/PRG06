import Product from "../models/product.model.js";
import mongoose from "mongoose";


// getProducts does an async request to all resources.
export const getProducts = async (req, res) => {
    try {
        // Create a products variable that tries to find the first element in an array.
        const products = await Product.find({});
        const acceptHeader = req.headers['accept'];

        const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;
        console.log(req.get('host'))

        // Add links into the response for formatting, let the model focus on data structure.
        const response = {
            items:products,
            _links:{
                self:{
                    href:{href: baseUrl },
                },
                collection: {
                    href:{href: baseUrl},
                }
            }
        }
        if (acceptHeader.includes('application/json')) {
            res.status(200).json(response);
        } else {
            res.status(400).send('Illegal format');
        }

        // If successful, update the state with the retrieved 'data' ('i.e., products').
        // res.status(200).json(response);
    }
    catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message: "No products found."});
    }
}

// getProductById does an async request to a resource based on it's id.
export const getProductById = async (req, res) => {
    try {
        // Create a product variable that tries to find `product data` by the provided ${params.id}.
        const product = await Product.findById(req.params.id);

        // If successful, update the state with the retrieved `data` (`i.e., product').
        res.status(200).json({success: true, items: product});
    }
    catch (error) {
        console.log("error in getProductById:", error);
        res.status(500).json({success: false, message: "Product not found."});
    }
}

// createProduct does an async request to create a new resource.
export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data, so data within the body.

    const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;

    // Validation check for required fields.
    if (!product.name || !product.price || !product.description || !product.rating) {
        return res.status(400).json({success: false, message: 'Please fill in all required fields: name, price, rating and description.'});
    }

    const acceptHeader = req.headers['accept'];

    if (acceptHeader.includes('application/json')) {
        return res.json({message: "accepted product"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();

        const selfLink = `${baseUrl}/api/products/${newProduct._id}`
        const collectionLink = `${baseUrl}/api/products`;

        res.status(200).json({success: true, product: newProduct, _links: {
            self:{ href: selfLink },
                collection: {href : collectionLink}
            }});
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(400).json({success: false, error: error.message});
    }
}

// deleteProduct does an async request to delete a resource based on it's id.
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Product id not found."});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully."});
    } catch (error) {
        console.error("Error in Delete Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// updateProduct does an async request to update a specific resource based on it's id.
export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Product id not found."});
    }

    try {
        const updatedProduct =  await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success: true, product: updatedProduct});
    } catch (error) {
        console.error("Error in Update Product", error.message);
        res.status(500).json({success: false, message: "Product not found"});
    }
}