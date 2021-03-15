import Backdrop from './components/Backdrop';
import Modal from './components/Modal';
import Todo from './components/Todo';

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo title="Leran React" />
      <Todo title="Master React" />
      <Todo title="Explore the full React course" />
      <Modal />
      <Backdrop />
    </div>
  );
}

export default App;
