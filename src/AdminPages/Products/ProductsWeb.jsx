import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import ProductCategoryModal from "./ProductCategoryModal";

export default function ProductsWeb({ handleSelectChange, categoryName }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const addCategory = () => {
    setAddCategoryModalOpen(true);
  };

  return (
    <div className="hidden md:block">
      {/* Categories */}
      <div className="text-center border border-black rounded-xl bg-white m-6  max-w-[20%] h-[86vh]">
        <div>
          <h1 className="font-bold my-3 text-xl">Termékkategóriák</h1>
          <div className="flex flex-col">
            {productCategory.categories.map((category) => (
              <button
                key={category}
                value={category}
                className="text-center text-lg py-1 border-b mx-8"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <button className=" mt-6 text-2xl" onClick={addCategory}>
          <AiOutlinePlus />
        </button>
      </div>
      <ProductCategoryModal
        addCategoryModalOpen={addCategoryModalOpen}
        setAddCategoryModalOpen={setAddCategoryModalOpen}
      />
      {/* Products */}
      <div></div>
    </div>
  );
}
