import { useState } from 'react';
import Backdrop from './Backdrop';
import Modal from './Modal';

function Todo({ title }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="actions">
        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} />}
      {modalIsOpen && <Backdrop setModalIsOpen={setModalIsOpen} />}
    </div>
  );
}

export default Todo;
