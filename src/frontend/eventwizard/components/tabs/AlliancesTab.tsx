import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEventContext } from "../../hooks/useSelectedEvent";
import toast from "react-hot-toast";
import { toastError, toButtonState } from "../../helpers";
import RadioInput from "../RadioInput";

const range = (count: number) => [...Array(count).keys()].map((i) => i + 1);

function matrix(n: number, m: number) {
  return Array.from(
    {
      length: n,
    },
    () => new Array(m).fill("")
  );
}

export const AlliancesTab = () => {
  const { eventKey } = useEventContext();

  const [numAlliances, setNumAlliances] = useState<number>(3);
  const [alliances, setAlliances] = useState<string[][]>(
    matrix(8, numAlliances)
  );

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        `/api/trusted/v1/event/${eventKey}/alliance_selections/update`,
        alliances.map((alliance) =>
          alliance.map((team) => team && `frc${team}`).filter(Boolean)
        )
      ),
    onSuccess: () => toast.success("Updated alliances"),
    onError: toastError,
  });

  return (
    <div className="tab-pane" id="alliances">
      <h3>Alliance Selection</h3>
      <p>
        Input team numbers for event Alliance Selections. This will overwrite
        existing alliances.
      </p>

      <label htmlFor="alliance-size">Number of teams per alliance</label>

      <RadioInput
        options={[2, 3, 4]}
        value={numAlliances}
        onChange={(event) => {
          setNumAlliances(parseInt(event.target.value));
          setAlliances(matrix(8, parseInt(event.target.value)));
        }}
      />

      <button
        className={`${toButtonState(mutation.status)} m-b-10`}
        onClick={() => {
          mutation.mutate();
        }}
      >
        <span className="glyphicon glyphicon-refresh" /> Post Alliances
      </button>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Alliance</th>
            <th>Captain</th>
            {range(numAlliances - 1).map((i) => (
              <th>Pick {i}</th>
            ))}
          </tr>
          {range(8).map((i) => (
            <tr key={i}>
              <td>Alliance {i}</td>
              {range(numAlliances).map((j) => {
                return (
                  <td key={j}>
                    <input
                      placeholder={j === 1 ? `Captain ${i}` : `Pick ${i}-${j}`}
                      value={alliances?.[i - 1]?.[j - 1]}
                      onChange={(event) => {
                        let copy = [...alliances];
                        copy[i - 1][j - 1] = event.target.value;
                        setAlliances(copy);
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
