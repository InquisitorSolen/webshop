import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import modalStyle from "../../Utils/modalStyle";
import firebase from "../../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function ProfileDeleteModal({ modalOpen, setModalOpen }) {
  const stateUser = useSelector((state) => state.userReducer);
  const [loginErrorFlag, setLoginErrorFlag] = useState(false);
  const [credentialVerify, setCredentialVerify] = useState(false);

  const emailRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser;

  const closeModal = () => {
    setModalOpen(false);
    setCredentialVerify(false);
  };

  const onSignIn = (event) => {
    event.preventDefault();
    user
      .reauthenticateWithCredential(emailRef.current.value)
      .then((res) => {
        if (res) {
          closeModal();
        }
      })
      .catch((err) => {
        setLoginErrorFlag(true);
        console.error(err);
      });
  };

  const deleteAccount = async () => {
    await firebase.firestore().collection("users").doc(user.uid).delete();
    if (stateUser.admin) {
      await firebase
        .firestore()
        .collection("usersArrays")
        .doc("admins")
        .update({ [user.uid]: firebase.firestore.FieldValue.delete() });
    } else {
      await firebase
        .firestore()
        .collection("usersArrays")
        .doc("customers")
        .update({ [user.uid]: firebase.firestore.FieldValue.delete() });
    }
    user
      .delete()
      .then(
        dispatch(
          getUser({
            lvl: 0,
            email: "",
            familyName: "",
            surname: "",
            admin: false,
            addresses: [],
            orders: [],
          })
        )
      )
      .then(navigate("/"))
      .catch((error) => {
        console.error(error);
        setCredentialVerify(true);
      });
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
          <div className="w-7" />
          {credentialVerify ? (
            <h1 className="text-center text-2xl font-bold">
              Kérjük jelentkezzen be újra!
            </h1>
          ) : (
            <h1 className="text-center text-2xl font-bold">
              Biztosan Törölni akarja profilját?
            </h1>
          )}

          <button className="flex text-2xl text-danger" onClick={closeModal}>
            <IoIosClose />
          </button>
        </div>
        {credentialVerify ? (
          <form onSubmit={onSignIn} className="flex flex-col gap-6 mt-3">
            <input
              type="email"
              ref={emailRef}
              placeholder="Email cím"
              required
              className="border-b w-96 pl-3 focus:outline-none"
            ></input>
            <input
              type="password"
              ref={pwRef}
              placeholder="Jelszó"
              required
              className="border-b w-96 pl-3 focus:outline-none"
            ></input>
            <div className="flex items-center justify-center">
              <button className="border border-primary hover:bg-primary hover:text-white rounded-xl py-1 px-2 font-bold">
                Belépés
              </button>
            </div>
            {loginErrorFlag && (
              <p className="bg-danger text-center font-medium rounded-xl">
                Hibás email vagy jelszó!
              </p>
            )}
          </form>
        ) : (
          <>
            <p>
              A profil összes adata törlésre kerül és késöbb nem lessz
              visszaállítható!
            </p>
            <div className="flex flex-row justify-evenly mt-6">
              <button
                className="text-xl border-2 border-danger hover:bg-danger font-bold py-1 px-2 rounded-xl"
                onClick={deleteAccount}
              >
                Törlés
              </button>
              <button
                className="text-xl border-2 border-primary hover:bg-primary hover:text-white font-bold py-1 px-2 rounded-xl"
                onClick={closeModal}
              >
                Mégse
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
