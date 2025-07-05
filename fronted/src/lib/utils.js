export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("zh-CN", {
    hour: "2-digit",    // 两位数小时（00-23）
    minute: "2-digit",  // 两位数分钟（00-59）
    hour12: false       // 强制24小时制（可不写，默认就是 false）
  });
}