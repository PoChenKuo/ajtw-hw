const base = "https://www.googleapis.com/youtube/v3/";
const parseParam = param => {
  let paramStr = "";
  for (const str in param) {
    paramStr += `${str}=${param[str]}&`;
  }
  return paramStr + "key=AIzaSyCItmyq2SQ9uCIfpfIWd7zeFD8rZZeNwko";
};

const entry = {
  getListContent: param => {
    const url = base + "videos?part=contentDetails,snippet&";

    const target = url + parseParam(param);
    return new Promise((resolve, reject) => {
      fetch(target).then(data => {
        resolve(data.json());
      });
    });
  },
  getCategory: region => {
    const url = base + "videoCategories?part=snippet&";
  }
};

export const ytAPI = entry;
