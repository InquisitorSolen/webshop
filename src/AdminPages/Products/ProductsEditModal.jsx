import { getProductAsync } from "../../Slices/productSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import firebase from "../../Utils/firebase";
import modalStyle from "../../Utils/modalStyle";

export default function ProductsEditModal({
  editProductModalOpen,
  seteditProductModalOpen,
  editProductName,
  productsArray,
  categoryName,
}) {
  const dispatch = useDispatch();
  const productRefFB = firebase.firestore().collection("Products");

  const selectedProduct = productsArray.find(
    (product) => product.name === editProductName
  );

  const defaultProduct = {
    name: "",
    type: "",
    number: 0,
    quantity: "",
    src: "",
    price: 0,
    description: "",
  };

  const [localproduct, setLocalProduct] = useState(defaultProduct);

  useEffect(() => {
    if (selectedProduct !== undefined) {
      setLocalProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct((localproduct) => ({ ...localproduct, [name]: value }));
  };

  const closeModal = () => {
    seteditProductModalOpen(false);
    setLocalProduct(defaultProduct);
  };

  const editProduct = async (event) => {
    event.preventDefault();

    if (selectedProduct !== undefined) {
      const id = uuidv4();
      try {
        await productRefFB.doc(categoryName).update({
          [id]: {
            name: localproduct.name,
            type: localproduct.type,
            number: parseInt(localproduct.number),
            quantity: localproduct.quantity,
            src: localproduct.src,
            price: parseInt(localproduct.price),
            description: localproduct.localproduct,
          },
        });
        dispatch(getProductAsync(categoryName));
        setLocalProduct(defaultProduct);
        seteditProductModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      const id = uuidv4();
      try {
        await productRefFB.doc(categoryName).update({
          [id]: {
            name: localproduct.name,
            type: localproduct.type,
            number: parseInt(localproduct.number),
            quantity: localproduct.quantity,
            src: localproduct.src,
            price: parseInt(localproduct.price),
            description: localproduct.localproduct,
          },
        });
        dispatch(getProductAsync(categoryName));
        setLocalProduct(defaultProduct);
        seteditProductModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      isOpen={editProductModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4 ">
        <form onSubmit={editProduct} className="flex flex-col gap-3">
          <div>
            {selectedProduct === undefined ? (
              <p className="text-center font-bold text-lg">
                Termék felvétele: {editProductName}
              </p>
            ) : (
              <p className="text-center font-bold text-lg">
                Termék módosítása: {editProductName}
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
                    value={localproduct.name}
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
                    value={localproduct.type}
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
                    value={localproduct.src}
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
                    value={localproduct.number}
                    onChange={handleChange}
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék ürtartalma:</label>
                  <input
                    type="text"
                    placeholder="Termék ürtartalma"
                    required
                    value={localproduct.quantity}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék ára:</label>
                  <input
                    type="number"
                    placeholder="Termék ára"
                    required
                    value={localproduct.price}
                    onChange={handleChange}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {selectedProduct === undefined ? (
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
