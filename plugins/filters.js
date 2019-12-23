import Vue from 'vue'

export const formatDate = (timestamp, format) => {
  const date = new Date(timestamp)
  const padLeftZero = function (str) {
    return ('00' + str).substring(str.length);
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + '';
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return format;
};

const filters = {
  formatDate,
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

export default filters
