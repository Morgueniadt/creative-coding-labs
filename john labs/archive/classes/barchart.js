class BarChart {
    constructor(data, xValue, yValue, chartWidth, chartHeight, barWidth, margin, axisThickness, chartPosX, chartPosY) {
        this.data = data;
        this.xValue = xValue;
        this.yValue = yValue;
        this.chartWidth = chartWidth;
        this.chartHeight = chartHeight;
        this.barWidth = barWidth;
        this.margin = margin;
        this.axisThickness = axisThickness;
        this.chartPosX = chartPosX;
        this.chartPosY = chartPosY;
        this.maxValue = max(this.data.map(row => row[this.yValue]));
        this.scaler = this.chartHeight / this.maxValue;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.axisColour = color(255, 204, 0);
        this.barColour = color(0, 200, 50);
        this.axisTextColour = color(125);
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Y Axis
        line(0, 0, this.chartWidth, 0); // X Axis
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.axisTextColour);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);

        // Y Axis Ticks (optional, based on your need)
        for (let i = 0; i <= 5; i++) {
            let tickValue = map(i, 0, 5, 0, this.maxValue);
            text(tickValue, -10, -map(i, 0, 5, 0, this.chartHeight));
        }

        // X Axis Ticks
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.margin;
            text(this.data[i][this.xValue], xPos, 10); // Track name
        }
        pop();
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.margin;
            let barHeight = -this.data[i][this.yValue] * this.scaler;

            fill(this.barColour);
            noStroke();
            rect(xPos, 0, this.barWidth, barHeight);
        }
        pop();
    }
}