import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { product } = props

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find(p => p.id === productId)

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
    ],
    fallback: 'blocking'
  }
}

export default ProductDetailPage;