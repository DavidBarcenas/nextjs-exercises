function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    res.status(201).json({
      message: 'Success!',
      email
    })
  }
}

export default handler;