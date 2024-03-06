import {addToCart, removeFromCart} from '../redux/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import { FaTrash } from 'react-icons/fa';

const CartCpt = ({cart}) => {
    const dispatch = useDispatch();
    const cartInStore = useSelector(state => state.cart.carts.find(item => item.id === cart.id));

    const handleDecrement = () => {
        if (cartInStore.quantity > 1) {
            dispatch(addToCart({ ...cartInStore, quantity: cartInStore.quantity - 1 }));
        } else {
            dispatch(removeFromCart(cart.id));
        }
    };

    const handleIncrement = () => {
        dispatch(addToCart({ ...cartInStore, quantity: cartInStore.quantity + 1 }));
    };

    return (

    <table className="table-fixed w-96 md:w-full md:my-2">
        <tbody className="p-1">
        <tr className="">
            <td className="hidden md:block">
                    <img src={cart.image} alt="product" className="h-auto max-w-full xl:max-h-[10vh]"/>
                </td>
                <td className="w-[45vw] ">
                    <h2 className="text-xs text-left font-semibold truncate ... md:text-lg md:font-bold">{cart.title}</h2>
                </td>
                <td className="">
                    <p className="px-1 text-xs text-right w-[10vw] md:text-lg">${cart.price}</p>
                </td>
                <td className="w-[10vw]">
                    <div className="flex items-center justify-center text-xs md:text-lg">
                        <button onClick={handleDecrement}
                                className="mx-1 px-1 rounded border-teal-700 border-2 bg-teal-700 text-gray-100 hover:bg-gray-100 hover:text-teal-700">-
                        </button>
                        <span className="mx-1">{cartInStore.quantity}</span>
                        <button onClick={handleIncrement}
                                className="mx-1 px-1 rounded border-teal-700 border-2 bg-teal-700 text-gray-100 hover:bg-gray-100 hover:text-teal-700">+
                        </button>
                    </div>
                </td>
                <td className="w-[15vw] text-xs text-right md:text-lg md:font-semibold">
                    ${cart.price * cartInStore.quantity }
                </td>
                <td className="w-[5vw] px-1 text-xs md:text-lg md:px-3">
                    <FaTrash onClick={() => dispatch(removeFromCart(cart.id))}
                             className="text-red-700"/>
                </td>
            </tr>
            </tbody>
        </table>


)
}

export default CartCpt;