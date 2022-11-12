import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { Team, useUpdateTeamsMutation } from "./TeamListTab";
import { toButtonState } from "../../../helpers";

const AddMultipleTeams = ({ selectedEvent }: { selectedEvent: string }) => {
  const [inputTeams, setInputTeams] = useState("");
  const updateTeamMutation = useUpdateTeamsMutation(selectedEvent);

  const addTeams = () => {
    const teams = [];
    const teamInput = inputTeams.trim().split("\n");
    for (let i = 0; inputTeams && i < teamInput.length; i++) {
      const teamNum = parseInt(teamInput[i], 10);
      if (!teamNum || isNaN(teamNum) || teamNum <= 0 || teamNum > 9999) {
        alert(`Invalid team ${teams[i]}`);
        return;
      }
      teams.push(`frc${teamNum}`);
    }

    updateTeamMutation.mutate(teams);
  };

  return (
    <div>
      <h4>Add Multiple Teams</h4>
      <p>
        Enter a list of team numbers, one per line. This will <em>overwrite</em>{" "}
        all existing teams for this event.
      </p>
      <textarea
        className="form-control m-b-5"
        value={inputTeams}
        onChange={(event) => setInputTeams(event.target.value)}
      />

      <button
        className={toButtonState(updateTeamMutation.status)}
        onClick={addTeams}
        disabled={!inputTeams}
      >
        Overwrite Teams
      </button>
    </div>
  );
};
export default AddMultipleTeams;
