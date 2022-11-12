import { EventInfo } from "./EventInfoTab";

const SyncCodeInput = ({
  eventInfo,
  setSyncCode,
}: {
  eventInfo: EventInfo;
  setSyncCode: (code: string) => void;
}) => (
  <div className="form-group m-b-10">
    <label htmlFor="first_code" className="col-sm-2 control-label">
      FIRST Sync Code
    </label>
    <div className="col-sm-10 m-b-10">
      <input
        type="text"
        className="form-control"
        id="first_code"
        placeholder="IRI"
        value={eventInfo?.first_event_code || ""}
        disabled={eventInfo === null}
        onChange={(event) => setSyncCode(event.target.value)}
      />
    </div>
  </div>
);

export default SyncCodeInput;
