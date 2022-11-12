import { useEventContext } from "../hooks/useSelectedEvent";
import { useAuthContext } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AuthTools() {
  const { eventKey: selectedEvent } = useEventContext();
  const { authSecret, authId, setAuth } = useAuthContext();

  const storeAuth = () => {
    if (!selectedEvent) {
      toast.error("You must enter an event key");
      return;
    }

    if (!authId || !authSecret) {
      toast.error("You must enter you auth ID and secret");
      return;
    }

    localStorage.setItem(
      `${selectedEvent}_auth`,
      JSON.stringify({ authId, authSecret })
    );
    toast.success("Auth Stored");
  };

  const loadAuth = () => {
    if (!selectedEvent) {
      toast.error("You must select an event");
      return;
    }

    const auth = localStorage.getItem(`${selectedEvent}_auth`);
    if (!auth) {
      toast.error(`No auth found for ${selectedEvent}`);
      return;
    }

    setAuth(JSON.parse(auth));
    toast.success("Auth Loaded");
  };

  return (
    <div className="form-group" id="auth-tools">
      <label className="col-sm-2 control-label" htmlFor="load_auth">
        Auth Tools
      </label>
      <div className="col-sm-10">
        <button
          type="button"
          className="btn btn-default m-r-5"
          id="load_auth"
          onClick={loadAuth}
        >
          Load Auth
        </button>
        <button
          type="button"
          className="btn btn-default"
          id="store_auth"
          onClick={storeAuth}
        >
          Store Auth
        </button>
      </div>
    </div>
  );
}
