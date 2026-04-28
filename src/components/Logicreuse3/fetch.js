import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    data.value = null
    error.value = null

    // toValue() 如果参数是ref返回ref的值，如果参数是函数会调用函数返回值。否则返回参数本身
    fetch(toValue(url))
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));
  }

  // 监听url变化，变化时调用fetchData
  // 注意无限循环的问题
  watchEffect(() => {
    fetchData()
  })

  return { data, error };
}
