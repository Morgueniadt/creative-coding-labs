let data;
let cleanedData = [];
let chart = [];

function preload() {
    // Load the CSV data for the most streamed Spotify tracks
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    // Set up the canvas and other configurations
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();

    // Clean the data to process it for the pie chart
    cleanData();

    // Create the pie chart instance for Spotify tracks' streams
    chart.push(new PieChart({
        data: cleanedData,
        xValue: "track",  // Use track names for segments
        yValue: "streams",  // Use streams for segment size
        chartRadius: 300, 
        chartPosX: width / 2, 
        chartPosY: height / 2,
    }));
}

function draw() {
    // Draw the background
    background(220);

    // Render each chart on the canvas
    chart.forEach(chart => {
        chart.renderPie();
        chart.renderLabels();
        chart.renderTitle();
    });
}

function cleanData() {
    let trackSet = new Set(); // Use a Set to store unique track names

    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track").trim(); // Ensure consistent formatting
        let streams = data.getString(i, "Spotify_Streams").replace(/,/g, ""); // Remove commas

        streams = int(streams) || 0; // Convert to number

        // Check if track is already in the Set before adding
        if (!trackSet.has(track)) {
            cleanedData.push({ track, streams });
            trackSet.add(track); // Mark track as added
        }
    }

    // Sort by streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => b.streams - a.streams);
    cleanedData = cleanedData.slice(0, 10); // Keep only the top 10
}

// PieChart class to handle rendering of the pie chart
class PieChart {
    constructor(options) {
        this.data = options.data;
        this.xValue = options.xValue;
        this.yValue = options.yValue;
        this.chartRadius = options.chartRadius;
        this.chartPosX = options.chartPosX;
        this.chartPosY = options.chartPosY;
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
            fill(random(255), random(255), random(255)); // Random color for each slice
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
            text(this.data[i].track, labelX, labelY); // Display track name

            // Calculate the percentage for each slice
            let percentage = ((this.data[i][this.yValue] / total) * 100).toFixed(1);
            textSize(10);
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
}
