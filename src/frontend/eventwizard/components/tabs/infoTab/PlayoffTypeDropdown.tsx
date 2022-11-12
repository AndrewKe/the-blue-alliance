import { EventInfo } from "./EventInfoTab";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PlayoffTypeDropdown = ({
  eventInfo,
  setType,
}: {
  eventInfo: EventInfo;
  setType: (code: number) => void;
}) => {
  const { data: options } = useQuery<any[]>(["playoff_types"], () =>
    axios.get(`/_/playoff_types`).then((data) => data.data)
  );

  return (
    <div className="form-group">
      <label htmlFor="selectType" className="col-sm-2 control-label">
        Playoff Type
      </label>
      <div className="col-sm-10 m-b-10">
        <Select
          name="selectType"
          placeholder="Choose playoff type..."
          isClearable={false}
          isSearchable={false}
          value={options?.find(
            (option) => option.value === eventInfo?.playoff_type
          )}
          options={options}
          onChange={(event) => setType(event.value)}
          isDisabled={eventInfo === null}
        />
      </div>
    </div>
  );
};

export default PlayoffTypeDropdown;
