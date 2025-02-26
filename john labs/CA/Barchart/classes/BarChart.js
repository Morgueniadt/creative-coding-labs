class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.axisTickThickness = obj.axisTickThickness || 1;

        this.chartPosX = obj.xPos || 50;
        this.chartPosY = obj.yPos || 350;
        
        this.title = obj.title || "";  // ✅ Dynamic title

        // Calculate gap between bars dynamically
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        // Calculate max value from CSV data dynamically
        this.maxValue = Math.max(...this.data.map(row => parseFloat(row[this.yValue]) || 0));

        // Calculate scaler
        this.scaler = this.chartHeight / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(0);  // Black (Ticks)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 5;
        this.tickLength = 10;

        // Custom color palette
        this.barColors = [
            color("#74D3AE"), // Light Green
            color("#678D58"), // Olive Green
            color("#A6C48A"), // Muted Green
            color("#F6E7CB"), // Cream
            color("#DD9787")  // Soft Coral
        ];
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            let barHeight = parseFloat(this.data[i][this.yValue]) || 0;

            // Cycle through custom colors
            let barColor = this.barColors[i % this.barColors.length];
            fill(barColor);
            noStroke();
            rect(xPos, 0, this.barWidth, -barHeight * this.scaler);
        }
        pop();
        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();

        // Set stroke for tick marks
        stroke(this.axisTickColour);
        strokeWeight(this.axisTickThickness);

        let tickIncrement = this.chartHeight / this.numTicks;
        let valueIncrement = this.maxValue / this.numTicks;

        for (let i = 0; i <= this.numTicks; i++) {
            let y = -tickIncrement * i;
            let value = Math.floor(i * valueIncrement); 
            // Draw tick mark
            stroke(this.axisTickColour);
            strokeWeight(this.axisTickThickness);
            line(0, y, -this.tickLength, y);

            // Draw numerical indicator
            noStroke();
            fill(0);
            textAlign(RIGHT, CENTER);
            text(value, -this.tickLength - 5, y);
        }

        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

            push();
            fill(this.axisTextColour);
            textAlign(LEFT, CENTER);
            translate(xPos + (this.barWidth / 2), 15);
            textSize(15);
            rotate(60);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }

    renderTitle() {
        push();
        translate(this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 20);
        fill(this.axisTextColour);
        textAlign(CENTER, CENTER);
        textSize(18);
        text(this.title, 0, 0); // ✅ Now using the dynamic title
        pop();
    }
}
