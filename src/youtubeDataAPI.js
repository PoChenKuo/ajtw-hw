const url =
  "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&key=AIzaSyCItmyq2SQ9uCIfpfIWd7zeFD8rZZeNwko&";
const parseParam = param => {
  let paramStr = "";
  for (const str in param) {
    paramStr += `${str}=${param[str]}&`;
  }
  return paramStr;
};

const entry = {
  getListContent: param => {
    const target = url + parseParam(param);
    return fetch(target);
  }
};

export const ytAPI = entry;
