class Fetch {
  get = async(url) =>{ //can be either findCourses or findCourseByID
    try {
      let resp = await fetch(url);
      let result = await resp.json();
      return result.response;
    } catch (error) {
      return 0;
    }
  }
  post = async(url, content) =>{ //Can only be AddCourse
    try {
      let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(content)
      });
      let result = await resp.json();
      return result.response;
    } catch (error) {
      return 0;
    }
  }
  delete = async(url, courseID) =>{
    try {
      let resp = await fetch(url, {
        method: 'DELETE',
      });
      let result = await resp.json();
      return result.response;
    } catch (error) {
      return 0;
    }
  }
}

export const fetch_obj = new Fetch();