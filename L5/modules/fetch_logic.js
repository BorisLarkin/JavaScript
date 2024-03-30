class Fetch {
  get = async(url) =>{
    try {
      let resp = await fetch(url);
      let result = await resp.json();
      return result.response;
    } catch (error) {
      return 0;
    }
  }
}

export const fetch_obj = new Fetch();