let data;
let cleanedData = [];
let chart = [];
let horizontalCharts = []; // Array to store the horizontal bar charts

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
        yValue: "spotify",  // Use spotify for y-axis
        chartHeight: 300, 
        chartWidth: 600, 
        barWidth: 20, 
        margin: 10, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 0
    }));

    // Create the first horizontal bar chart and push it into the horizontalCharts array
    horizontalCharts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",  
        yValue: "spotify",  
        chartHeight: 300, 
        chartWidth: 600, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 1000
    }));

    // Create the second horizontal bar chart and push it into the horizontalCharts array
    horizontalCharts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",  
        yValue: "spotify",  
        chartHeight: 300, 
        chartWidth: 600, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 1600  // Adjust position for the second chart
    }));

    chart.push(new PieChart({
        data: cleanedData,
        xValue: "track",  
        yValue: "spotify",  
        chartRadius: 300, 
        chartPosX: 650, 
        chartPosY: 2000,
    }));
}

function draw() {
    // Draw the background
    background(220);

    // Loop through each chart in the chart array and render it
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
            c.renderLabels(); 
            c.renderTitle();
            c.renderLegend();
        }
    });

    // Render the horizontal bar charts stored in the horizontalCharts array
    horizontalCharts.forEach(c => {
        c.renderBars();
        c.renderAxis();
        c.renderTicks();
        c.renderLabels(); // Render labels for HorizontalBarChart
        c.renderTitle();
    });
}

function cleanData() {
    let trackSet = new Set(); // Use a Set to store unique track names

    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track").trim(); // Ensure consistent formatting
        let spotify = data.getString(i, "Spotify_Streams").replace(/,/g, ""); // Remove commas
        let youtube = data.getString(i, "YouTube_Views").replace(/,/g, "");

        spotify = int(spotify) || 0; // Convert to number
        youtube = int(youtube) || 0;

        // Check if track is already in the Set before adding
        if (!trackSet.has(track)) {
            cleanedData.push({ track, spotify });
            trackSet.add(track); // Mark track as added
        }
    }

    // Sort by streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => b.spotify - a.spotify);
    cleanedData = cleanedData.slice(0, 10); // Keep only the top 10
}
