// import axios from "axios";
// import recoil, { atom, selector } from "recoil";

// export const name = atom({
//   key: "myName",
//   default: "this is the data you need homie.",
// });

// export const userData1 = selector({
//   key: "userData1",
//   get: async () => {
//     let url =
//       "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json";
//     let arr = [];
//     try {
//       let grab = await axios.get(url).then((res) => {
//         arr.push(res.data.intervals);
//       });
//       return arr;
//     } catch (err) {
//       console.log(err);
//     }
//   },
// });

// export const getAtom = atom({
//   ket: "getAtom",
//   default: "dddd",
// });

// export const setItem = selector({
//   key: "newItemmmm",
//   get: ({ get }) => {},
// });
