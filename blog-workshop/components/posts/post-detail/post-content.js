import Image from 'next/image'
import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css'

function PostContent(props) {
  const { slug, image, title, content } = props.post
  const imagePath = `/images/posts/${slug}/${image}`

  const customComponents = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    }
  }

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;