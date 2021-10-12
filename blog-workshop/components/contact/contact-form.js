import { useEffect, useState } from 'react';

import Notification from '../ui/notification'
import classes from './contact-form.module.css'

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState(null)
  const [requestError, setRequestError] = useState(null)

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  async function sendMessageHandler(event) {
    event.preventDefault()

    if (
      !enteredEmail || !enteredEmail.includes('@') ||
      !enteredName || enteredName.trim() === '' ||
      !enteredMessage || enteredMessage.trim() === ''
    ) {
      return;
    }

    setRequestStatus('pending')

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      })

      setRequestStatus('success')
      setEnteredEmail('')
      setEnteredName('')
      setEnteredMessage('')
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong.')
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on the way!'
    }
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'success',
      title: 'Error!',
      message: requestError
    }
  }

  return (
    <section className={classes.contact}>
      <h2>How can I help you?</h2>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={e => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={e => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={enteredMessage}
            onChange={e => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}

export default ContactForm;