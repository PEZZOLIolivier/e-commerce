import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, getCategories } from "../redux/categorySlice";

function Category() {
    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) {
            dispatch(setCategory(null));
        } else {
            dispatch(setCategory(category));
        }
    };

    return (

        <div className="w-full text-center text-gray-100 text-xs bg-gradient-to-r from-teal-500 via-teal-500 to-teal-700 font-medium justify-center items-center mb-5 pb-2 rounded-b-xl flex relative">
            <ul className="text-xs md:text-md xl:text-lg grid grid-cols-2 md:grid-cols-5">
                <li
                    onClick={() => handleCategoryClick(null)}
                    className={`block uppercase pb-2 md:inline-block md:mx-5 md:px-3 hover:cursor-pointer hover:animate-pulse hover:text-teal-700 hover:bg-gray-100 hover:rounded-b-lg hover:shadow-lg  ${
                        selectedCategory === null ? "text-gray-100 underline" : ""
                    }`}
                    key="all"
                >
                    All
                </li>
                {categories?.map((category, index) => (
                    <li
                        onClick={() => handleCategoryClick(category)}
                        className={`block md:inline-block md:mx-5 md:px-3 uppercase pb-2 mx-1 hover:cursor-pointer hover:animate-pulse hover:text-teal-700 hover:bg-gray-100 hover:rounded-b-lg hover:shadow-lg ${
                            category === selectedCategory ? "text-gray-100 underline" : ""
                        }`}
                        key={index}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
