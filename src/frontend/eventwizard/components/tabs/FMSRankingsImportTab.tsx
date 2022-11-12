import FileInput from "../FileInput";
import * as XLSX from "xlsx";
import { useState } from "react";
import { useEventContext } from "../../hooks/useSelectedEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { toastError, toButtonState } from "../../helpers";
import { useMutation } from "@tanstack/react-query";
import { string } from "prop-types";

let headers = [
  "Rank",
  "Team",
  "RS",
  "Match Pts",
  "Endgame Pts",
  "Taxi + Auto Cargo",
  "W-L-T",
  "DQ",
  "Played",
];

let breakdowns = ["RS", "Match Pts", "Endgame Pts", "Taxi + Auto Cargo"];

export const FMSRankingsImportTab = () => {
  const [tableRows, setTableRows] = useState<any[]>();
  const [requestBody, setRequestBody] = useState<any[]>();

  const { eventKey } = useEventContext();

  const parseReport = (sheet: XLSX.WorkSheet) => {
    const rankings = XLSX.utils.sheet_to_json(sheet, { range: 4 });

    let request_body: any = {};
    let table_rows = [];

    let is_num = [true, true, true, true];

    request_body["breakdowns"] = breakdowns;
    request_body["rankings"] = [];

    for (let i = 0; i < rankings.length; i++) {
      let rank: any = rankings[i];

      // check for invalid row
      if (!rank["Rank"] || isNaN(rank["Rank"])) {
        continue;
      }

      table_rows.push(headers.map((header) => rank[header]));

      let breakdown: any = {};
      breakdown["team_key"] = "frc" + rank["Team"];
      breakdown["rank"] = parseInt(rank["Rank"]);
      breakdown["played"] = parseInt(rank["Played"]);
      breakdown["dqs"] = parseInt(rank["DQ"]);

      try {
        const [w, l, t] = rank["W-L-T"].split("-");
        breakdown["wins"] = parseInt(w);
        breakdown["losses"] = parseInt(l);
        breakdown["ties"] = parseInt(t);
      } catch {
        // pass
      }

      for (let j = 0; j < breakdowns.length; j++) {
        let val = rank[breakdowns[j]];

        breakdown[breakdowns[j]] = is_num[j]
          ? Number(val.toString().replace(",", ""))
          : val;
      }
      request_body["rankings"].push(breakdown);
    }

    if (request_body.length === 0) {
      toast.error("No rankings found in the file.");
      return;
    }

    setRequestBody(request_body);
    setTableRows(table_rows);
  };

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        `/api/trusted/v1/event/${eventKey}/rankings/update`,
        requestBody
      ),
    onSuccess: () => toast.success("Updated rankings"),
    onError: toastError,
  });

  return (
    <div className="tab-pane active" id="rankings">
      <h3>Upload Rankings</h3>
      <p>
        Upload event rankings from FMS report. This will overwrite current
        rankings for that event.
      </p>

      <label htmlFor="results_file">Report File</label>
      <FileInput onChange={parseReport} clearInput={true} />

      {tableRows && (
        <>
          <hr />
          <h5>Loaded {tableRows.length} teams</h5>
          <button
            className={toButtonState(mutation.status)}
            onClick={() => mutation.mutate()}
          >
            <span className="glyphicon glyphicon-refresh" /> Post Rankings
          </button>
          <table className="table table-striped m-t-10">
            <tbody>
              <tr>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
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
