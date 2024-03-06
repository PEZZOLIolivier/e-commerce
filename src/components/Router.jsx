import Header from "./Header.jsx";
import Home from "../Pages/Home.jsx";
import ProductDetail from "../Pages/ProductDetail.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../Pages/Cart.jsx";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>

        </BrowserRouter>
    );
};

export default Router;