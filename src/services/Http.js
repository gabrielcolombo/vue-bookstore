import axios from "axios";
import { HttpResponse } from "@/utils";

class Http {
  static request(method, url, data = {}, headers = {}) {
    return axios({
      url,
      method,
      data: JSON.stringify(data),
    }).then(HttpResponse.handle);
  }

  static get(url, data) {
    return Http.request("GET", url, data);
  }

  static post(url, data) {
    return Http.request("POST", url, data);
  }

  static put(url, data) {
    return Http.request("PUT", url, data);
  }

  static delete(url, data) {
    return Http.request("DELETE", url, data);
  }
}

export default Http;
