import FileInput from "../FileInput";
import * as XLSX from "xlsx";
import { cleanTeamNum, playoffTypeMatchAndSet } from "../../helpers/fms";
import { useState } from "react";
import { useEventContext } from "../../hooks/useSelectedEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { toastError, toButtonState } from "../../helpers";
import { useMutation } from "@tanstack/react-query";

export const FMSMatchImportTab = () => {
  const [tableRows, setTableRows] = useState<any[]>();
  const [requestBody, setRequestBody] = useState<any[]>();

  const { eventKey } = useEventContext();

  const parseReport = (sheet: XLSX.WorkSheet) => {
    const matches = XLSX.utils.sheet_to_json(sheet, { range: 2 });

    const request_body = [];
    const table_rows = [];

    let last_match_type: any = null;

    for (let i = 0; i < matches.length; i++) {
      const match: any = matches[i];

      // check for invalid match
      if (!match["Time"]) {
        continue;
      }

      let compLevel, setNumber, matchNumber, matchKey;

      if (match["Match"].includes("Qualification")) {
        matchNumber = parseInt(match["Match"].split(" ")[1]);
        compLevel = "qm";
        setNumber = 1;
        matchKey = "qm" + matchNumber;
      } else {
        const levelSetAndMatch = playoffTypeMatchAndSet(
          false,
          match["Match"],
          last_match_type
        );
        compLevel = levelSetAndMatch[0];
        setNumber = levelSetAndMatch[1];
        matchNumber = levelSetAndMatch[2];
        matchKey = `${compLevel}${setNumber}m${matchNumber}`;
      }

      last_match_type = compLevel;

      table_rows.push([
        match["Time"],
        match["Match"],
        eventKey + "_" + matchKey,
        cleanTeamNum(match["Red 1"]),
        cleanTeamNum(match["Red 2"]),
        cleanTeamNum(match["Red 3"]),
        cleanTeamNum(match["Blue 1"]),
        cleanTeamNum(match["Blue 2"]),
        cleanTeamNum(match["Blue 3"]),
        match["Red Score"],
        match["Blue Score"],
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
            score: parseInt(match["Red Score"]),
          },
          blue: {
            teams: [
              "frc" + cleanTeamNum(match["Blue 1"]),
              "frc" + cleanTeamNum(match["Blue 2"]),
              "frc" + cleanTeamNum(match["Blue 3"]),
            ],
            score: parseInt(match["Blue Score"]),
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
    <div className="tab-pane active" id="results">
      <h3>Upload Match Results</h3>
      <p>
        Lets you upload a FMS Match Results report. Note that this will overwite
        data that currently exists for these matches.
      </p>

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
            <span className="glyphicon glyphicon-refresh" /> Post Results
          </button>
          <table className="table table-striped m-t-10">
            <tbody>
              <tr>
                <th>Time</th>
                <th>Match</th>
                <th>TBA Key</th>
                <th>Red 1</th>
                <th>Red 2</th>
                <th>Red 3</th>
                <th>Blue 1</th>
                <th>Blue 2</th>
                <th>Blue 3</th>
                <th>Red Score</th>
                <th>Blue Score</th>
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
