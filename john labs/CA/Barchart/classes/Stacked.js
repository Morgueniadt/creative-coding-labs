class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues; // Array of keys for stacking
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

        // Calculate max stacked value per category
        let maxValue = 0;
        for (let i = 0; i < this.data.length; i++) {
            let youtubeValue = parseFloat(this.data[i]["YouTube_Views"]) || 0;
            let spotifyValue = parseFloat(this.data[i]["Spotify_Streams"]) || 0;
            let totalValue = youtubeValue + spotifyValue;
            
            // Update maxValue if the current totalValue is greater
            if (totalValue > maxValue) {
                maxValue = totalValue;
            }
        }
        this.maxValue = maxValue;
        // ... (spread operator) spreads the list into individual numbers so Math.max() can compare them.
        
        // Calculate scaler
        this.scaler = this.chartHeight / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(0);  // Black (Ticks)
        this.axisTextColour = color(0, 0, 0);
        this.numTicks = 10;
        this.tickLength = 10;

        // Ensure barColours is an array
        this.barColours = obj.barColours || [
            color(168, 230, 207), // Color 1
            color(255, 204, 102), // Color 2
        ];
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
console.log(this.maxValue)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            let stackedHeight = 0; // Tracks height for stacking

            push();
            translate(xPos, 0);

            for (let j = 0; j < this.yValues.length; j++) {
                let value = parseFloat(this.data[i][this.yValues[j]]) || 0;
                let barHeight = value * this.scaler;

                fill(this.barColours[j % this.barColours.length]); // Cycle colors
                noStroke();
                rect(0, -stackedHeight, this.barWidth, -barHeight); // Stack bars
                stackedHeight += barHeight; // Move up for next bar
            }

            pop();
        }

        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis
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
        
        translate(this.margin, 0);

        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

            push();
            fill(this.axisTextColour);
            textAlign(LEFT, CENTER);
            translate(xPos + (this.barWidth / 2), 15);
            rotate(60);
            textSize(12);
            text(this.data[i][this.xValue], 0, 0);
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
        text("Stacked Bar Chart", 0, 0);
        pop();
    }

}
