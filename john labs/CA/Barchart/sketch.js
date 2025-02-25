let data;
let cleanedData = [];
let charts = []; // Array to store chart instances

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

    // Create the bar chart instances for Spotify tracks' streams with smaller size
    charts.push(new BarChart({
        data: cleanedData,
        xValue: "track",  // Use track names for x-axis
        yValue: "streams",  // Use streams for y-axis
        chartHeight: 400,  // Reduced height
        chartWidth: 400,   // Reduced width
        barWidth: 30,      // Smaller bars
        margin: 10,        // Reduced margin
        axisThickness: 2,  // Thinner axis
        xPos: 100,         // Adjusted x position
        yPos: 450          // Adjusted y position
    }));

    charts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",  // Use track names for x-axis
        yValue: "streams",  // Use streams for y-axis
        chartHeight: 400,  // Reduced height
        chartWidth: 400,   // Reduced width
        barWidth: 30,      // Smaller bars
        margin: 10,        // Reduced margin
        axisThickness: 2,  // Thinner axis
        xPos: 100,         // Adjusted x position
        yPos: 450          // Adjusted y position
    }));

    charts.push(new PieChart({
        data: cleanedData,
        xValue: "track",  // Use track names for segments
        yValue: "streams",  // Use streams for segment size
        chartRadius: 200,   // Smaller pie radius
        chartPosX: width / 2,  // Center pie chart
        chartPosY: height / 2  // Center pie chart
    }));
}

function draw() {
    // Draw the background
    background(220);

    // Render each chart on the canvas
    charts.forEach(chart => {
        chart.render(); // Assuming each chart has a `render` method
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