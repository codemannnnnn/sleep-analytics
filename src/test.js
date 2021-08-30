// const axios = require("axios");

const moment = require("moment");

// const stages = [
//   {
//     stage: "awake",
//     duration: 780,
//   },
//   {
//     stage: "light",
//     duration: 5820,
//   },
//   {
//     stage: "deep",
//     duration: 1980,
//   },
//   {
//     stage: "light",
//     duration: 2340,
//   },
//   {
//     stage: "deep",
//     duration: 2460,
//   },
// ];

// // let stages = [];

// // let getData = async () => {
// //   let x = [];
// //   let go = await axios
// //     .get(
// //       "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json"
// //     )
// //     .then((e) => {
// //       console.log(e.data.intervals[0].stages);

// //       e.data.intervals[0].stages.forEach((j) => {
// //         stages.push({
// //           stage: j.stage,
// //           duration: j.duration,
// //         });
// //       });
// //     });
// // };

// // getData();

// let arr2 = [];
// let run2 = [];
// let g2 = 0;

// console.log(JSON.stringify({ stages }));
// stages.forEach((e, idx) => {
//   let newTime = e.duration / 60;

//   console.log(newTime);
//   if (newTime > 45) {
//     arr2.push({
//       stage: e.stage,
//       duration: e.duration,
//     });
//     run2.push(idx + g2);
//     g2++;
//   }
// });
// console.log({ run2 });
// arr2.forEach((e, idx) => {
//   console.log({ e });
//   stages.splice(run2[idx], 0, e)[1];
// });

// let a = [];
// let b = [];
// stages.forEach((e) => {
//   a.push(e.stage);
//   b.push(e.duration);
// });
// console.log({ a });
// console.log({ b });

// let c = [];
// b.forEach((e) => {
//   let newTime = e / 60;
//   c.push(newTime);
// });

// console.log({ c });

// // newA = ["awake", "light", "deep", "light", "deep"];
// // newB = ["awake", "light", "deep", "light", "deep"];
// // run3 = [1];
// // console.log({ newA });

// // newA.forEach((e, idx) => {
// //   newA.splice(run3[idx], 0, e);
// // });

// // console.log({ newA });

// // let arr = [7, 1, 2, 5, 3, 9, 11, 4, 6, 12, 7, 1];

// // let run = [];
// // let g = 0;

// // arr.forEach((e, idx) => {
// //   if (e > 8) {
// //     arr2.push(e);
// //     run.push(idx + g);
// //     g++;
// //   }
// // });

// // arr2.forEach((e, idx) => {
// //   arr.splice(run[idx], 0, e);
// // });
// // console.log({ arr });

let tnt = [
  ["2017-03-08T11:40:00.000Z", 1],
  ["2017-03-08T11:56:00.000Z", 1],
  ["2017-03-08T11:58:00.000Z", 1],
  ["2017-03-08T12:07:00.000Z", 1],
  ["2017-03-08T12:15:00.000Z", 1],
  ["2017-03-08T12:18:00.000Z", 1],
  ["2017-03-08T12:41:00.000Z", 1],
  ["2017-03-08T13:00:00.000Z", 1],
  ["2017-03-08T13:12:00.000Z", 1],
  ["2017-03-08T13:33:00.000Z", 1],
];

let count = 0;
let arr = [];

tnt.forEach((e, idx) => {
  let time = moment(e[0], "YYYY-MM-DD-hh:mm:ss").format("hh:mm");
  arr.push(time);
});

console.log(arr);

// arr.forEach((e, idx) => {

// })
