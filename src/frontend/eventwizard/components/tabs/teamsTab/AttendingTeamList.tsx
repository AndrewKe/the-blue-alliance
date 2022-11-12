import { Team } from "./TeamListTab";
import TeamList from "./TeamList";

const AttendingTeamList = ({
  teams,
  onFetchTeams,
  buttonStatus,
}: {
  teams?: Team[];
  onFetchTeams: () => void;
  buttonStatus: string;
}) => {
  return (
    <div>
      <h4>Currently Attending Teams</h4>
      <button
        className={`btn m-b-5 ${buttonStatus}`}
        onClick={onFetchTeams}
        disabled={false}
      >
        <span className="glyphicon glyphicon-refresh m-r-5" /> Fetch Teams
      </button>

      <TeamList teams={teams} />
    </div>
  );
};

export default AttendingTeamList;
