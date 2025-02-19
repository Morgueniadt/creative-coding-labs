let table;
let cleanedData = [];
let chart;

function preload() {
    table = loadTable("Most_Streamed_Spotify_Songs_2024.csv", "csv", "header");
}

function setup() {
    createCanvas(1000, 700);
    cleanData();

    // Create a bar chart instance
    chart = new BarChart(
        cleanedData, 
        "track", "streams", 
        400, 800, 40, 50, 2, 100, 600
    );
}

function draw() {
    background(220);
    chart.renderAxis();
    chart.renderTicks();
    chart.renderBars();
}

function cleanData() {
    for (let i = 0; i < table.getRowCount(); i++) {
        let track = table.getString(i, "Track");
        let streams = table.getString(i, "Spotify Streams").replace(/,/g, ""); // Remove commas

        streams = int(streams) || 0; // Convert to number

        cleanedData.push({ track, streams });
    }

    // Sort by streams (descending) and keep top 10
    cleanedData.sort((a, b) => b.streams - a.streams);
    cleanedData = cleanedData.slice(0, 10);
}