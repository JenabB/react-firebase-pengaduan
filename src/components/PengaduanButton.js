import React, { useState } from "react";
import add from "../assets/add.png";

const PengaduanButton = () => {
  const [show, setShow] = useState(false);

  const handleModalOpen = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="fixed bottom-5 right-8">
        <div>
          <button onClick={handleModalOpen}>
            {" "}
            <img src={add} alt="add" width="80px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengaduanButton;
