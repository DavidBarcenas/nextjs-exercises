import { useRouter } from 'next/router';

function ClientProjectsPage() {
  const { push } = useRouter();

  function loadProjectHandler() {
    push('/clients/dave/projecta');
  }

  return (
    <div>
      <h1>The Client Projects Page</h1>
      <button onClick={loadProjectHandler}>Load project A</button>
    </div>
  );
}

export default ClientProjectsPage;
