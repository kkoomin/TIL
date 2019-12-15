import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}

// 'fetch' is not supported in the old browsers. So instead, use 'axios' which is popular HTTP request library.
// And 'axios' automatically returns json
// async function automatically returns a promise -> await
