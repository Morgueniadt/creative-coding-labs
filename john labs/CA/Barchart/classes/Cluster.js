class ClusterBarChart {
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

        this.numTicks = 10;
        this.tickLength = 10;

        // Custom color palette for each platform (Spotify, YouTube, TikTok)
        this.barColors = [
            color("#74D3AE"), // Light Green for Spotify
            color("#678D58"), // Olive Green for YouTube
            color("#A6C48A")  // Muted Green for TikTok
        ];
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();

        // Axis lines
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis

        // Draw tick increments and values
        let tickCount = 5;
        let tickGap = this.chartHeight / tickCount;
        let tickValueGap = this.maxValue / tickCount;
        textAlign(RIGHT, CENTER);
        fill(0);
        noStroke();
        for (let i = 0; i <= tickCount; i++) {
            let yPos = -i * tickGap;
            let tickValue = Math.floor(i * tickValueGap);
            text(tickValue, -10, yPos);
            stroke(100);
            line(0, yPos, this.chartWidth, yPos);
        }

        push();
        translate(this.margin, 0);

        // Loop through data to create bars
        for (let i = 0; i < this.data.length; i++) {
            push();
            translate((this.gap + (this.barWidth * 3)) * i, 0);
            
            for (let j = 0; j < this.yValues.length; j++) {
                noStroke();
                fill(this.barColors[j % this.barColors.length]); // Cycle through the color palette
                let barHeight = this.data[i][this.yValues[j]] * this.scaler;
                rect(this.barWidth * j, 0, this.barWidth, -barHeight);
            }

            // Draw track label
            translate(this.barWidth, 20);
            fill(0);
            rotate(60);
            textSize(10);
            textAlign(LEFT, CENTER);
            text(this.data[i][this.xValue], 0, 0); // Using the xValue for track name
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
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0);  // X-axis
        pop();
    }

    renderTitle() {
        push();
        translate(this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 20); // Title above chart
        fill(this.axisTextColour);
        textAlign(CENTER, CENTER);
        textSize(18); // Adjust font size as needed
        text(this.title, 0, 0); // Dynamic title
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
}
