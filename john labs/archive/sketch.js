let data;
let cleanedData = [];
let chart = [];
let trackNames;

function preload() {
    // Load the CSV data for the most streamed Spotify tracks
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    // Set up the canvas and other configurations
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();

    // Clean the data to process it for the bar chart
    cleanData();

    // Create the bar chart instances for Spotify tracks' streams
    chart.push(new BarChart({
        data: cleanedData,
        xValue: "track",  // Use track names for x-axis
        yValue: "streams",  // Use streams for y-axis
        chartHeight: 600, 
        chartWidth: 600, 
        barWidth: 40, 
        margin: 15, 
        axisThickness: 3, 
        xPos: 200, 
        yPos: 650
    }));
}

function draw() {
    // Draw the background
    background(220);

    // Render each chart on the canvas
    chart.forEach(chart => {
        chart.renderBars();
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();
        chart.renderTitle();
    });
}

function cleanData() {
    // Clean the data and format it for the chart
    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track");
        let streams = data.getString(i, "Spotify_Streams").replace(/,/g, ""); // Remove commas

        streams = int(streams) || 0; // Convert to number

        cleanedData.push({ track, streams });
    }

    // Sort by streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => b.streams - a.streams);
    cleanedData = cleanedData.slice(0, 10);  // Only keep the top 10
}