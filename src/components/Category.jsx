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
        <div className="text-center text-gray-100 text-xs bg-gradient-to-r from-teal-500 via-teal-500 to-teal-700 font-medium justify-center items-center mb-5 px-2 rounded-b-xl flex">
            <ul className="flex">
                <li
                    onClick={() => handleCategoryClick(null)}
                    className={`uppercase mx-10 pb-2 mt-0 m-1 mx-5 px-5 hover:cursor-pointer hover:animate-pulse hover:text-teal-700 hover:bg-gray-100 hover:rounded-b-lg hover:shadow-lg ${
                        selectedCategory === null ? "text-gray-100 underline" : ""
                    }`}
                    key="all"
                >
                    All
                </li>
                {categories?.map((category, index) => (
                    <li
                        onClick={() => handleCategoryClick(category)}
                        className={`uppercase mx-10 pb-2 mt-0 m-1 mx-5 px-5 hover:cursor-pointer hover:animate-pulse hover:text-teal-700 hover:bg-gray-100 hover:rounded-b-lg hover:shadow-lg ${
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
