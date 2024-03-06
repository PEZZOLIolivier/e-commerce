import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDetailProducts, getProducts} from "../redux/productSlice.jsx";
import {Box, Rating} from "@mui/material";
import Category from "../components/Category.jsx";
import {Link} from "react-router-dom";



const Home = () => {
    const dispatch = useDispatch();
    const {products, searchQuery}= useSelector(state => state.products);
    const { selectedCategory } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;

        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const handleLinkClick = (id) => {
        dispatch(getDetailProducts(id));
    };

    console.log("Products : ", products);

    return (



        <div>
            <Category />
            <div className="px-3 grid lg:grid-cols-3 xl:grid-cols-4 relative container mx-auto mb-10 grid-cols-1 md:grid-cols-2">
                {filteredProducts.map((product) => (
                        <Link key={product.id}
                              to={`/products/${product.id}`}
                             className="pb-5 border border-1 border-gray-400 rounded rounded-lg m-1 shadow-lg bg-white hover:duration-100 hover:bg-slate-50"
                              onClick={() => handleLinkClick(product.id)}
                        >
                            <section className="rounded rounded-t-lg p-5">
                                <img src={product.image} alt={product.title} className="rounded rounded-t-lg mx-auto h-40"/>
                            </section>
                            <div className="w-full flex-grow border-t border-gray-400"></div>
                            <section className="flex flex-col items-center">
                                <div
                                    className="inline-block text-white bg-gradient-to-r from-teal-500 via-teal-500 to-teal-600
                            font-medium rounded-full text-xs mt-1  mb-5 px-2 text-center italic"
                                >
                                    Category : {product.category}</div>
                                <h2 className="text-center mx-1 pb-2 font-medium leading-tight h-10 mb-5">{product.title}</h2>
                                <div className="h-36 mx-1 overflow-y-clip overflow-hidden">
                                    <span className="font-semibold"> Description : </span><i>{product.description}</i>
                                </div>
                            </section>
                            <div className="w-full flex-grow border-t border-gray-400"></div>
                            <section>
                                <div className="my-3 text-center text-2xl text-teal-700">${product.price}</div>
                                <Box sx={{'& > legend': {mt: 2}}} className="text-center">
                                    <Rating name="read-only" value={product.rating.rate} precision={0.1} readOnly/>
                                </Box>
                            </section>
                        </Link>
                ))}
            </div>
        </div>
    )
}
export default Home;