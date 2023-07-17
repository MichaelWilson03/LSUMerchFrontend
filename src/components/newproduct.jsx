import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createProduct } from "../api";
import ImageUpload from "./imageUpload";

import "../css/productForm.css";
import { Button } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [size, setSize] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const { user, token, products, setProducts } = useOutletContext();

  const navigate = useNavigate();
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#3c1053",
            color: "white",
            textTransform: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease-in-out",
            fontSize: "16px",
            margin: "8px 0",

            "&:hover": {
              backgroundColor: "#d29f13",
            },
          },
        },
      },
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.isAdmin) {
        const result = await createProduct(
          token,
          name,
          description,
          price,
          stockQuantity,
          imageURL,
          size, 
          category,
          isFeatured
        );
        console.log(result);
        setProducts([result, ...products]);
        setName("");
        setDescription("");
        setPrice(0);
        setStockQuantity(0);
        setSize("");
        navigate("/manage-products");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="new-product-container">
      <h1 className="new-product-title">Add Product to Inventory</h1>

      <form onSubmit={handleSubmit} className="new-product-form">
        <input
          className="new-product-input"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <textarea
          className="new-product-input"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          className="new-product-input"
          placeholder="Price"
          type="number"
          step="0.01"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <input
          className="new-product-input"
          placeholder="Stock Quantity"
          type="number"
          onChange={(event) => setStockQuantity(event.target.value)}
          value={stockQuantity}
        />
        <input
          className="new-product-input"
          placeholder="Size"
          onChange={(event) => setSize(event.target.value)}
          value={size}
        />
        <select
          className="new-product-input"
          placeholder="Category"
          onChange={(event) => setCategory(event.target.value)}
          value={category}>
          <option>Accessories</option>
          <option>Baby</option>
          <option>Clothing</option>
          <option>Household</option>
          <option>Memorabilia</option>
        </select>
        <label>Featured Product
          <input
            className="new-product-input"
            type="checkbox"
            onChange={() => setIsFeatured(!isFeatured)}
            value={isFeatured}
           />
        </label>
        <ImageUpload imageURL={imageURL} setImageURL={setImageURL} />
        <Button className="new-product-button" type="submit" theme={theme}>
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default NewProduct;
