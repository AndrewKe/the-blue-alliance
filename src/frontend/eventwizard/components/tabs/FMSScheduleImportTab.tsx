import FileInput from "../FileInput";
import * as XLSX from "xlsx";
import {
  cleanTeamNum,
  playoffTypeFromNumber,
  playoffMatchAndSet,
} from "../../helpers/fms";
import { useState } from "react";
import { useEventContext } from "../../hooks/useSelectedEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { toastError, toButtonState } from "../../helpers";
import { useMutation } from "@tanstack/react-query";
import RadioInput from "../RadioInput";

export const FMSScheduleImportTab = () => {
  const [tableRows, setTableRows] = useState<any[]>();
  const [requestBody, setRequestBody] = useState<any[]>();
  const [compLevelFilter, setCompLevelFilter] = useState<string>();

  const { eventKey } = useEventContext();

  const parseReport = (sheet: XLSX.WorkSheet) => {
    const matches = XLSX.utils.sheet_to_json(sheet, { range: 4 });

    const request_body = [];
    const table_rows = [];

    console.log(matches);

    for (let i = 0; i < matches.length; i++) {
      let match: any = matches[i];

      // check for invalid match
      if (!match["Description"] || !match["Red 1"]) {
        continue;
      }

      let compLevel, setNumber, matchNumber, rawMatchNumber, matchKey;
      let has_octo = false;

      if (match["Match"]) {
        rawMatchNumber = parseInt(match["Match"]);
      } else if (match["Description"].indexOf("#") >= 0) {
        rawMatchNumber = parseInt(match["Description"].split("#")[1]);
      } else {
        rawMatchNumber = parseInt(match["Description"].split(" ")[1]);
      }
      if (
        !match.hasOwnProperty("Description") ||
        match["Description"].indexOf("Qualification") == 0
      ) {
        matchNumber = parseInt(match["Description"].split(" ")[1]);
        compLevel = "qm";
        setNumber = 1;
        matchKey = "qm" + matchNumber;
      } else {
        compLevel = playoffTypeFromNumber(rawMatchNumber, has_octo);
        let setAndMatch = playoffMatchAndSet(rawMatchNumber, has_octo);
        setNumber = setAndMatch[0];
        matchNumber = setAndMatch[1];
        matchKey = compLevel + setNumber + "m" + matchNumber;
      }

      /* Ignore matches the user doesn't want */
      if (compLevelFilter != "all" && compLevelFilter != compLevel) {
        continue;
      }

      table_rows.push([
        match["Time"],
        match["Description"],
        rawMatchNumber,
        eventKey + "_" + matchKey,
        cleanTeamNum(match["Blue 1"]),
        cleanTeamNum(match["Blue 2"]),
        cleanTeamNum(match["Blue 3"]),
        cleanTeamNum(match["Red 1"]),
        cleanTeamNum(match["Red 2"]),
        cleanTeamNum(match["Red 3"]),
      ]);

      // make json dict
      request_body.push({
        comp_level: compLevel,
        set_number: setNumber,
        match_number: matchNumber,
        alliances: {
          red: {
            teams: [
              "frc" + cleanTeamNum(match["Red 1"]),
              "frc" + cleanTeamNum(match["Red 2"]),
              "frc" + cleanTeamNum(match["Red 3"]),
            ],
            score: null,
          },
          blue: {
            teams: [
              "frc" + cleanTeamNum(match["Blue 1"]),
              "frc" + cleanTeamNum(match["Blue 2"]),
              "frc" + cleanTeamNum(match["Blue 3"]),
            ],
            score: null,
          },
        },
        time_string: match["Time"],
      });
    }

    if (request_body.length === 0) {
      toast.error("No matches found in the file.");
      return;
    }

    setRequestBody(request_body);
    setTableRows(table_rows);
  };

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        `/api/trusted/v1/event/${eventKey}/matches/update`,
        requestBody
      ),
    onSuccess: () => toast.success("Updated matches"),
    onError: toastError,
  });

  return (
    <div className="tab-pane active" id="schedule">
      <h3>Import Schedule</h3>
      <p>
        Allows you to import matches via FMS report. Note that this will
        overwrite all data that currently exists for these matches. If you are
        running a Playoff Tournament and need to import only a certain level of
        matches (e.g. only import Semifinals so Quarterfinals don't get
        overwritten), select the level below prior to selecting a file.
      </p>

      <label htmlFor="alliance-size">Comp Level to Import</label>
      <RadioInput
        options={["all", "qf", "sf", "f"]}
        labels={["All", "Quarterfinals", "Semifinals", "Finals"]}
        value={compLevelFilter}
        onChange={(event) => {
          setCompLevelFilter(event.target.value);
        }}
      />

      <label htmlFor="results_file">Report File</label>
      <FileInput onChange={parseReport} clearInput={true} />

      {tableRows && (
        <>
          <hr />
          <h5>Loaded {tableRows.length} matches</h5>
          <button
            className={toButtonState(mutation.status)}
            onClick={() => mutation.mutate()}
          >
            <span className="glyphicon glyphicon-refresh" /> Post Schedule
          </button>
          <table className="table table-striped m-t-10">
            <tbody>
              <tr>
                <th>Time</th>
                <th>Description</th>
                <th>Match</th>
                <th>TBA Key</th>
                <th>Blue 1</th>
                <th>Blue 2</th>
                <th>Blue 3</th>
                <th>Red 1</th>
                <th>Red 2</th>
                <th>Red 3</th>
              </tr>
              {tableRows.map((match) => (
                <tr>
                  {match.map((td: any) => (
                    <td>{td}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
