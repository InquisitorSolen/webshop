import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { getProduct } from "../../Slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../UtilPages/Loader";
import firebase from "../../Utils/firebase";
import ProductsEditModal from "./ProductsEditModal";
import ProductCategoryModal from "./ProductCategoryModal";

export default function ProductsWeb({
  handleSelectChange,
  categoryName,
  productName,
}) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const productRefFB = firebase.firestore().collection("Products");
  const dispatch = useDispatch();

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [editProductModalOpen, seteditProductModalOpen] = useState(false);
  const [editProductName, setEditProductName] = useState("");
  const [productsArray, setProductsArray] = useState(
    Object.values(productItems.product)
  );

  useEffect(() => {
    setProductsArray(Object.values(productItems.product));
  }, [productItems.product]);

  const getProductFB = () => {
    productRefFB
      .doc(categoryName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            getProduct({
              product: doc.data(),
              productLoading: false,
            })
          );
        }
      });
  };

  const uploadToFB = async (localarray) => {
    const FBObj = {};
    for (let i = 0; i < localarray.length; i++) {
      Object.assign(FBObj, { [localarray[i].name]: localarray[i] });
    }
    try {
      await productRefFB.doc(categoryName).set(FBObj);
      getProductFB();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProd = (name) => {
    const selectedProduct = productsArray.filter(
      (product) => product.name !== name
    );
    uploadToFB(selectedProduct);
  };

  const addProduct = () => {
    seteditProductModalOpen(true);
  };

  const editProd = (name) => {
    setEditProductName(name);
    seteditProductModalOpen(true);
  };

  const removeNum = (name) => {
    const localarray = productsArray.map((product) => {
      if (product.name === name) {
        const localproduct = {
          name: product.name,
          number: product.number === 0 ? 0 : product.number - 1,
          type: product.type,
          quantity: product.quantity,
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
        };
        return localproduct;
      } else {
        return product;
      }
    });
    setProductsArray(localarray);
    uploadToFB(localarray);
  };

  const addCategory = () => {
    setAddCategoryModalOpen(true);
  };

  return (
    <div className="hidden md:flex flex-row grow">
      {/* Categories List*/}
      <div className="text-center border border-black rounded-xl bg-white m-6 w-fit grow">
        <div>
          <h1 className="font-bold my-3 mx-6 text-xl">Termékkategóriák</h1>
          <div className="flex flex-col">
            {productCategory.categories.map((category) => (
              <button
                key={category}
                value={category}
                onClick={handleSelectChange}
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
      {/* Products Table*/}
      <div className="text-center border border-black rounded-xl bg-white m-6 grow w-full">
        {categoryName === undefined ? (
          <Loader />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center">
              <h1 className="font-bold my-3 mx-3 text-3xl">{productName}</h1>
              <button onClick={addProduct}>
                <AiOutlinePlusCircle className="text-2xl mt-1" />
              </button>
            </div>
            <table className="mx-3 border border-black table-fixed">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="border-l border-black">Termék neve</th>
                  <th className="border-l border-black">Termék típusa</th>
                  <th className="border-l border-black">Termék űrtartalma</th>
                  <th className="border-l border-black">Termék mennyisége</th>
                  <th className="border-l border-black">Termék akciók</th>
                </tr>
              </thead>
              <tbody className="border-b border-black">
                {productsArray.map((product) => (
                  <tr
                    key={`${product.name}${product.type}`}
                    className="border-b border-dotted border-black"
                  >
                    <td className="border-r border-dotted border-black">
                      {product.name}
                    </td>
                    <td className="border-l border-dotted border-black">
                      {product.type}
                    </td>
                    <td className="border-x border-dotted border-black">
                      {product.quantity}
                    </td>
                    <td>
                      <div className="flex flex-row items-center justify-center">
                        <button
                          onClick={() => addNum(product.name)}
                          className="my-2"
                        >
                          <AiOutlinePlus />
                        </button>
                        <p className="px-6">{product.number}</p>
                        <button
                          onClick={() => removeNum(product.name)}
                          className="my-2"
                        >
                          <AiOutlineMinus />
                        </button>
                      </div>
                    </td>
                    <td className="border-x border-dotted border-black">
                      <button
                        onClick={() => editProd(product.name)}
                        className="mx-2"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => deleteProd(product.name)}
                        className="mx-2"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ProductsEditModal
          editProductModalOpen={editProductModalOpen}
          seteditProductModalOpen={seteditProductModalOpen}
          editProductName={editProductName}
          productsArray={productsArray}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
}
