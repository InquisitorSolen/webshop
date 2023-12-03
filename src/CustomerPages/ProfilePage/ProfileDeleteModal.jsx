import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import modalStyle from "../../Utils/modalStyle";

export default function ProfileDeleteModal({ modalOpen, setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between text-center">
          <div className="w-7"></div>
          <h1 className="text-center text-2xl font-bold">
            Biztosan Törölni akarja profilját?
          </h1>
          <button className="flex text-2xl text-danger" onClick={closeModal}>
            <IoIosClose />
          </button>
        </div>
        <p>
          A profil összes adata törlésre kerül és késöbb nem lessz
          visszaállítható
        </p>
        <div className="flex flex-row justify-evenly mt-6">
          <button className="text-xl border-2 border-danger hover:bg-danger font-bold py-1 px-2 rounded-xl">
            Törlés
          </button>
          <button
            className="text-xl border-2 border-primary hover:bg-primary hover:text-white font-bold py-1 px-2 rounded-xl"
            onClick={closeModal}
          >
            Mégse
          </button>
        </div>
      </div>
    </Modal>
  );
}
