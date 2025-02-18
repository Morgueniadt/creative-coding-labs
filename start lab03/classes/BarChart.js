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

        // Calculate gap between bars dynamically
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        // Calculate max value from CSV data dynamically
        this.maxValue = Math.max(...this.data.map(row => parseFloat(row[this.yValue]) || 0));

        // Calculate scaler
        this.scaler = this.chartHeight / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(176, 224, 230);  // Light Blue (Ticks)
        this.barColour = color(168, 230, 207);  // Pastel Green (Bars)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 10;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
    
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            noStroke();
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);

            push();
            fill(this.axisTextColour);
            textAlign(LEFT, CENTER);
            translate(xPos + (this.barWidth / 2), 15);
            pop();
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
            let value = (i * valueIncrement).toFixed(0); // Round values
    
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
        text("Chart Title: Age Distribution by Gender", 0, 0);
        pop();
    }
}
