import { useEventContext } from "../hooks/useSelectedEvent";
import { useAuthContext } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import axios from "axios";

export default function EventSelector() {
  const { eventKey, isManualEvent, setEvent } = useEventContext();
  const { setAuth } = useAuthContext();

  const { data: options, isLoading } = useQuery(["api_write_events"], () =>
    axios.get(`/_/account/apiwrite_events`).then((data) => [
      ...data.data,
      {
        value: "_other",
        label: "Other",
      },
    ])
  );

  const onEventSelected = ({ value }: { value: string }) => {
    setAuth(undefined);

    if (value === "_other") {
      setEvent({
        eventKey: "",
        isManualEvent: true,
      });
    } else {
      setEvent({
        eventKey: value,
        isManualEvent: false,
      });
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="event_key_select" className="col-sm-2 control-label">
        Select Event
      </label>
      <div className="col-sm-10">
        <Select
          name="selectEvent"
          placeholder={isLoading ? "Loading events..." : "Select an Event..."}
          isClearable={false}
          isSearchable={false}
          value={options?.find((option) => option.value === eventKey)}
          options={options}
          onChange={onEventSelected}
        />
        {isManualEvent && (
          <input
            type="text"
            className="form-control m-t-5"
            id="event_key"
            placeholder="Event Key"
            value={eventKey}
            onChange={(event) => {
              setEvent({ eventKey: event.target.value, isManualEvent: true });
            }}
          />
        )}
      </div>
    </div>
  );
}
