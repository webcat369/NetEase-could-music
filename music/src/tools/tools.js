// 生成随机数的方法
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
}
// 格式化歌曲时间
export const formatTime = (time) => {
  // 2.得到两个时间之间的差值(秒)
  const differSecond = time
  // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
  let day = Math.floor(differSecond / (60 * 60 * 24))
  day = day >= 10 ? day : '0' + day
  // 4.利用相差的总秒数 / 小时 % 24;
  let hour = Math.floor(differSecond / (60 * 60) % 24)
  hour = hour >= 10 ? hour : '0' + hour
  // 5.利用相差的总秒数 / 分钟 % 60;
  let minute = Math.floor(differSecond / 60 % 60)
  minute = minute >= 10 ? minute : '0' + minute
  // 6.利用相差的总秒数 % 秒数
  let second = Math.floor(differSecond % 60)
  second = second >= 10 ? second : '0' + second
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}
// 保存数据的localStorage方法
export const setLocalStorage = (key, value) => {
  // JSON.stringify()将一个 JavaScript 对象或值转换为 JSON 字符串
  // setItem保存数据到value
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 获取数据的localStorage方法
export const getLocalStorage = (key) => {
  // JSON.parse():用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
  // getItem从key中获取数据
  return JSON.parse(window.localStorage.getItem(key))
}
