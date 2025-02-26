class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.axisTickThickness = obj.axisTickThickness || 1;

        this.chartPosX = obj.xPos || 50;
        this.chartPosY = obj.yPos || 350;
        
        this.title = obj.title || "";  // Dynamic title

        // Calculate gap between bars dynamically
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        // Calculate max value from CSV data dynamically
        this.maxValue = Math.max(...this.data.map(row => Math.max(...this.yValues.map(key => parseFloat(row[key]) || 0))));

        // Calculate scaler
        this.scaler = this.chartHeight / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(0);  // Black (Ticks)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 5;
        this.tickLength = 5;

        // Custom color palette for each platform (Spotify, YouTube, TikTok)
        this.barColors = [
            color("#74D3AE"), // Light Green for Spotify
            color("#678D58"), // Olive Green for YouTube
            color("#A6C48A")  // Muted Green for TikTok
        ];

        // Define the position for the legend
        this.legendPosX = this.chartPosX + this.chartWidth + 20;  // Just right of the chart
        this.legendPosY = this.chartPosY;
        this.legendSpacing = 20; // Space between each legend item
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
    
        // We want to cycle through a different set of colors for each stacked bar
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            let stackedHeight = 0; // Tracks height for stacking
    
            push();
            translate(xPos, 0);
    
            // Check if yValues is an array before proceeding
            if (Array.isArray(this.yValues)) {
                // Cycle through a larger array of colors for each stacked section
                for (let j = 0; j < this.yValues.length; j++) {
                    let value = parseFloat(this.data[i][this.yValues[j]]) || 0;
                    let barHeight = value * this.scaler;
    
                    // Use modulo operator to cycle through the colors dynamically
                    // Here we combine i and j to create a unique index for each stacked section
                    let colorIndex = (i * this.yValues.length + j) % this.barColors.length;
                    fill(this.barColors[colorIndex]);  // Cycle colors
                    noStroke();
                    rect(0, -stackedHeight, this.barWidth, -barHeight); // Stack bars
                    stackedHeight += barHeight; // Move up for next bar
                }
            } else {
                console.error("yValues is not an array!");
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
