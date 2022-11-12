import React, { useState } from "react";

const isValidTeam = (team?: string) => {
  const match = team?.match(/\d+[b-zB-Z]?/);
  return match && match[0] === team;
};

const AddRemoveTeamMap = ({
  remapTeams = {},
  addTeamMap,
  removeTeamMap,
}: {
  remapTeams?: Record<string, string>;
  addTeamMap: (from: string, to: string) => void;
  removeTeamMap: (from: string) => void;
}) => {
  const remaps = Object.entries(remapTeams);

  const [fromTeam, setFromTeam] = useState<string>();
  const [toTeam, setToTeam] = useState<string>();

  const error =
    (fromTeam || toTeam) && (!isValidTeam(fromTeam) || !isValidTeam(toTeam));

  return (
    <div className="form-group">
      <label htmlFor="team_mappings_list" className="col-sm-2 control-label">
        Team Mappings
        <br />
        <small>Note: Removing a mapping will not unmap existing data!</small>
      </label>
      <div className="col-sm-10" id="team_mappings_list">
        {remaps.length > 0 && (
          <div>
            <p>{remaps.length} team mappings found</p>

            <ul>
              {remaps.map(([fromTeamKey, toTeamKey]) => (
                <li key={fromTeamKey}>
                  <p>
                    {fromTeamKey.substring(3)}{" "}
                    <span
                      className="glyphicon glyphicon-arrow-right"
                      aria-hidden="true"
                    />{" "}
                    {toTeamKey.substring(3)} &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => removeTeamMap(fromTeamKey)}
                    >
                      Remove
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={error ? "input-group has-error" : "input-group"}>
          <input
            className="form-control"
            type="text"
            placeholder="9254"
            // disabled={eventInfo === null}
            onChange={(event) => setFromTeam(event.target.value)}
            value={fromTeam}
          />
          <span className="input-group-addon">
            <span
              className="glyphicon glyphicon-arrow-right"
              aria-hidden="true"
            />
          </span>
          <input
            className="form-control"
            type="text"
            placeholder="254B"
            // disabled={eventInfo === null}
            onChange={(event) => setToTeam(event.target.value)}
            value={toTeam}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-info"
              onClick={() => {
                addTeamMap(fromTeam, toTeam);
                setToTeam("");
                setFromTeam("");
              }}
              disabled={!fromTeam || !toTeam || error}
            >
              Add Mapping
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveTeamMap;
