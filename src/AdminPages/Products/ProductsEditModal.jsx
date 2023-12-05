import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  deleteNewProduct,
  updateNewProduct,
  updateProduct,
} from "../../Slices/productSlice";
import Modal from "react-modal";
import { modalStyle } from "../../Utils/style";

export default function ProductsEditModal({
  editProductModalOpen,
  seteditProductModalOpen,
  editProduct,
  setEditProduct,
  categoryName,
  defaultproduct,
}) {
  const productItems = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sec = date.getSeconds();
  const curretnHour = [hours, minutes, sec].join(":");
  const currentMin = [year, month, day, curretnHour].join("-");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const closeModal = () => {
    seteditProductModalOpen(false);
    setEditProduct(defaultproduct);
  };

  const updateProductData = (event) => {
    event.preventDefault();
    if (editProduct.id === "") {
      const id = uuidv4();
      dispatch(
        updateProduct({
          categoryName,
          product: id,
          data: {
            id: id,
            name: editProduct.name,
            type: editProduct.type,
            number: parseInt(editProduct.number),
            quantity: editProduct.quantity,
            src: editProduct.src,
            price: parseInt(editProduct.price),
            description: editProduct.description,
          },
        })
      );
      const newProduct = {
        id: id,
        time: currentMin,
        name: editProduct.name,
        type: editProduct.type,
        quantity: editProduct.quantity,
        src: editProduct.src,
        price: parseInt(editProduct.price),
        description: editProduct.description,
        category: categoryName,
      };
      if (productItems.newProductsArray.length === 5) {
        dispatch(deleteNewProduct({ id: productItems.newProductsArray[0].id }));
      }
      dispatch(
        updateNewProduct({
          id,
          product: newProduct,
        })
      );
    } else {
      dispatch(
        updateProduct({
          categoryName,
          product: editProduct.id,
          data: {
            id: editProduct.id,
            name: editProduct.name,
            type: editProduct.type,
            number: parseInt(editProduct.number),
            quantity: editProduct.quantity,
            src: editProduct.src,
            price: parseInt(editProduct.price),
            description: editProduct.description,
          },
        })
      );
    }
    setEditProduct(defaultproduct);
    seteditProductModalOpen(false);
  };

  return (
    <Modal
      isOpen={editProductModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4 ">
        <form onSubmit={updateProductData} className="flex flex-col gap-3">
          <div>
            {editProduct.id === "" ? (
              <p className="text-center font-bold text-lg">
                Termék felvétele: {editProduct.name}
              </p>
            ) : (
              <p className="text-center font-bold text-lg">
                Termék módosítása: {editProduct.name}
              </p>
            )}
            <div className="flex flex-row mt-3">
              <div className="flex flex-col gap-3 mr-3">
                <div className="flex flex-col">
                  <label>Termék neve:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Termék neve"
                    required
                    value={editProduct.name}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék típusa:</label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Termék típusa"
                    required
                    value={editProduct.type}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Kép Link:</label>
                  <input
                    type="text"
                    name="src"
                    placeholder="Kép Link"
                    value={editProduct.src}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label>Termék mennyisége:</label>
                  <input
                    type="number"
                    name="number"
                    placeholder="Termék mennyisége"
                    value={editProduct.number}
                    onChange={handleChange}
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék ürtartalma:</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="Termék ürtartalma"
                    required
                    value={editProduct.quantity}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék ára:</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Termék ára"
                    required
                    value={editProduct.price}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label>Termék leírása:</label>
              <textarea
                className="border border-black rounded my-1 px-2 w-full"
                rows={8}
                name="description"
                value={editProduct.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {editProduct.id === "" ? (
              <button className="border border-black rounded-xl px-3 py-1 text-center text-base font-bold">
                Felvétel
              </button>
            ) : (
              <button className="border border-black rounded-xl px-3 py-1 text-center text-base font-bold">
                Megváltoztatás
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
