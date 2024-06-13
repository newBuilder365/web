const getFloat = (number, n) => {
  if (!number) return 0;
  number = parseFloat(number);
  n = n ? parseInt(n) : 0;
  if (n <= 0) return Math.round(number);
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
  return number;
};

const getSum = (dataSource = [], dataIndex, precision = 2) => {
  let newValue = dataSource
    .map((v) => v[dataIndex])
    .reduce((pre, cur) => {
      pre = Number(pre) ?? 0;
      cur = Number(cur) ?? 0;
      let preValue = getFloat(pre, precision);
      let curValue = getFloat(cur, precision);
      return getFloat(preValue + curValue, precision);
    }, 0);
  return newValue;
};

export { getFloat, getSum };
