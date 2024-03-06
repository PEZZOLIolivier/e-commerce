import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotal } from "../redux/cartSlice";
import CartComp from "../components/CartCpt.jsx";

const Cart = () => {
    const dispatch = useDispatch();
    const { carts, totalAmount } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartTotal());
    }, [dispatch, carts]);

    return (
        <div className="mx-auto m-1 p-1 items-center">
            <h1 className="text-teal-700 text-4xl text-center font-bold my-5">Shopping Cart</h1>
            <div className="w-96 md:w-auto text-teal-700 flex item-center mx-auto m-1">
                {carts.length > 0 ? (
                    <div className="border border-teal-700 rounded-md px-1 py-2">
                        {carts?.map((cart, i) => (
                            <CartComp key={i} cart={cart}/>
                        ))}

                        <div className="p-6 mt-6 ml-3 h-auto">
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div>
                                    <p className="mb-1 text-lg font-bold">${totalAmount}</p>
                                </div>
                            </div>
                            <button className="w-full px-4 my-2 py-2 border border-teal-700 bg-teal-700 hover:bg-gray-100 hover:text-teal-700 text-gray-100 text-sm font-bold rounded z-10  opacity-50 cursor-not-allowed">
                                Checkout
                            </button>
                            <p className="text-center text-xs italic text-red-700">Checkout coming soon !</p>
                            <Link to="/" className="flex font-semibold text-md mt-10">
                                <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>


                    </div>
                ) : (
                    <div className="pt-20 flex flex-col items-center">
                        <p>
                            <a href="https://giphy.com/gifs/shopping-DZgUVLxzMoAwg"></a>
                        </p>
                        <p className="text-2xl md:text-4xl my-5">You don&acute;t have any items.</p>
                        <Link to="/">
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    className="text-gray-100 ml-5 min-w-1/2 px-4 my-2 py-2 border border-teal-700 bg-teal-700 hover:bg-gray-100 hover:text-teal-700 text-gray-100 text-sm font-bold rounded z-10"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Cart;
