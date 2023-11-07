import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { asciify } from "../../Utils/regexChecks";
import { useEffect, useState } from "react";
import { deleteProductCategory } from "../../Slices/productCaregorySlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../../Slices/productSlice";
import Loader from "../../UtilPages/Loader";
import ProductsEditModal from "./ProductsEditModal";
import ProductCategoryModal from "./ProductCategoryModal";

export default function ProductsWeb({
  handleSelectChange,
  categoryName,
  productName,
}) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const defaultproduct = {
    id: "",
    name: "",
    type: "",
    number: 0,
    quantity: "",
    src: "",
    price: 0,
    description: "",
  };

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [editProductModalOpen, seteditProductModalOpen] = useState(false);
  const [productsArray, setProductsArray] = useState(productItems.productArray);
  const [productCategoryName, setProductCategoryName] = useState("");
  const [oldCategoryName, setOldCategoryName] = useState("");
  const [editProduct, setEditProduct] = useState(defaultproduct);

  useEffect(() => {
    setProductsArray(productItems.productArray);
  }, [productItems.productArray]);

  const deleteCategory = (name) => {
    const key = asciify(name);
    dispatch(deleteProductCategory(key));
  };

  const editCategory = (name) => {
    setOldCategoryName(name);
    setProductCategoryName(name);
    setAddCategoryModalOpen(true);
  };

  const addProduct = () => {
    setEditProduct(defaultproduct);
    seteditProductModalOpen(true);
  };

  const editProd = (id) => {
    const selectedProduct = productsArray.find((product) => product.id === id);
    setEditProduct(selectedProduct);
    seteditProductModalOpen(true);
  };

  const deleteProd = (id) => {
    dispatch(
      deleteProduct({ categoryName: asciify(categoryName), product: id })
    );
  };

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

  const addCategory = () => {
    setAddCategoryModalOpen(true);
  };

  return (
    <div className="hidden md:flex w-full h-full">
      {/* Categories List*/}
      <div className="text-center border border-black rounded-xl bg-white m-6 w-fit grow">
        {productCategory.categoriesLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="font-bold my-3 mx-6 text-xl">Termékkategóriák</h1>
            <div className="flex flex-col">
              {productCategory.productCategoriesNames.map((category) => (
                <div
                  className="flex py-1 border-b mx-8 items-center justify-between"
                  key={category}
                >
                  <button
                    onClick={() => editCategory(category)}
                    className="mr-3"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    value={category}
                    onClick={handleSelectChange}
                    className="text-center text-lg"
                  >
                    {category}
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="ml-3"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              ))}
            </div>
            <button className=" mt-6 text-2xl" onClick={addCategory}>
              <AiOutlinePlus />
            </button>
          </>
        )}
      </div>
      <ProductCategoryModal
        addCategoryModalOpen={addCategoryModalOpen}
        setAddCategoryModalOpen={setAddCategoryModalOpen}
        productCategoryName={productCategoryName}
        setProductCategoryName={setProductCategoryName}
        oldCategoryName={oldCategoryName}
        setOldCategoryName={setOldCategoryName}
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
                  <th className="border-l border-black">Termék ára</th>
                  <th className="border-l border-black">Termék akciók</th>
                </tr>
              </thead>
              <tbody className="border-b border-black">
                {productsArray.map((product) => (
                  <tr
                    key={product.id}
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
                          onClick={() => addNum(product.id)}
                          className="my-2"
                        >
                          <AiOutlinePlus />
                        </button>
                        <p className="px-6">{product.number}</p>
                        <button
                          onClick={() => removeNum(product.id)}
                          className="my-2"
                        >
                          <AiOutlineMinus />
                        </button>
                      </div>
                    </td>
                    <td className="border-x border-dotted border-black">
                      {product.price} Ft
                    </td>
                    <td className="border-x border-dotted border-black">
                      <button
                        onClick={() => editProd(product.id)}
                        className="mx-2"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => deleteProd(product.id)}
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
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          productsArray={productsArray}
          categoryName={categoryName}
          defaultproduct={defaultproduct}
        />
      </div>
    </div>
  );
}
