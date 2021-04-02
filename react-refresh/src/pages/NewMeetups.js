import { useHistory } from 'react-router';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

export default function NewMeetupsPage() {
  const history = useHistory();

  const addMeetupHandler = (meetupData) => {
    fetch('url', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      history.replace('/');
    });
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
