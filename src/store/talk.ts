import { defineStore } from "pinia";

export const useTalkStore = defineStore('talk', {
    state: () => ({
        talkList: [
            {
                id: '1',
                title: '你好，我是Trae1',
            },
            {
                id: '2',
                title: '你好，我是Trae2',
            }
        ]
    })
})