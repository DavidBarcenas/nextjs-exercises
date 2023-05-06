import Head from 'next/head'

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../helpers/posts-utils";

function SinglePostPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta
          name='description'
          content={props.post.excerpt}
        />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context
  const { slug } = params

  const post = getPostData(slug)

  return {
    props: {
      post
    }
  }
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles()

  const slugs = postFilenames.map(file => ({
    params: { slug: file.replace(/\.md$/, '') }
  }))

  return {
    paths: slugs,
    fallback: false
  }
}

export default SinglePostPage;