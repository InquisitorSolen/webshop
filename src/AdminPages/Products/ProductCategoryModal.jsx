import { useDispatch } from "react-redux";
import {
  editProductCategory,
  getProductCategories,
} from "../../Slices/productCaregorySlice";
import Modal from "react-modal";
import firebase from "../../Utils/firebase";
import modalStyle from "../../Utils/modalStyle";
import { asciify } from "../../Utils/regexChecks";

export default function ProductCategoryModal({
  addCategoryModalOpen,
  setAddCategoryModalOpen,
  productCategoryName,
  setProductCategoryName,
  oldCategoryName,
  setOldCategoryName,
}) {
  const dispatch = useDispatch();
  const productCategoriesRefFB = firebase
    .firestore()
    .collection("productCategories");
  const productRefFB = firebase.firestore().collection("Products");

  const closeModal = () => {
    setProductCategoryName("");
    setOldCategoryName("");
    setAddCategoryModalOpen(false);
  };

  const editCategory = (event) => {
    event.preventDefault();
    dispatch(
      editProductCategory({
        categoryName: productCategoryName,
        oldCategoryName,
      })
    );
  };

  const addCategory = async (event) => {
    event.preventDefault();

    const categoryAsciiName = asciify(productCategoryName);

    try {
      await productCategoriesRefFB
        .doc("categoryNames")
        .set({ [categoryAsciiName]: productCategoryName }, { merge: true });
      await productRefFB.doc(categoryAsciiName).set({});
      dispatch(getProductCategories());
    } catch (error) {
      console.error(error);
    }

    setProductCategoryName("");
    setOldCategoryName("");
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
        {oldCategoryName === "" ? (
          <p className="text-center font-bold text-lg">
            Új Termékkategória neve:
          </p>
        ) : (
          <p className="text-center font-bold text-lg">Termékkategória neve:</p>
        )}
        <form
          onSubmit={oldCategoryName === "" ? addCategory : editCategory}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            value={productCategoryName}
            onChange={(event) => setProductCategoryName(event.target.value)}
            placeholder="Új kategória neve"
            required
            className="border border-black rounded my-1 px-2"
          ></input>
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
