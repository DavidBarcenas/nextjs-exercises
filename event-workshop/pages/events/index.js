import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that alow you to envolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events: events
    },
    revalidate: 60
  }
}

export default AllEventsPage;
