import { defineStore } from 'pinia'

export const useCountStore  = defineStore('count', {
    // 里面放置的是一个一个的方法，用于响应组件的中的动作
    actions: {
        increment(value: number) {
            this.sum += value
        }
    },
    // 真正存储数据的地方
    state: () => ({
        sum: 6,
        schaool: '家里蹲大学',
        address: '中国'
    }),
})