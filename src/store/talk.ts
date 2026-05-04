import axios from "axios";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";

// 组合式写法
// export const useTalkStore = defineStore("talk", {
//   actions: {
//     async getTalk() {
//       const result = await axios.get(
//         "https://api.apiopen.top/api/articles?page=1&size=10",
//       );
//       const randomNum = Math.floor(Math.random() * 10);
//       const obj = {
//         id: nanoid(),
//         title: result.data.data[randomNum].summary,
//       };
//       this.talkList.push(obj);
//     },
//   },
//   state: () => ({
//     talkList:
//       // 取出来talk，或者给空
//       JSON.parse(localStorage.getItem("talkList") || "[]"),
//   }),
// });

// 选项式写法
import { compile, ref } from "vue";

export const useTalkStore = defineStore("talk", () => {
  // 这里就是state
  const talkList = ref(JSON.parse(localStorage.getItem("talkList") || "[]"));

  async function getTalk() {
    const result = await axios.get(
      "https://api.apiopen.top/api/articles?page=1&size=10",
    );
    const randomNum = Math.floor(Math.random() * 10);
    const obj = {
      id: nanoid(),
      title: result.data.data[randomNum].summary,
    };
    talkList.value.push(obj);
  }

  return {
    talkList,
    getTalk,
  };
});
