class Fetch {
  get = async (url) => {
    try {
      const response = await fetch(url, 'POST');
      const result = response.json();
      return result;
    } catch (error) {
      return 0;
    }
  }
}

export const fetch_obj = new Fetch();