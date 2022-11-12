import React, { useEffect, useState } from "react";

import PlayoffTypeDropdown from "./PlayoffTypeDropdown";
import SyncCodeInput from "./SyncCodeInput";
import AddRemoveWebcast from "./AddRemoveWebcast";
import { useEventContext } from "../../../hooks/useSelectedEvent";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddRemoveTeamMap from "./AddRemoveTeamMap";
import toast from "react-hot-toast";
import { toastError, toButtonState } from "../../../helpers";

export interface Webcast {
  type: string;
  channel: string;
  file?: string;
  url?: string;
}

export interface EventInfo {
  key: string;
  playoff_type?: number;
  first_event_code?: string;
  webcasts?: Webcast[];
  remap_teams?: Record<string, string>;
}

export default function EventInfoTab() {
  const { eventKey } = useEventContext();

  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);

  const { isLoading, error } = useQuery(
    ["event_info", eventKey],
    () =>
      axios
        .get(`/api/v3/event/${eventKey}`)
        .then((data) => data.data)
        .then((data) => ({
          ...data,
          remap_teams: {
            frc9999: "frc1234B",
          },
        })),
    {
      onSuccess: (data) => setEventInfo(data),
      onError: () => setEventInfo(null),
    }
  );

  const submitMutation = useMutation({
    mutationFn: () =>
      axios.post(`/api/trusted/v1/event/${eventKey}/info/update`, eventInfo),
    onSuccess: () => toast.success("Successfully published changes"),
    onError: toastError,
  });

  return (
    <div className="tab-pane" id="info">
      <h3>Event Info</h3>
      {isLoading && <p>Loading event info...</p>}
      {error && (
        <div className="alert alert-danger">
          Failed to load event data: {(error as any)?.response?.data?.Error}
        </div>
      )}

      <div className="row">
        {/*{JSON.stringify(eventInfo)}*/}

        <PlayoffTypeDropdown
          eventInfo={eventInfo}
          setType={(playoff_type) => {
            setEventInfo({
              ...eventInfo,
              playoff_type,
            });
          }}
        />

        <SyncCodeInput
          eventInfo={eventInfo}
          setSyncCode={(first_event_code) => {
            setEventInfo({
              ...eventInfo,
              first_event_code,
            });
          }}
        />

        <AddRemoveWebcast
          webcasts={eventInfo?.webcasts}
          addWebcast={(webcastUrl) => {
            setEventInfo({
              ...eventInfo,
              webcasts: [
                ...eventInfo.webcasts,
                {
                  type: "",
                  channel: "",
                  url: webcastUrl,
                },
              ],
            });
          }}
          removeWebcast={(toRemove) => {
            setEventInfo({
              ...eventInfo,
              webcasts: eventInfo.webcasts.filter((w) => w !== toRemove),
            });
          }}
        />

        <AddRemoveTeamMap
          remapTeams={eventInfo?.remap_teams}
          addTeamMap={(from, to) =>
            setEventInfo({
              ...eventInfo,
              remap_teams: {
                ...eventInfo.remap_teams,
                [`frc${from}`]: `frc${to}`,
              },
            })
          }
          removeTeamMap={(keyToRemove) => {
            const nextEventInfo = { ...eventInfo };
            delete nextEventInfo.remap_teams[keyToRemove];
            setEventInfo(nextEventInfo);
          }}
        />
      </div>

      <button
        className={`${toButtonState(submitMutation.status)} m-t-10`}
        onClick={() => submitMutation.mutate()}
        disabled={eventInfo === null}
      >
        Publish Changes
      </button>
    </div>
  );
}
