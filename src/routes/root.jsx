// This is the main landing page for the app.

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api";
const cardsContainer = document.querySelector("#cards-container");

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoadingProducts(true);
      const fetchProducts = await getAllProducts();
      setProducts(fetchProducts);
      setIsLoadingProducts(false);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        const fetchMe = await getProfile(token);
        setUser(fetchMe);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <>
      <Header />
      <Nav />
      <div id="main">
        <Outlet
          context={{ products, setToken, token, user, setUser, setProducts }}
        />
      </div>
    </>
  );
};

export default Root;
