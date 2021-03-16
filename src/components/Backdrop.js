function Backdrop({ setModalIsOpen }) {
  return <div className="backdrop" onClick={() => setModalIsOpen(false)} />;
}

export default Backdrop;
