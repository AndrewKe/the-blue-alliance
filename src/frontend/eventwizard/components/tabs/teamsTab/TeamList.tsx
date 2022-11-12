import { Team } from "./TeamListTab";

const TeamList = ({ teams }: { teams?: Team[] }) => {
  return !teams || teams?.length === 0 ? (
    <p>No teams found</p>
  ) : (
    <div>
      <p>{teams.length} teams attending</p>
      <ul>
        {teams.map(({ nickname, team_number }) => (
          <li key={team_number}>
            Team {team_number} - <a href={`/team/${team_number}`}>{nickname}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
