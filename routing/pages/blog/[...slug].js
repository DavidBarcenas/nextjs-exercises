import { useRouter } from 'next/router';

function BlogPostPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Blog Post</h1>
    </div>
  );
}

export default BlogPostPage;
