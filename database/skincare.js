import mongoose from "mongoose";

// Define the schema for the skincare collection
const skincareSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Ingredient name
    info_url: { type: String, required: true }, // URL for additional information
    categories: { type: [String], default: [] }, // Array of categories
    rating: { type: String, default: "Unknown" }, // Rating of the ingredient
    description: { type: String }, // Description of the ingredient
}, {
    collection: 'ingredients', // Specify the existing collection name
  });

// Create the model
export const Skincare = mongoose.model('Skincare', skincareSchema);


