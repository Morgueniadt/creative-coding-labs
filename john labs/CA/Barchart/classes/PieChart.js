class PieChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartRadius = options.chartRadius;
        this.chartPosX = options.chartPosX;
        this.chartPosY = options.chartPosY;
        this.colors = this.generateUniqueColors(this.data.length);  // Store unique colors for tracks
    }

    // Generate a list of unique colors for each track
    generateUniqueColors(num) {
        let colors = [];
        for (let i = 0; i < num; i++) {
            colors.push(color(random(255), random(255), random(255))); // Generate a random color
        }
        return colors;
    }

    // Render the pie chart with segments
    renderPie() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        // Draw each slice
        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            fill(this.colors[i]); // Use the unique color for each track
            noStroke();
            arc(0, 0, this.chartRadius * 2, this.chartRadius * 2, startAngle, startAngle + sliceAngle, PIE);
            startAngle += sliceAngle;
        }
        pop();
    }

    // Render the labels and percentages for the pie chart
    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        // Render labels and percentages on the pie chart slices
        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            let labelAngle = startAngle + sliceAngle / 2; // Middle of the slice

            let labelX = cos(labelAngle) * (this.chartRadius / 1.5);
            let labelY = sin(labelAngle) * (this.chartRadius / 1.5);

            fill(0);
            textSize(12);
            textAlign(CENTER, CENTER);

            // Calculate the percentage for each slice
            let percentage = ((this.data[i][this.yValue] / total) * 100).toFixed(1);
            textSize(20);
            text(percentage + "%", labelX, labelY + 20); // Display the percentage below the track name

            startAngle += sliceAngle;
        }
        pop();
    }

    // Render the chart title
    renderTitle() {
        push();
        translate(this.chartPosX, this.chartPosY);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Top 10 Most Streamed Spotify Tracks", 0, -this.chartRadius - 30);
        pop();
    }

    // Render the legend to the side
    renderLegend() {
        let xOffset = this.chartPosX + this.chartRadius + 50;  // Position the legend to the right of the chart
        let yOffset = this.chartPosY - this.chartRadius;

        for (let i = 0; i < this.data.length; i++) {
            fill(this.colors[i]);
            noStroke();
            rect(xOffset, yOffset + i * 25, 20, 20);  // Draw the color box

            fill(0);
            textSize(12);
            textAlign(LEFT, CENTER);
            text(this.data[i].track, xOffset + 30, yOffset + i * 25 + 10);  // Display the track name next to the color box
        }
    }
}
