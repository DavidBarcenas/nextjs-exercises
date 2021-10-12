
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getFeaturedPosts() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter(p => p.isFeatured)
  return featuredPosts
}

export function getAllPosts() {
  const postFiles = getPostsFiles()

  const allPosts = postFiles.map(p => getPostData(p))
  const sortedPosts = allPosts.sort((a, b) => a.date > b.date ? -1 : 1)

  return sortedPosts
}

export function getPostData(postId) {
  const removeFileExtension = postId.replace(/\.md$/, '')

  const filePath = path.join(postsDirectory, `${removeFileExtension}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const { data, content } = matter(fileContent)


  const postData = {
    slug: removeFileExtension,
    ...data,
    content
  }

  return postData
}

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory)
}