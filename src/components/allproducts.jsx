import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { addProductToCart, createNewCart, getProfile } from "../api";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Select, MenuItem } from "@mui/material";
import { addToCart } from "./utils/cartFunctions";
import "../css/allproducts.css";
import { inCartToast } from "../routes/root";

export default function AllProducts() {
  const { products, user, setUser, cart, setCart, token, theme } =
    useOutletContext();

  const productContainer = useRef(null);

  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setDisplayedProducts(products);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategorySelect = (categoryString) => {
    if (categoryString === "All") {
      setDisplayedProducts(products);
      productContainer.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (categoryString === "Featured") {
      const newDisplayedProducts = products.filter(
        (product) => product.isFeatured === true
      );
      setDisplayedProducts(newDisplayedProducts);
      productContainer.current.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    const newDisplayedProducts = products.filter(
      (product) => product.category === categoryString
    );
    setDisplayedProducts(newDisplayedProducts);
    productContainer.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!products) {
    return <></>;
  }

  return (
    <div id="all-products">
      {windowWidth <= 768 ? (
        <Select onChange={(event) => handleCategorySelect(event.target.value)}>
          <MenuItem value="All">All Products</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Memorabilia">Memorabilia</MenuItem>
          <MenuItem value="Baby">Baby</MenuItem>
          <MenuItem value="Household">Household</MenuItem>
          <MenuItem value="Featured">Featured</MenuItem>
        </Select>
      ) : (
        <div className="categories-container">
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("All")}
          >
            All Products
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Clothing")}
          >
            Clothing
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Accessories")}
          >
            Accessories
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Memorabilia")}
          >
            Memorabilia
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Baby")}
          >
            Baby
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Household")}
          >
            Household
          </Button>

          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Featured")}
          >
            Featured
          </Button>
        </div>
      )}
      <div ref={productContainer} className="cards-container">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <h1 className="product-name">{product.name}</h1>
              <img
                className="product-image"
                src={product.imageURL}
                alt={products.name}
              />
              <div className="product-price">Price: {product.price}</div>

              <Button
                className="product-btn"
                onClick={(e) =>
                  addToCart(
                    e,
                    product,
                    user,
                    setUser,
                    cart,
                    setCart,
                    token,
                    inCartToast
                  )
                }
              >
                Add to Cart
              </Button>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
}
