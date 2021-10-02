import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { product } = props

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const data = await getData()
  const product = data.products.find(p => p.id === productId)

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  const data = await getData()
  const pathsWithParams = data.products.map(p => ({ params: { pid: p.id } }))

  return {
    paths: pathsWithParams,
    fallback: true
  }
}

export default ProductDetailPage;