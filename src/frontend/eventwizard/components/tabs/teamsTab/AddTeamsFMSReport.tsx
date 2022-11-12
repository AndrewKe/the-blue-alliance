import React, { useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { ConfirmModal } from "./ConfirmModal";
import { hideModal, showModal, toButtonState } from "../../../helpers";
import { Team, useUpdateTeamsMutation } from "./TeamListTab";
import TeamList from "./TeamList";
import FileInput from "../../FileInput";

const AddTeamsFMSReport = ({ selectedEvent }: { selectedEvent: string }) => {
  const [stagingTeams, setStagingTeams] = useState<Team[]>();

  const parseFMSReport = (sheet: XLSX.WorkSheet) => {
    // parse the excel to array of matches
    // headers start on 2nd row
    const teamsInFile = XLSX.utils.sheet_to_json(sheet, { range: 3 });

    const teams = [];
    for (let i = 0; i < teamsInFile.length; i++) {
      const team: any = teamsInFile[i];

      // check for invalid row
      if (!team["#"]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const teamNum = parseInt(team["#"], 10);
      if (!teamNum || isNaN(teamNum) || teamNum <= 0) {
        toast.error(`Invalid team number ${teamNum}`);
        return;
      }
      teams.push({
        key: `frc${teamNum}`,
        team_number: teamNum,
        nickname: team["Short Name"],
      });
    }

    if (teams.length === 0) {
      toast.error(
        "No teams found in the file. Try opening the report in Excel and overwriting it using File->Save As"
      );
      return;
    }

    setStagingTeams(teams);
    showModal("teams-modal");
  };

  const updateTeamsMutation = useUpdateTeamsMutation(selectedEvent);

  return (
    <div>
      <h4>Import FMS Report</h4>

      <ConfirmModal
        id="teams-modal"
        title="Confirm Teams"
        body={<TeamList teams={stagingTeams} />}
        buttonStatus={toButtonState(updateTeamsMutation.status)}
        onConfirm={() => {
          updateTeamsMutation.mutate(
            stagingTeams.map((t) => t.key),
            {
              onSuccess: () => hideModal("teams-modal"),
            }
          );
        }}
      />

      <p>
        This will <em>overwrite</em> all existing teams for this event.
      </p>

      <FileInput onChange={parseFMSReport} clearInput={true} />
    </div>
  );
};

export default AddTeamsFMSReport;
