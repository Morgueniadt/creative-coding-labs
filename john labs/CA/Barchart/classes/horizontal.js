class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 150;
        this.chartWidth = obj.chartWidth || 300;
        this.barHeight = obj.barHeight || 10; // Adjust bar height instead of width
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.axisTickThickness = obj.axisTickThickness || 1;

        this.chartPosX = obj.xPos || 50;
        this.chartPosY = obj.yPos || 350;

        // Calculate gap between bars dynamically
        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1);

        // Calculate max value from CSV data dynamically
        this.maxValue = Math.max(...this.data.map(row => parseFloat(row[this.yValue]) || 0));

        // Calculate scaler
        this.scaler = this.chartWidth / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(0);  // Light Blue (Ticks)
        this.barColour = color(168, 230, 207);  // Pastel Green (Bars)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 10;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barHeight + this.gap) * i;
            fill(this.barColour);
            noStroke();
            rect(0, -(this.margin+yPos), this.data[i][this.yValue] * this.scaler, this.barHeight);


        }
        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);

        // Render X-axis (horizontal axis)
        line(0, 0, this.chartWidth, 0);

        // Render Y-axis (vertical axis)
        line(0, 0, 0, -this.chartHeight);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();

        // Set stroke for tick marks
        stroke(this.axisTickColour);
        strokeWeight(this.axisTickThickness);

        let tickIncrement = this.chartWidth / this.numTicks;
        let valueIncrement = this.maxValue / this.numTicks;

        for (let i = 0; i <= this.numTicks; i++) {
            let x = tickIncrement * i;
            let value = (i * valueIncrement).toFixed(0); // Round values

            // Draw tick mark
            line(x, 0, x, this.tickLength);

     
        }

        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barHeight + this.gap) * i;

            push();
            fill(this.axisTextColour);
            textAlign(RIGHT, CENTER);
            translate(-5, -(this.margin+yPos) + (this.barHeight / 2));
            textSize(15);
            if (i==0 || this.data[i][this.xValue]!==this.data[i-1][this.xValue]) {
            text(this.data[i][this.xValue], 0, 0);
            }
            else {
                text(this.data[i-1][this.xValue], 0, 0);
            }
            pop();
        }
        pop();
    }

    renderTitle() {
        push();
        translate(this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 20);
        fill(this.axisTextColour);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("Chart Title: Most Streamed Spotify Songs", 0, 0);
        pop();
    }
}