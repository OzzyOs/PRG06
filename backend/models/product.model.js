import mongoose, {mongo} from "mongoose";

// Mongoose is an ODM (Object-Document-Mapper) allowing us to use JavaScript to communicate with our database.


// This is what a model looks like, these are the fields that will be present within a 'product' object in the database.
// Here you can add or remove fields to your object.

const productSchema = mongoose.Schema({
    name: {
        type: String, // Define the input type
        required: true, // if true, name will be a required field.
    },
    price: {
        type: Number, // Define the input type
        required: true, // if true, price will be a required field.
    },
    description: {
        type: String, // Define the input type
        required: true, // if true, price will be a required field.
    },
    rating: {
        type: Number, // Define the input type
        required: true, // if true, rating will be a required field.
    },
},
    {
        timestamps: true, // createdAt, updatedAt automatically applied.
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

productSchema.virtual('_links').get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}${this._id}`,
            },
            collection: {
                href: `${process.env.BASE_URI}`,
            }
        }
})

const Product = mongoose.model("Product", productSchema);
// products

export default Product;