import EventSelector from "./EventSelector";
import AuthTools from "./AuthTools";
import AuthInput from "./AuthInput";
import { useEventContext } from "../hooks/useSelectedEvent";

const SetupFrame = () => {
  const { isManualEvent } = useEventContext();

  return (
    <div>
      <h2 id="setup">Setup</h2>
      <form className="form-horizontal" role="form">
        <EventSelector />
        {isManualEvent && (
          <>
            <AuthTools />
            <AuthInput />
          </>
        )}
      </form>
    </div>
  );
};

export default SetupFrame;
