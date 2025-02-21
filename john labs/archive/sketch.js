let table;
let cleanedData = [];
let chart;
let data;
let chartHeight = 300;
let chartWidth = 800;
let barWidth = 40;
let margin = 15;
let gap;
let scaler;
let axisThickness = 5;
let chartPosX = 50;
let chartPosY = 600;
let axisColour;
let barColour;
let axisTextColour;
let yValue = "streams";
let xValue = "track";

function preload() {
    table = loadTable("data/Most_Streamed_Spotify_Songs_2024.csv", "csv", "header");
}

function setup() {
    createCanvas(1000, 700);
    cleanData();

    // Create a bar chart instance
    chart = new BarChart(
        cleanedData, 
        "track", "streams", 
        chartWidth, chartHeight, barWidth, margin, axisThickness, chartPosX, chartPosY
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
        let streams = table.getString(i, "Spotify_Streams").replace(/,/g, ""); // Remove commas

        streams = int(streams) || 0; // Convert to number

        cleanedData.push({ track, streams });
    }

    // Sort by streams (descending) and keep top 10
    cleanedData.sort((a, b) => b.streams - a.streams);
    cleanedData = cleanedData.slice(0, 10);
}