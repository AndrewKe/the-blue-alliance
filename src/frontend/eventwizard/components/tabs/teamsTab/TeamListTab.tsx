import AddRemoveSingleTeam from "./AddRemoveSingleTeam";
import AttendingTeamList from "./AttendingTeamList";
import { useEventContext } from "../../../hooks/useSelectedEvent";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toButtonState } from "../../../helpers";
import AddMultipleTeams from "./AddMultipleTeams";
import toast from "react-hot-toast";
import AddTeamsFMSReport from "./AddTeamsFMSReport";

export interface Team {
  key: string;
  team_number: number;
  nickname: string;
}

export const useUpdateTeamsMutation = (selectedEvent: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamKeys: string[]) => {
      return axios.post(
        `/api/trusted/v1/event/${selectedEvent}/team_list/update`,
        teamKeys
      );
    },
    onError: toastError,
    onSuccess: (response, newTeams) => {
      toast.success("Team list updated");

      queryClient.setQueryData(["team_list", selectedEvent], (data: Team[]) => {
        const teamMap = Object.assign({}, ...data.map((x) => ({ [x.key]: x })));
        return newTeams
          .map((team) => {
            return {
              team_number: team.substring(3),
              key: team,
              nickname: team,
              ...teamMap[team],
            };
          })
          .sort((a: Team, b: Team) => a.team_number - b.team_number);
      });
    },
  });
};

const TeamListTab = () => {
  const { eventKey: selectedEvent } = useEventContext();

  const {
    data: teams,
    refetch,
    status,
    isFetching,
  } = useQuery(["event_team_list", selectedEvent], () =>
    axios
      .get(`/api/v3/event/${selectedEvent}/teams/simple`)
      .then((data) => data.data)
      .then((data) =>
        data.sort((a: Team, b: Team) => a.team_number - b.team_number)
      )
  );

  return (
    <div className="tab-pane" id="teams">
      <h3>Team List</h3>
      <div className="row">
        <div className="col-sm-6">
          <AddTeamsFMSReport selectedEvent={selectedEvent} />
          <hr />
          <AddRemoveSingleTeam teams={teams} selectedEvent={selectedEvent} />
          <hr />
          <AddMultipleTeams selectedEvent={selectedEvent} />
        </div>

        <div className="col-sm-6">
          <AttendingTeamList
            teams={teams}
            onFetchTeams={refetch}
            buttonStatus={toButtonState(isFetching ? "loading" : status)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamListTab;
