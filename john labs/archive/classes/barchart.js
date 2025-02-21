class BarChart {
    constructor(_data, _xValue, _yValue, _chartHeight, _chartWidth, _barWidth, _margin, _axisThickness, _chartPosX, _chartPosY) {
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.axisThickness = _axisThickness;
        this.axisTickThickness = 1;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;
 
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));
 
        this.axisColour = color(255, 204, 0);
        this.axisTickColour = color(255, 2, 0);
        this.barColour = color(100, 221, 100);
        this.axisTextColour = color(0, 0, 0);
        this.numTicks = 10;
        this.tickLength = 3;
    }
 
    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        translate(this.margin, 0);
 
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            noStroke();
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);
 
            // Draw labels
            push();
            fill(this.axisTextColour);
            textAlign(LEFT, CENTER);
            translate(xPos + (this.barWidth / 2), 15);
            textSize(10);
            rotate(60);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
    }
 
    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }
 
    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisTickColour);
        strokeWeight(this.axisTickThickness);
        let tickIncrement = this.chartHeight / this.numTicks;
 
        for (let i = 0; i <= this.numTicks; i++) {
            line(0, -tickIncrement * i, -this.tickLength, -tickIncrement * i);
        }
        pop();
    }
}