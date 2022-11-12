import React, { createContext, useContext, useState } from "react";

interface EventType {
  eventKey: string;
  isManualEvent: boolean;
}

interface EventContextInterfaces extends EventType {
  setEvent: (event: EventType) => void;
}

const EventContext = createContext<EventContextInterfaces>(null);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<EventType>({
    eventKey: "2022casj",
    isManualEvent: false,
  });

  return (
    <EventContext.Provider
      value={{
        ...event,
        setEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
