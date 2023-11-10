import { asciify } from "../../Utils/regexChecks";
import { updateProduct } from "../../Slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../../UtilPages/Loader";

export default function ProductsMobile({ handleSelectChange, categoryName }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const [productsArray, setProductsArray] = useState(productItems.productArray);

  useEffect(() => {
    setProductsArray(productItems.productArray);
  }, [productItems.productArray]);

  const removeNum = (id) => {
    const obj = productsArray.find((product) => product.id === id);
    const newObj = { ...obj, number: obj.number === 0 ? 0 : obj.number - 1 };

    dispatch(
      updateProduct({
        categoryName: asciify(categoryName),
        product: id,
        data: newObj,
      })
    );
  };

  const addNum = (id) => {
    const obj = productsArray.find((product) => product.id === id);
    const newObj = { ...obj, number: obj.number + 1 };

    dispatch(
      updateProduct({
        categoryName: asciify(categoryName),
        product: id,
        data: newObj,
      })
    );
  };

  return (
    <div className="md:hidden flex justify-start items-center mt-6 flex-col h-full w-full">
      <div className="text-center">
        <h1 className="font-bold mb-3 text-xl">Termékkategóriák</h1>
        <select
          onChange={handleSelectChange}
          defaultValue={categoryName}
          className="py-2 px-6 rounded-lg"
        >
          {productCategory.productCategoriesNames.map((category) => (
            <option
              key={category}
              value={category}
              className="text-center text-sm"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-center border border-black rounded-xl bg-white mt-6 mx-6 flex flex-col grow justify-between ">
          {Object.keys(productItems.productObj).length === 0 ? (
            <Loader />
          ) : (
            productsArray.map((product) => (
              <div
                key={product.id}
                className="flex justify-between mx-4 items-center border-b grow"
              >
                <p>{product.name}</p>
                <div>
                  <button onClick={() => addNum(product.id)} className="my-2">
                    <AiOutlinePlus />
                  </button>
                  <p>{product.number}</p>
                  <button
                    onClick={() => removeNum(product.id)}
                    className="my-2"
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
