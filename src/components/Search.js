import React, { useState } from "react";
import Tesseract from "tesseract.js";  // Import Tesseract.js
import Table from "./Table";

const Search = () => {
  const [ingredients, setIngredients] = useState([]); // State to store fetched data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data
  const [isProcessing, setIsProcessing] = useState(false); // State to handle OCR processing status

  // Fetch ingredients data
  const fetchData = async () => {
    try {
      const api = await fetch("http://localhost:3000/ingredients");
      const data = await api.json();
      setIngredients(data); // Store fetched data
      setFilteredData(data); // Initialize filtered data
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Handle Search (Multiple Ingredients)
  const handleSearch = () => {
    const ingredientList = searchQuery
      .split(",") // Split by commas
      .map((item) => item.trim().toLowerCase()); // Trim spaces and convert to lowercase

    // Filter the ingredients based on the list of inputs
    const filtered = ingredients.filter((ingredient) =>
      ingredientList.includes(ingredient.Column1.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data
  };

  // Call `fetchData` when the button is clicked
  const handleFetch = () => {
    fetchData();
  };

  // Handle Image Upload and OCR
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true); // Start processing
      Tesseract.recognize(
        file, // Image file
        "eng", // Language (English)
        
      )
        .then(({ data: { text } }) => {
          setIsProcessing(false); // Stop processing
          const extractedText = text.trim(); // Clean up text
          const ingredientsFromImage = extractedText
            .split("\n") // Split text by new lines (adjust based on OCR results)
            .map((item) => item.trim())
            .filter((item) => item.length > 0) // Filter out empty lines
            .join(", "); // Join with commas
          setSearchQuery(ingredientsFromImage); // Set the OCR text in the search input
        })
        .catch((err) => {
          setIsProcessing(false); // Stop processing on error
          console.error("Error during OCR:", err);
        });
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Search About the Ingredient
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Enter the names of ingredients separated by commas to find their details, or upload an image to extract ingredients.
          </p>
        </div>

        {/* Image Upload for OCR */}
        <div className="flex justify-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-700 py-2 px-4 border border-gray-300 rounded"
          />
        </div>
        {isProcessing && <p className="text-center text-yellow-500">Processing image, please wait...</p>}

        {/* Search Input */}
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label htmlFor="search" className="leading-7 text-sm text-gray-600">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Enter ingredients, e.g. guarana, limonene, linalool"
            />
          </div>
          <button
            className="text-white w-64 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleFetch}
          >
            Fetch Data
          </button>
          <button
            className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
              className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
              onClick={() => setFilteredData([])}
            >
              Clear
            </button>
        </div>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {filteredData.map((ingredient, index) => (
                <Table key={index} ingredient={ingredient} />
              ))}
            </div>
            
          </div>
        </section>
      </div>
    </section>
  );
};

export default Search;
