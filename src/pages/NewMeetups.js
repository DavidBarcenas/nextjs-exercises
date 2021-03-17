import NewMeetupForm from '../components/meetups/NewMeetupForm';

export default function NewMeetupsPage() {
  const addMeetupHandler = (meetupData) => {
    fetch('url', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
