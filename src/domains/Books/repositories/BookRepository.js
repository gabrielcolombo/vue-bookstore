import { Http } from "@/services";

const BASE_URL = "https://api.itbook.store/1.0";
const DEFAULT_PAGINATION = { page: 1, query: "mongodb" };

class BookRepository {
  static paginate(params = { ...DEFAULT_PAGINATION }) {
    const { query, page } = params;

    return Http.get(`${BASE_URL}/search/${query}/${page}`);
  }

  static fetchNewestReleases() {
    return Http.get(`${BASE_URL}/new`);
  }
}

export default BookRepository;
