import { useDispatch, useSelector } from "react-redux";
import { STATUS, getDetailProducts } from "../redux/productSlice.jsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Box, Rating} from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import {addToCart} from "../redux/cartSlice.jsx";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const {productDetail, productDetailStatus} = useSelector((state) => state.products);
    const {id} = useParams();
    const [amount, setAmount] = useState(0);

    const addCart = () => {
        dispatch(addToCart({
            id: productDetail.id,
            title: productDetail.title,
            image: productDetail.image,
            price: productDetail.price,
            description: productDetail.description,
            quantity: amount
        }))
    };


    const notify = () => {
        toast('Added to the cart!', {
            icon: '🛒',
        });
    };

    const handleAddToCart = () => {
        addCart();
        notify();
    }

    useEffect(() => {
        dispatch(getDetailProducts(id));
    }, [dispatch, id]);

    if (productDetailStatus === STATUS.LOADING) {
        return <div>Loading...</div>;
    }

    if (productDetailStatus === STATUS.FAIL) {
        return <div>Error fetching product details.</div>;
    }

    return (
        <div className="font-[sans-serif] bg-white text-teal-700 my-5 mb-10">
            <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-6 rounded-lg bg-gray-100">
                    <div className="lg:col-span-3 max-w-96 top-0 text-center md:items-center md:mx-auto">
                        <div className="px-4 py-10 rounded-xl shadow-lg relative bg-white">
                            <img src={productDetail.image} alt={productDetail.title} className="rounded object-cover"/>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold w-full">{productDetail.title}</h2>

                        <div className="mt-10">
                            <p className="text-sm italic">{productDetail.description}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <h4 className="text-[#333] text-base mx-auto">
                                <Box sx={{'& > legend': {mt: 2}}} className="text-center">
                                    <Rating name="read-only" value={productDetail.rating.rate} precision={0.1} readOnly/>
                                </Box>
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <p className="text-4xl font-bold mx-auto">${productDetail.price}</p>
                        </div>
                        <div className="flex flex-wrap">
                            <div className='flex flex-row items-center mx-auto'>
                                <button className='bg-gray-200 py-2 px-5 rounded-lg text-teal-700 text-2xl'
                                        onClick={() => setAmount((prev) => prev - 1)}>-
                                </button>
                                <span className='py-4 px-6 rounded-lg'>{amount}</span>
                                <button className='bg-gray-200 py-2 px-4 rounded-lg  text-teal-700 text-2xl'
                                        onClick={() => setAmount((prev) => prev + 1)}>+
                                </button>
                            </div>
                            <button type="button"
                                    onClick={handleAddToCart}
                                    className="mx-auto min-w-[200px] px-4 my-2 py-2 border border-teal-700 bg-transparent hover:bg-teal-700 hover:text-gray-100 text-teal-700 text-sm font-bold rounded z-10"
                            >
                                Add To Cart
                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <Link to="/">
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="ml-5 min-w-1/2 px-4 my-2 py-2 border border-teal-700 bg-teal-700 hover:bg-gray-100 hover:text-teal-700 text-gray-100 text-sm font-bold rounded z-10"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </Link>
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    )

};

export default ProductDetail;
