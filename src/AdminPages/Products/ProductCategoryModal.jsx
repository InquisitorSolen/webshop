import { useState } from "react";
import Modal from "react-modal";
import firebase from "../../Utils/firebase";
import modalStyle from "../../Utils/modalStyle";
import { getCategories } from "../../Slices/productCaregorySlice";
import { useDispatch } from "react-redux";

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

  const closeModal = () => {
    setAddCategoryModalOpen(false);
  };

  const getProductCategories = () => {
    productCategoriesRefFB
      .doc("categoryNames")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const categoriesArray = Object.keys(doc.data());

          dispatch(
            getCategories({
              categories: categoriesArray,
              categoriesLoading: false,
            })
          );
        }
      });
  };

  const addCategory = async (event) => {
    event.preventDefault();
    try {
      await productCategoriesRefFB
        .doc("categoryNames")
        .set({ [categoryName]: categoryName }, { merge: true });
      await productRefFB.doc(categoryName).set({ 0: 0 });
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
      <div className="flex flex-col gap-4">
        <p className="text-center font-medium">Új kategória Felvitele</p>
        <form onSubmit={addCategory} className="flex flex-col gap-3">
          <input
            type="string"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Új kategória neve"
            required
            className="border border-black rounded my-1 px-2"
          ></input>
          <div className="flex items-center justify-center">
            <button className="border border-black rounded-xl mx-2  px-2">
              Felvitel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
