class HorizontalBarChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartHeight = options.chartHeight;
        this.chartWidth = options.chartWidth;
        this.barHeight = options.barWidth;  // Use barWidth as height for horizontal bars
        this.margin = options.margin;
        this.axisThickness = options.axisThickness;
        this.xPos = options.xPos;
        this.yPos = options.yPos;

        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1);
        this.maxValue = Math.max(...this.data.map(row => row[this.yValue]));
        this.scaler = this.chartWidth / this.maxValue;
    }

    renderBars() {
        push();
        translate(this.xPos, this.yPos);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barHeight + this.gap) * i;
            fill(100, 200, 100);  // Bar color
            noStroke();
            rect(0, yPos, this.data[i][this.yValue] * this.scaler, this.barHeight);
        }
        pop();
    }

    renderAxis() {
        push();
        translate(this.xPos, this.yPos);
        stroke(0);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight);  // Y-axis
        line(0, 0, this.chartWidth, 0);    // X-axis
        pop();
    }

    renderTicks() {
        push();
        translate(this.xPos, this.yPos);

        for (let i = 0; i <= 10; i++) {
            let x = i * this.chartWidth / 10;
            line(x, 0, x, 10);
        }

        pop();
    }

    renderTitle() {
        push();
        translate(this.xPos + this.chartWidth / 2, this.yPos - this.chartHeight - 20);
        textSize(14);  // Smaller title text
        textAlign(CENTER);
        text("Top 10 Most Streamed Spotify Songs (Horizontal)", 0, 0);
        pop();
    }
}
