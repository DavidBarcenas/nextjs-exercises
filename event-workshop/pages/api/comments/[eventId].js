function handler(req, res) {
  const eventId = req.query.eventId
  const { email, name, comment } = req.body

  if (req.method === 'POST') {
    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      eventId,
      email,
      name,
      comment
    }

    res.status(201).json({
      message: 'success',
      comment: newComment
    })
  }

  if (req.method === 'GET') {
    res.status(200).json({ message: 'success', comments: [] })
  }
}

export default handler;