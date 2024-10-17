
  function either(num1, num2) {
    return Math.random() > 0.5 ? num1 : num2;
  }

  function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }


export { either,dist };