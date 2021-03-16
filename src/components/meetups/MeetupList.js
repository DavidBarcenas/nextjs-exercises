import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

export default function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem {...meetup} key={meetup.id} />
      ))}
    </ul>
  );
}
