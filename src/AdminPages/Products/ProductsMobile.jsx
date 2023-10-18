import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../../UtilPages/Loader";
import firebase from "../../Utils/firebase";

export default function ProductsMobile({ handleSelectChange, categoryName }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const productRefFB = firebase.firestore().collection("Products");

  const [productsArray, setProductsArray] = useState(
    Object.values(productItems.product)
  );

  useEffect(() => {
    setProductsArray(Object.values(productItems.product));
  }, [productItems.product]);

  const uploadToFB = (localarray) => {
    const FBObj = Object.assign({}, localarray);
    productRefFB
      .doc(categoryName)
      .set(FBObj)
      .catch((err) => {
        console.error(err);
      });
  };

  const removeNum = (name) => {
    const localarray = productsArray.map((product) => {
      if (product.name === name) {
        const localproduct = {
          name: product.name,
          number: product.number === 0 ? 0 : product.number - 1,
          type: product.type,
        };
        return localproduct;
      } else {
        return product;
      }
    });
    setProductsArray(localarray);
    uploadToFB(localarray);
  };

  const addNum = (name) => {
    const localarray = productsArray.map((product) => {
      if (product.name === name) {
        const localproduct = {
          name: product.name,
          number: product.number === 0 ? 0 : product.number + 1,
          type: product.type,
        };
        return localproduct;
      } else {
        return product;
      }
    });
    setProductsArray(localarray);
    uploadToFB(localarray);
  };

  return (
    <div className="md:hidden flex justify-center items-center mt-6 flex-col">
      <div className="text-center">
        <h1 className="font-bold mb-3 text-xl">Termékkategóriák</h1>
        <select
          onChange={handleSelectChange}
          defaultValue={categoryName}
          className="py-2 px-6 rounded-lg"
        >
          {productCategory.categories.map((category) => (
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
      <div className="text-center border border-black rounded-xl bg-white mt-6 w-[80%] h-[70vh]">
        {Object.keys(productItems.product).length === 0 ? (
          <Loader />
        ) : (
          <div>
            <div>
              {productsArray.map((product) => (
                <div
                  key={product.name}
                  className="flex justify-between mx-4 items-center border-b"
                >
                  <p>{product.name}</p>
                  <div>
                    <button
                      onClick={() => addNum(product.name)}
                      className="my-2"
                    >
                      <AiOutlinePlus />
                    </button>
                    <p>{product.number}</p>
                    <button
                      onClick={() => removeNum(product.name)}
                      className="my-2"
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
