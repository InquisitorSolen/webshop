import { useDispatch } from "react-redux";
import Modal from "react-modal";
import firebase from "../../Utils/firebase";
import modalStyle from "../../Utils/modalStyle";
import { useEffect, useState } from "react";
import { getProduct } from "../../Slices/productSlice";

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

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productNumber, setProductNumber] = useState(0);
  const [productQuantity, setProductQuantity] = useState("");

  useEffect(() => {
    if (selectedProduct !== undefined) {
      setProductName(selectedProduct.name);
      setProductType(selectedProduct.type);
      setProductNumber(selectedProduct.number);
      setProductQuantity(selectedProduct.quantity);
    }
  }, [selectedProduct]);

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

  const closeModal = () => {
    seteditProductModalOpen(false);
  };

  const editProduct = async (event) => {
    event.preventDefault();
    const combining = /[\u0300-\u036F]/g;
    const productAsciiName = productName
      .replace(/\s/g, "")
      .normalize("NFKD")
      .replace(combining, "");

    try {
      await productRefFB.doc(categoryName).update({
        [productAsciiName]: {
          name: productName,
          type: productType,
          number: parseInt(productNumber),
          quantity: productQuantity,
        },
      });
      getProductFB();
      setProductName("");
      setProductType("");
      setProductNumber(0);
      setProductQuantity("");
      seteditProductModalOpen(false);
    } catch (error) {
      console.error(error);
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
                    placeholder="Termék neve"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Termék típusa:</label>
                  <input
                    type="text"
                    placeholder="Termék típusa"
                    required
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label>Termék mennyisége:</label>
                  <input
                    type="number"
                    placeholder="Termék mennyisége"
                    value={productNumber}
                    onChange={(e) => setProductNumber(e.target.value)}
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
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
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
