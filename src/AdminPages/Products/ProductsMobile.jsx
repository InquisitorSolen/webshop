import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../../UtilPages/Loader";
import firebase from "../../Utils/firebase";
import { compare } from "../../Utils/utilFunctions";

export default function ProductsMobile({ handleSelectChange, categoryName }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const productRefFB = firebase.firestore().collection("Products");

  const sortedCategoryNames = productCategory.categories.map((e) => e).sort();

  const [productsArray, setProductsArray] = useState(
    Object.values(productItems.productObj).sort(compare)
  );

  useEffect(() => {
    setProductsArray(Object.values(productItems.productObj).sort(compare));
  }, [productItems.productObj]);

  const uploadToFB = (localarray) => {
    const FBObj = {};
    for (let i = 0; i < localarray.length; i++) {
      Object.assign(FBObj, { [localarray[i].name]: localarray[i] });
    }
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
          quantity: product.quantity,
          src: product.src,
          price: product.price,
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
          quantity: product.quantity,
          src: product.src,
          price: product.price,
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
    <div className="md:hidden flex justify-start items-center mt-6 flex-col h-full w-full">
      <div className="text-center">
        <h1 className="font-bold mb-3 text-xl">Termékkategóriák</h1>
        <select
          onChange={handleSelectChange}
          defaultValue={categoryName}
          className="py-2 px-6 rounded-lg"
        >
          {sortedCategoryNames.map((category) => (
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
                key={`${product.name}${product.type}`}
                className="flex justify-between mx-4 items-center border-b grow"
              >
                <p>{product.name}</p>
                <div>
                  <button onClick={() => addNum(product.name)} className="my-2">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
