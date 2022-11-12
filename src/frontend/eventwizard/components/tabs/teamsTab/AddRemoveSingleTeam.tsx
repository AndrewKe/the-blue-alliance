import React, { useState } from "react";
import { Team, useUpdateTeamsMutation } from "./TeamListTab";
import { toButtonState } from "../../../helpers";
import toast from "react-hot-toast";

const AddRemoveSingleTeam = ({
  teams,
  selectedEvent,
}: {
  teams?: Team[];
  selectedEvent: string;
}) => {
  const [selectedTeamKey, setSelectedTeamKey] = useState("");

  const teamKeys = teams?.map((t) => t.key);

  const addTeamMutation = useUpdateTeamsMutation(selectedEvent);
  const removeTeamMutation = useUpdateTeamsMutation(selectedEvent);
  const mutationOptions = {
    onSuccess: () => setSelectedTeamKey(""),
  };

  const addSingleTeam = () => {
    if (teamKeys.includes(selectedTeamKey)) {
      toast.error(
        `Team ${selectedTeamKey} is already attending ${selectedEvent}.\n Re-fetch the team list if you know this is wrong.`
      );
      return;
    }

    addTeamMutation.mutate([...teamKeys, selectedTeamKey], mutationOptions);
  };

  const removeSingleTeam = () => {
    if (!teamKeys.includes(selectedTeamKey)) {
      toast.error(
        `Team ${selectedTeamKey} is already not attending ${selectedEvent}.\n Re-fetch the team list if you know this is wrong.`
      );
      return;
    }

    removeTeamMutation.mutate(
      teamKeys.filter((key) => key !== selectedTeamKey),
      mutationOptions
    );
  };

  return (
    <div>
      <h4>Add/Remove Single Team</h4>
      <input
        type="text"
        className="form-control m-b-5"
        id="first_code"
        placeholder="Team #"
        value={selectedTeamKey.substring(3)}
        onChange={(event) =>
          setSelectedTeamKey(
            event.target.value ? `frc${event.target.value}` : ""
          )
        }
      />

      <button
        className={`${toButtonState(addTeamMutation.status)} m-r-5`}
        onClick={addSingleTeam}
        disabled={!selectedTeamKey}
      >
        Add Team
      </button>

      <button
        className={`${toButtonState(removeTeamMutation.status)}`}
        onClick={removeSingleTeam}
        disabled={!selectedTeamKey}
      >
        Remove Team
      </button>
    </div>
  );
};

export default AddRemoveSingleTeam;
