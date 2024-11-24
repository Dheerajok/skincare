import React from "react";

const Table = ({ ingredient }) => {
  // Determine background color based on rating
  const getRatingColor = (rating) => {
    switch (rating.toLowerCase()) {
      case "best":
        return "bg-green-400";  // Best rating, green
      case "good":
        return "bg-green-200";  // Good rating, light green
      case "average":
        return "bg-yellow-300";  // Average rating, yellow
      case "poor":
        return "bg-red-400";  // Poor rating, red
      default:
        return "bg-gray-100";  // Default, gray
    }
  };

  const ratingColor = getRatingColor(ingredient.Column4);  // Apply color logic

  return (
    <div className={`p-4 w-full ${ratingColor} border border-gray-200 rounded-lg mb-4`}>
      <div className="p-6">
        <h2 className="text-xl font-medium text-gray-900">{ingredient.Column1}</h2>
        <p className="text-gray-600">
          <strong>Function:</strong> {ingredient.Column3.replace(/[\[\]']+/g, '')} {/* Clean up the function data */}
        </p>
        <p className="text-gray-600">
          <strong>Description:</strong> {ingredient.Column5}
        </p>
        <p className="text-gray-600">
          <strong>Rating:</strong> {ingredient.Column4}
        </p>
        <a
          href={ingredient.Column2}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};



export default Table;
