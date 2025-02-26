class PieChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartRadius = options.chartRadius;
        this.chartPosX = options.chartPosX;
        this.chartPosY = options.chartPosY;
        this.title = options.title; // Ensure title is passed in constructor
        this.colors = this.generateColors(this.data.length);  // Dynamically generate unique colors
    }

    // Dynamically generate a color palette based on the number of slices
    generateColors(num) {
        let colors = [];
        for (let i = 0; i < num; i++) {
            let hue = map(i, 0, num - 1, 0, 360); // Spread hues across the color wheel
            let saturation = 80 + random(-10, 10); // Keep saturation high with slight variation
            let brightness = 70 + random(-10, 10); // Keep brightness at a readable level
            colors.push(color(hue, saturation, brightness)); // Generate HSB color
        }
        return colors;
    }

    // Render the pie chart with dynamic slices
    renderPie() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            fill(this.colors[i]); // Use the unique color for each section
            noStroke();
            arc(0, 0, this.chartRadius * 2, this.chartRadius * 2, startAngle, startAngle + sliceAngle, PIE);
            startAngle += sliceAngle;
        }
        pop();
    }

    // Render labels and percentages for each pie section
    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            let labelAngle = radians(startAngle + sliceAngle / 2); // Convert to radians for calculations

            let labelX = cos(labelAngle) * (this.chartRadius * 0.6);
            let labelY = sin(labelAngle) * (this.chartRadius * 0.6);

            fill(0);
            textSize(14);
            textAlign(CENTER, CENTER);

        }
        pop();
    }

    // Render the chart title
    renderTitle() {
        push();
        translate(this.chartPosX, this.chartPosY - this.chartRadius - 20);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(18);
        text(this.title, 0, 0); // Use dynamic title
        pop();
    }

    // Render the legend for color reference
    renderLegend() {
        let xOffset = this.chartPosX + this.chartRadius + 50;
        let yOffset = this.chartPosY - this.chartRadius;
    
        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0); // Calculate total value for percentage calculation
    
        for (let i = 0; i < this.data.length; i++) {
            let percentage = ((this.data[i][this.yValue] / total) * 100).toFixed(1); // Calculate the percentage
    
            fill(this.colors[i]);
            noStroke();
            rect(xOffset, yOffset + i * 25, 20, 20); // Color box
    
            fill(0);
            textSize(12);
            textAlign(LEFT, CENTER);
            text(this.data[i][this.xValue] + " (" + percentage + "%)", xOffset + 30, yOffset + i * 25 + 10); // Display name and percentage
        }
    }
    
}
