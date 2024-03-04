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
            <header className="text-center text-gray-100 text-xs bg-gradient-to-r from-teal-500 via-teal-500 to-teal-700 font-medium justify-center items-center py-2 h-auto w-full"
            >
                <div className="flex items-center flex-no-shrink text-white w-full justify-between">
                    <Link to="/" className="my-3 mx-10 p-3 px-1">
                        <a className="p-2 h-[100px] bg-gray-100 text-teal-700 text-4xl rounded-xl
                                      hover:shadow-2xl hover:text-gray-100 hover:border-gray-100 hover:border-4 hover:bg-teal-700"
                        >
                            Ri7 Shop Project
                        </a>
                    </Link>
                    <div className="relative font-nunito mb-1 mr-7">
                        <input type="text"
                               value={searchQuery}
                               onChange={handleSearch}
                               className="block w-96 p-4 pl-6 text-md text-teal-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-thirdColor focus:border-thirdColor"
                               placeholder="Search..."
                               required
                        />
                        <button type="submit" className="text-teal-700 absolute right-3 bottom-3 bg-secondColor rounded-lg mr-1 px-4 py-2">
                            <CiSearch className="w-5 h-5 text-teal-700"/>
                        </button>
                    </div>
                    <Link to="/cart" className="my-3 mx-10 p-3 px-1">
                        <button className="flex items-center p-2 bg-gray-100 text-teal-700 text-xl rounded-xl
                                                hover:shadow-2xl hover:text-gray-100 hover:border-gray-100 hover:border hover:border-1 hover:bg-teal-700">
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