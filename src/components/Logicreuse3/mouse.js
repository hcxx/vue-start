/** @returns {{x: import("vue").Ref<number>, y: import("vue").Ref<number>}} */
import { onMounted, onUnmounted, ref } from "vue";

export function useMouse() {
  /* 有状态监听鼠标位置 */
  const x = ref(0);
  const y = ref(0);
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  // 通过返回值暴露所管理的状态
  return { x, y }
}
