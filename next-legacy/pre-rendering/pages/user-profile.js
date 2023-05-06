function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  return {
    props: {
      username: 'Davee'
    }
  }
}