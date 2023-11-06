import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCategories } from "../../Slices/productCaregorySlice";
import { useRef, useState } from "react";
import Modal from "react-modal";
import firebase from "../../Utils/firebase";
import modalStyle from "../../Utils/modalStyle";
import { asciify } from "../../Utils/regexChecks";

export default function ProductCategoryModal({
  addCategoryModalOpen,
  setAddCategoryModalOpen,
}) {
  const dispatch = useDispatch();
  const productCategoriesRefFB = firebase
    .firestore()
    .collection("productCategories");
  const productRefFB = firebase.firestore().collection("Products");

  const [categoryName, setCategoryName] = useState("");

  const productNameRef = useRef("");
  const productTypeRef = useRef("");
  const productNumberRef = useRef(0);
  const productQuantityRef = useRef("");
  const productPriceRef = useRef(0);
  const productSrcRef = useRef("");
  const productDescription = useRef("");

  const closeModal = () => {
    setAddCategoryModalOpen(false);
  };

  const getProductCategories = () => {
    productCategoriesRefFB
      .doc("categoryNames")
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            getCategories({
              categories: Object.values(doc.data()).sort(),
              categoriesNames: Object.keys(doc.data()).sort(),
              ProductCategories: doc.data(),
              categoriesLoading: false,
            })
          );
        }
      });
  };

  const addCategory = async (event) => {
    event.preventDefault();

    const id = uuidv4();
    const categoryAsciiName = asciify(categoryName);

    try {
      await productCategoriesRefFB
        .doc("categoryNames")
        .set({ [categoryAsciiName]: categoryName }, { merge: true });
      await productRefFB.doc(categoryAsciiName).set({
        [id]: {
          id,
          name: productNameRef.current.value,
          type: productTypeRef.current.value,
          number: parseInt(productNumberRef.current.value),
          quantity: productQuantityRef.current.value,
          price: parseInt(productPriceRef.current.value),
          src: productSrcRef.current.value,
          description: productDescription.current.value,
        },
      });
      getProductCategories();
    } catch (error) {
      console.error(error);
    }

    setCategoryName("");
    closeModal();
  };

  return (
    <Modal
      isOpen={addCategoryModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4 ">
        <p className="text-center font-bold text-lg">Új Termék kategória</p>
        <form onSubmit={addCategory} className="flex flex-col gap-3">
          <input
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Új kategória neve"
            required
            className="border border-black rounded my-1 px-2"
          ></input>
          <div>
            <p className="text-center font-bold text-lg">
              Új Termék kategóriában
            </p>
            <div className="flex flex-row mt-6">
              <div className="flex flex-col gap-3 mr-3">
                <div className="flex flex-col">
                  <label>Új termék neve:</label>
                  <input
                    type="text"
                    ref={productNameRef}
                    placeholder="Új termék neve"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Új termék típusa:</label>
                  <input
                    type="text"
                    ref={productTypeRef}
                    placeholder="Új termék típusa"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Új termék képének linkje:</label>
                  <input
                    type="text"
                    ref={productSrcRef}
                    placeholder="Új termék képének linkje"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label>Új termék mennyisége:</label>
                  <input
                    type="number"
                    ref={productNumberRef}
                    placeholder="Új termék mennyisége"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Új termék ára:</label>
                  <input
                    type="number"
                    ref={productPriceRef}
                    placeholder="Új termék ára"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>Új termék ürtartalma:</label>
                  <input
                    type="text"
                    ref={productQuantityRef}
                    placeholder="Új termék ürtartalma"
                    required
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <label>Új termék leírása:</label>
              <textarea
                type="text"
                ref={productDescription}
                placeholder="Új termék leírása"
                rows={6}
                className="border border-black rounded my-1 px-2"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button className="border border-black rounded-xl px-3 py-1 text-center text-base font-bold">
              Felvitel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
