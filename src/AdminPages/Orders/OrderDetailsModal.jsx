import Modal from "react-modal";
import { modalStyle } from "../../Utils/style";

export default function OrderDetailsModal({
  order,
  orderModalOpen,
  setOrderModalOpen,
}) {
  const closeModal = () => {
    setOrderModalOpen(false);
  };

  return (
    <Modal
      isOpen={orderModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="min-w-[24rem]">
        <h1 className="text-xl text-center font-bold border-b pb-3 mb-3">
          A {order.date} {order.name} merendelés
        </h1>
        <div className="flex flex-col border-b pb-3 mb-3">
          <label className="text-lg font-semibold">Rendelési cím:</label>
          <p>{order.address}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Megrendelt termékek:</label>
          {order.length !== 0 &&
            order.cartProducts.map((item, key) => (
              <div className="flex flex-row justify-between" key={key}>
                <p>{item.name}:</p>
                <p>{item.quantity}</p>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}
