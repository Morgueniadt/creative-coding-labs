let data;
let cleanedData = [];
let chart = [];
let horizontalCharts = []; // Array to store the horizontal bar charts

function preload() {
    // Load the CSV data for the most streamed Spotify tracks
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    createCanvas(3000, 10000);
    angleMode(DEGREES);
    noLoop();

    cleanData();

    chart.push(new BarChart({
        data: cleanedData,
        xValue: "track",
        yValue: "spotify",
        chartHeight: 150, 
        chartWidth: 300, 
        barWidth: 20, 
        margin: 10, 
        axisThickness: 2, 
        xPos: 350, 
        yPos: 0,
        title: "Top Spotify Streams"
    }));

    horizontalCharts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",
        yValue: "tiktok",
        chartHeight: 300, 
        chartWidth: 300, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 750, 
        yPos: 950,
        title: "Top TikTok Views"
    }));

    horizontalCharts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "track",
        yValue: "youtube",
        chartHeight: 300, 
        chartWidth: 300, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 1500, 
        yPos: 950,
        title: "Top YouTube Views"
    }));

    chart.push(new PieChart({
        data: cleanedData,
        xValue: "track",
        yValue: "spotify",
        chartRadius: 150,
        chartPosX: 750,
        chartPosY: 1500,
        title: "Spotify Streams Distribution"
    }));

    chart.push(new StackedBarChart({
        data: cleanedData,
        xValue: "track",
        yValues: ["spotify", "youtube"],
        chartHeight: 300, 
        chartWidth: 300, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 750, 
        yPos: 0,
        title: "Stacked Spotify & YouTube Streams"
    }));
    
    chart.push(new ClusterBarChart({
        data: cleanedData,
        xValue: "track",
        yValues: ["spotify", "youtube", "tiktok"],
        chartHeight: 300, 
        chartWidth: 300, 
        barHeight: 20, 
        margin: 15, 
        axisThickness: 2, 
        xPos: 1500, 
        yPos: 0,
        title: "Cluster Spotify & YouTube and Tiktok Streams"
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
        }  else if (c instanceof PieChart) {
            // Render specific methods for PieChart
            c.renderPie();
            c.renderLabels(); 
            c.renderTitle();
            c.renderLegend();
        } else if (c instanceof StackedBarChart) {
            // Render specific methods for HorizontalBarChart
            c.renderBars();
            c.renderAxis();
            c.renderTicks();
            c.renderLabels(); // Render labels for HorizontalBarChart
            c.renderTitle();
        } else if (c instanceof ClusterBarChart) {
            // Render specific methods for HorizontalBarChart
            c.renderBars();
            c.renderAxis();
            c.renderTicks();
            c.renderTitle();
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
        let tiktok = data.getString(i, "TikTok_Views").replace(/,/g, "");

        spotify = int(spotify) || 0; // Convert to number
        youtube = int(youtube) || 0;
        tiktok = int(tiktok)   || 0;

        // Check if track is already in the Set before adding
        if (!trackSet.has(track)) {
            cleanedData.push({ track, spotify, youtube, tiktok });
            trackSet.add(track); // Mark track as added
        }
    }

    // Sort by streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => b.spotify - a.spotify);
    cleanedData = cleanedData.slice(0, 10); // Keep only the top 10
}
