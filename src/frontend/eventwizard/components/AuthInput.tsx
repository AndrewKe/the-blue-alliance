import { useAuthContext } from "../hooks/useAuth";

export default function AuthInput() {
  const { authId, authSecret, setAuth } = useAuthContext();

  return (
    <div id="auth-container">
      <div className="form-group">
        <label htmlFor="auth_id" className="col-sm-2 control-label">
          Auth Id
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="auth_id"
            placeholder="Auth ID"
            value={authId}
            onChange={(event) =>
              setAuth({ authId: event.target.value, authSecret })
            }
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="auth_secret" className="col-sm-2 control-label">
          Auth Secret
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="auth_secret"
            placeholder="Auth Secret"
            value={authSecret}
            onChange={(event) =>
              setAuth({ authSecret: event.target.value, authId })
            }
          />
        </div>
      </div>
    </div>
  );
}
