class StackedBarChart {
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
        this.axisTickColour = color(0);  // Light Blue (Ticks)
        this.barColour = color(168, 230, 207);  // Pastel Green (Bars)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 10;
        this.tickLength = 10;
        this.barColours = [];
        barColours.push(color(23, 32, 54)); // Spotify color
        barColours.push(color(12, 43, 23)); // YouTube color
    }

    renderBars() {
        push();
        translate(margin, 0);
        for (let i = 0; i < cleanedData.length; i++) {
            let xPos = (barWidth + gap) * i;
    
            push();
            translate(xPos, 0)
            push()
            for (let j = 0; j < yValues.length; j++) {
                fill(barColours[j]); // Fill with the respective color for Spotify or YouTube
                noStroke();
                rect(0, 0, barWidth, -cleanedData[i][yValues[j]] * scaler); // Draw stacked bars
                translate(0, -cleanedData[i][yValues[j]] * scaler); // Adjust for stacking
            }
            pop();
            pop();
    }
}

    renderAxis() {
        push();
        translate(chartPosX, chartPosY);
        noFill();
        stroke(axisColour);
        strokeWeight(axisThickness);
        line(0, 0, 0, -chartHeight); // Y-axis
        line(0, 0, chartWidth, 0); // X-axis
        pop();
    }

    renderTicks() {
       // Draw Y-axis ticks and labels
    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(1);

    let tickIncrement = chartHeight / numTicks;
    let valueIncrement = Total / numTicks;

    for (let i = 0; i <= numTicks; i++) {
        let y = -tickIncrement * i;
        let value = Math.floor(i * valueIncrement).toFixed(0); // Round values

        // Draw tick mark
        stroke(0);
        strokeWeight(1);
        line(0, y, -tickLength, y);

        // Draw numerical indicator
        noStroke();
        fill(0);
        textAlign(RIGHT, CENTER);
        text(value, -tickLength - 5, y);    
    }

    pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        rotate(-90)
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

            push();
            fill(this.axisTextColour);
            textAlign(LEFT, CENTER);
            translate(xPos + (this.barWidth / 2), 15);
            textSize(15);
            rotate(90)
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
    
        // Check the value of yValue to determine the title
        let titleText = "Chart Title: Most Streamed Songs";  // Default title
    
        if (this.yValue === 'youtube') {
            titleText = "Most Streamed YouTube Songs";
        } else if (this.yValue === 'spotify') {
            titleText = "Most Streamed Spotify Songs";
        }
    
        text(titleText, 0, 0);
        pop();
    }
}    

