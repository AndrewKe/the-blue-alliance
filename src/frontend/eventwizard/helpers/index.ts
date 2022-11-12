import axios from "axios";
import toast from "react-hot-toast";

export function toButtonState(status: string) {
  if (status === "loading" || status === "fetching") {
    return "btn btn-warning";
  }

  if (status === "error") {
    return "btn btn-danger";
  }
  return "btn btn-info";
}

export function toastError(error: unknown) {
  toast.error(`Request Failed\n ${getErrorMessage(error)}`);
}

export function getErrorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? error.response.data.Error || JSON.stringify(error.response.data)
    : "Unknown error";
}

export function showModal(id: string) {
  eval(`$('#${id}').modal({backdrop: 'static'})`);
}

export function hideModal(id: string) {
  eval(`$('#${id}').modal('hide')`);
}
