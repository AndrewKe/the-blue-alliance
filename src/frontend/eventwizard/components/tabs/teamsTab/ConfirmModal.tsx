export const ConfirmModal = ({
  title,
  id,
  body,
  onConfirm,
  buttonStatus = "btn-info",
}: {
  title: string;
  id: string;
  body: JSX.Element;
  onConfirm: () => void;
  buttonStatus: string;
}) => (
  <div className="modal fade" role="dialog" id={id} data-backdrop="static">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${buttonStatus}`}
            onClick={onConfirm}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);
