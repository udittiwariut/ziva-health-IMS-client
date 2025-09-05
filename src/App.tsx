import { Routes, Route } from "react-router";
import Layout from "./component/Layout";
import Products from "./component/Product ";

import "./App.css";
import Cart from "./component/Cart";
import Order from "./component/Order";
import useGenericGet from "./api/useGenericGet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/orders" element={<Order />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
