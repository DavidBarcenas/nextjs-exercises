function Modal({ setModalIsOpen }) {
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button className="btn btn--alt" onClick={() => setModalIsOpen(false)}>
        Cancel
      </button>
      <button className="btn" onClick={() => setModalIsOpen(false)}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
