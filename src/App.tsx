import { Routes, Route } from "react-router";
import Layout from "./component/Layout";
import Products from "./component/Products";

import "./App.css";
import Cart from "./component/Cart";
import Order from "./component/Order";

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
