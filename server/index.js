const axios = require("axios");

const urlArray = [
  {
    user: 1,
    url: "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
  },
  {
    user: 2,
    url: "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
  },
  {
    user: 3,
    url: "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json",
  },
];

export const getIt = async (user) => {
  let arr = [];
  let userId = "";
  let url = "";
  urlArray.forEach((e) => {
    if (e.user === user) {
      userId = e.user;
      url = e.url;
    }
  });

  let go = await axios.get(url).then((res) => {
    arr.push(res.data);
  });

  return arr;
};
