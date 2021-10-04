import { Fragment } from 'react';

import { getFeaturedEvents, getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage({ filteredEvents, invalidFilter, numYear,
  numMonth }) {

  if (!filteredEvents) {
    return <p className='center'>Loading...</p>;
  }

  if (
    invalidFilter
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const filterData = context.params.slug;

  if (!filterData) {
    return null
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const invalidFilter =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12

  return {
    props: {
      filteredEvents,
      invalidFilter,
      numYear,
      numMonth
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents()
  const paths = allEvents.map(e => ({
    params: {
      slug: [new Date(e.date).getFullYear().toString(), new Date(e.date).getMonth().toString()]
    }
  }))

  console.log(paths)

  return {
    paths,
    fallback: true
  }
}

export default FilteredEventsPage;
