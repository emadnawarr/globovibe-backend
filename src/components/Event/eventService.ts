interface Event {}

const events: Event[] = [];

const getEvents = (): Event[] => {
  return events;
};

export default { getEvents };
