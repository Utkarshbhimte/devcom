import { apiRequest } from "./util";

function submit(data) {
  return apiRequest("contact", "POST", data);
}

export default { submit };
