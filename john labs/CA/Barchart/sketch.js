let data;
let cleanedData = [];
let chart = [];

function preload() {
    // Load the CSV data for the most streamed Spotify tracks
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    // Set up the canvas and other configurations
    createCanvas(3000, 3000);
    angleMode(DEGREES);
    noLoop();

    // Clean the data to process it for the charts
    cleanData();

    // Create instances of the chart types and push them into the chart array
    chart.push(new BarChart({
        data: cleanedData,
        xValue: "track",  // Use track names for x-axis
        yValue: "streams",  // Use streams for y-axis
        chartHeight: 300, 
        chartWidth: 600, 
        barWidth: 20, 
        margin: 10, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 0
    }));

    chart.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",  
        yValue: "streams",  
        chartHeight: 300, 
        chartWidth: 600, 
        barHeight: 20, 
        margin: 10, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 1000
    }));

    chart.push(new PieChart({
        data: cleanedData,
        xValue: "track",  
        yValue: "streams",  
        chartRadius: 300, 
        chartPosX: 650, 
        chartPosY: height / 2,
    }));
}

function draw() {
    // Draw the background
    background(220);

    // Loop through each chart in the chart array
    chart.forEach(c => {
        if (c instanceof BarChart) {
            // Render specific methods for BarChart
            c.renderBars();
            c.renderAxis();
            c.renderTicks();
            c.renderLabels(); // Render labels for BarChart
            c.renderTitle();
        } else if (c instanceof HorizontalBarChart) {
            // Render specific methods for HorizontalBarChart
            c.renderBars();
            c.renderAxis();
            c.renderTicks();
            c.renderLabels(); // Render labels for HorizontalBarChart
            c.renderTitle();
        } else if (c instanceof PieChart) {
            // Render specific methods for PieChart
            c.renderPie();
            // No renderLabels() for PieChart, as it's not defined
            c.renderTitle();
            c.renderLegend();
        }
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
