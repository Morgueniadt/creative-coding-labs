class BarChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartHeight = options.chartHeight;
        this.chartWidth = options.chartWidth;
        this.barWidth = options.barWidth;
        this.margin = options.margin;
        this.axisThickness = options.axisThickness;
        this.xPos = options.xPos;
        this.yPos = options.yPos;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.maxValue = Math.max(...this.data.map(row => row[this.yValue]));
        this.scaler = this.chartHeight / this.maxValue;
    }

    render() {
        this.renderBars();
        this.renderAxis();
        this.renderTicks();
        this.renderTitle();
    }

    renderBars() {
        push();
        translate(this.xPos, this.yPos);

        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(100, 200, 100);  // Bar color
            noStroke();
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);
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
            let y = -i * this.chartHeight / 10;
            line(0, y, -10, y);
        }

        pop();
    }

    renderTitle() {
        push();
        translate(this.xPos + this.chartWidth / 2, this.yPos - this.chartHeight - 20);
        textSize(16);
        textAlign(CENTER);
        text("Top 10 Most Streamed Spotify Songs", 0, 0);
        pop();
    }
}
