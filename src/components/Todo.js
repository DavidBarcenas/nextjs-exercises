function Todo({ title }) {
  const handleDelete = () => console.timeLog('Clicked!');

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="actions">
        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
