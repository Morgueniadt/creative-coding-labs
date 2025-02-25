class PieChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartRadius = obj.chartRadius;
        this.chartPosX = obj.chartPosX || 50 ;
        this.chartPosY = obj.chartPosY || 650;

        // Predefined colors for each track
        this.colors = [
            color(255, 99, 132),    // Color 1
            color(54, 162, 235),    // Color 2
            color(255, 206, 86),    // Color 3
            color(75, 192, 192),    // Color 4
            color(153, 102, 255),   // Color 5
            color(255, 159, 64),    // Color 6
            color(255, 99, 132),    // Color 7
            color(54, 162, 235),    // Color 8
            color(255, 206, 86),    // Color 9
            color(75, 192, 192)     // Color 10
        ];
    }

    render() {
        this.renderPie();
        this.renderLabels();
        this.renderTitle();
        this.renderLegend();
    }

    renderPie() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            fill(this.colors[i]);  // Assign a color from the array
            noStroke();
            arc(0, 0, this.chartRadius * 2, this.chartRadius * 2, startAngle, startAngle + sliceAngle, PIE);
            startAngle += sliceAngle;
        }
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            let labelAngle = startAngle + sliceAngle / 2;  // Middle of the slice

            let labelX = cos(labelAngle) * (this.chartRadius / 1.5);
            let labelY = sin(labelAngle) * (this.chartRadius / 1.5);

            fill(0);
            textSize(12);
            textAlign(CENTER, CENTER);
            text(this.data[i].track, labelX, labelY); // Display track name

            let percentage = ((this.data[i][this.yValue] / total) * 100).toFixed(1);
            textSize(10);
            text(percentage + "%", labelX, labelY + 20); // Display the percentage below the track name

            startAngle += sliceAngle;
        }
        pop();
    }

    renderTitle() {
        push();
        translate(this.chartPosX, this.chartPosY);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Top 10 Most Streamed Spotify Tracks (Pie)", 0, -this.chartRadius - 30);
        pop();
    }

    renderLegend() {
        // Position for the legend
        let legendX = this.chartPosX + this.chartRadius + 20;
        let legendY = this.chartPosY - this.chartRadius;

        push();
        translate(legendX, legendY);
        textSize(14);
        fill(0);
        textAlign(LEFT);
        text("Track Legend:", 0, 0);

        // Render the legend
        for (let i = 0; i < this.data.length; i++) {
            fill(this.colors[i]);
            noStroke();
            rect(0, (i + 1) * 20, 15, 15); // Color box
            fill(0);
            textSize(12);
            text(this.data[i].track, 20, (i + 1) * 20 + 7); // Track name next to color box
        }

        pop();
    }
}
