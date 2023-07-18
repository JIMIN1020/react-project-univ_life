import React, { useRef, useCallback } from "react";
import "./ActiviModal.module.css";
import useOnClickOutside from "./hooks/useOnClickOutside.js";

function ActiviModal({
  setModalOpen
}) {
  const ref = useRef();

  useOnClickOutside(ref, () => {
      setModalOpen(false);
  });

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
        </div>
      </div>
    </div>
  );
}

export default ActiviModal;
