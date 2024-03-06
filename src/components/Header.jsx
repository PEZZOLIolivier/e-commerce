import {Link, Outlet, useNavigate} from "react-router-dom";
import {CiSearch, CiShoppingCart} from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux";
import {getCartTotal} from "../redux/cartSlice.jsx";
import {useEffect, useState} from "react";
import {setSearchQuery} from "../redux/productSlice.jsx";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        dispatch(getCartTotal())
    }, [dispatch]);

    const { itemCount } = useSelector((state) => state.cart);

    useEffect(() => {
        console.log("Header - itemCount:", itemCount);
        setCartQuantity(itemCount);
    }, [itemCount]);


    const searchQuery = useSelector((state) => state.products.searchQuery);

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <>
            <header className="text-gray-100 text-xs bg-gradient-to-r from-teal-500 via-teal-500 to-teal-700 font-medium"
            >
                <div className="flex flex-wrap items-center flex-no-shrink text-white justify-between">
                    <Link to="/" className="ml-3 my-2 p-3 bg-gray-100 text-teal-700 rounded-lg text-xs order-1 md:ml-10 md:my-5 md:text-xl xl:text-4xl
                                            xl:p-5 hover:shadow-2xl hover:text-gray-100 hover:border-gray-100 hover:border-4 hover:bg-teal-700"
                    >
                        <span>Ri7FakeStore</span>
                    </Link>
                    <div className="items-center font-nunito w-full pb-3 mx-3 order-3 md:order-3 md:mx-10 xl:w-3/5 xl:order-2">
                        <input type="text"
                               value={searchQuery}
                               onChange={handleSearch}
                               className="w-full p-2 text-md text-teal-700 border border-gray-300 rounded-lg bg-gray-50 xl:p-5"
                               placeholder="Search product..."
                               required
                        />
                        <button type="submit" className="absolute text-teal-700 right-2 md:right-7 xl:top-8 xl:right-[15%] bg-gray-300 rounded-lg mt-2 mr-5 px-4 h-auto">
                            <CiSearch className="w-5 h-5 text-teal-700"/>
                        </button>
                    </div>
                    <Link to="/cart" className="ml-3 my-2 align-right mr-3 order-2 xl:order-3 md:mr-10">
                        <button className="flex items-center bg-gray-100 text-teal-700 text-xl rounded-lg py-1 md:mr-0 px-3 hover:shadow-2xl hover:text-gray-100
                                           hover:border-gray-100 hover:border hover:border-1 hover:bg-teal-700">
                            <CiShoppingCart
                                onClick={() => navigate("/cart")}
                                className="cursor-pointer"
                            />
                            <span className="ml-2">{itemCount}</span>
                        </button>
                    </Link>

                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>

    )
}
export default Header;