const base = "https://www.googleapis.com/youtube/v3/";
const parseParam = param => {
  let paramStr = "";
  for (const str in param) {
    paramStr += `${str}=${param[str]}&`;
  }
  return paramStr + "key=AIzaSyCItmyq2SQ9uCIfpfIWd7zeFD8rZZeNwko";
};

const execute = (target, formater = _e => _e) => {
  return new Promise((resolve, reject) => {
    fetch(target)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response;
        }
      })

      .then(data => {
        resolve(formater(data));
      })
      .catch(e => {
        alert("some error occurred");
      });
  });
};

const entry = {
  getListContent: param => {
    const url = base + "videos?part=contentDetails,snippet&";
    return execute(url + parseParam(param));
  },
  getCategory: param => {
    const url = base + "videoCategories?part=snippet&";
    const formater = data => {
      const arr = data.items;
      return arr.map(e => {
        return {
          id: e.id,
          name: e.snippet && e.snippet.title
        };
      });
    };
    return execute(url + parseParam(param), formater);
  }
};

export const ytAPI = entry;
