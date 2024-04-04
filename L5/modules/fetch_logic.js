import { loading_page } from "../main.js";

class Fetch {
  get = async(url) =>{
    loading_page.set_visibility(true)
    try {
      let resp = await fetch(url);
      let result = await resp.json();
      return result.response;
    } catch (error) {
      return 0;
    } finally{loading_page.set_visibility(false)}
  }
}

export const fetch_obj = new Fetch();