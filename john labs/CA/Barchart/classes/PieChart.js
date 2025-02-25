class PieChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartRadius = options.chartRadius;
        this.chartPosX = options.chartPosX;
        this.chartPosY = options.chartPosY;
    }

    render() {
        this.renderPie();
        this.renderLabels();
        this.renderTitle();
    }

    renderPie() {
        push();
        translate(this.chartPosX, this.chartPosY);

        let total = this.data.reduce((sum, row) => sum + row[this.yValue], 0);
        let startAngle = 0;

        for (let i = 0; i < this.data.length; i++) {
            let sliceAngle = (this.data[i][this.yValue] / total) * 360;
            fill(random(255), random(255), random(255));  // Random color for each slice
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
}
