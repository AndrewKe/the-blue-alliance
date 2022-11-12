import React, { useRef, useState } from "react";
import { Webcast } from "./EventInfoTab";

const AddRemoveWebcast = ({
  webcasts,
  removeWebcast,
  addWebcast,
}: {
  webcasts?: Webcast[];
  removeWebcast: (webcast: Webcast) => void;
  addWebcast: (url: string) => void;
}) => {
  const [newWebcastURL, setNewWebcastURL] = useState("");

  return (
    <div className="form-group">
      <label htmlFor="webcast_list" className="col-sm-2 control-label">
        Webcasts
      </label>
      <div className="col-sm-10 m-b-10" id="webcast_list">
        {webcasts?.length > 0 ? (
          <div>
            <ul>
              {webcasts.map((webcast, index) => (
                <li key={JSON.stringify(webcast)}>
                  <p>
                    {webcast.url
                      ? webcast.url
                      : `${webcast.type} - ${webcast.channel}`}{" "}
                    &nbsp;
                    <button
                      className="btn btn-danger "
                      onClick={() => removeWebcast(webcast)}
                    >
                      Remove
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No webcasts found</p>
        )}
      </div>

      <div className="col-sm-2" />

      <div className="col-sm-4">
        <input
          type="text"
          className="form-control"
          id="webcast_url"
          placeholder="https://youtu.be/abc123"
          value={newWebcastURL}
          onChange={(event) => setNewWebcastURL(event.target.value)}
        />
      </div>

      <button
        className="btn btn-info"
        onClick={() => {
          addWebcast(newWebcastURL);
          setNewWebcastURL("");
        }}
        disabled={!newWebcastURL}
      >
        Add Webcast
      </button>
    </div>
  );
};

export default AddRemoveWebcast;
