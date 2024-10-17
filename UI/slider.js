class Slider {
  constructor(maxValue, minValue, color, currentValue, x, y) {
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.color = color;
    this.currentValue = currentValue;
    this.x = x;
    this.y = y;
  }

  setValue(value) {
    this.currentValue = constrain(value, this.minValue, this.maxValue);
  }

  draw(x, y) {
    fill(this.color.r, this.color.g, this.color.b);
    let sliderWidth = 100;
    let sliderHeight = 10;
    let filledWidth = map(this.currentValue, this.minValue, this.maxValue, 0, sliderWidth);
    rect(x, y, sliderWidth, sliderHeight);
    fill(0, 255, 0);
    rect(x, y, filledWidth, sliderHeight);
  }
}
