import React, { useEffect, useState } from "react";
import ModalFormComponent from "./ModalFormComponent";

const ModalComponent = ({ userProfile }) => {
  const [showModal, setShowModal] = useState(userProfile.complement === false);

  useEffect(() => {
    setShowModal(userProfile.complement === false);
  }, [userProfile.complement]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="modal fade show"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
              </div>
              <div className="modal-body d-flex justify-content-center align-items-center">
                <ModalFormComponent closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
