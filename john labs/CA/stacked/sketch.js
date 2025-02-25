let data;
let cleanedData = [];
let chartHeight = 600;
let chartWidth = 600;
let barWidth = 30;
let margin = 15;
let gap;
let axisThickness = 5;
let chartPosX = 100;
let chartPosY = 900;
let axisColour;
let barColour;
let axisTextColour;
let Total;
let yValues = ["spotify", "youtube"];
let xValue = "track";
let maxStreams;
let maxViews;

let tickInterval;
let numTicks = 10; // Define numTicks here
let scaler;

function preload() {
    // Load the CSV data for the most streamed Spotify tracks
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    createCanvas(2000, 2000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    barColour = color(168, 230, 207); // Use a single color for all bars

    // Determine max values for both Spotify and YouTube streams
    maxStreams = max(cleanedData.map(row => row.spotify));
    maxViews = max(cleanedData.map(row => row.youtube)); 
    Total = maxStreams + maxViews

    tickInterval = Total / numTicks; // Calculate tick interval based on Total streams
    gap = (chartWidth - (cleanedData.length * barWidth) - (margin * 2)) / (cleanedData.length - 1);
    scaler = chartHeight / Total; // Adjust scaler based on the max combined value

    axisColour = color(169, 169, 169);
    axisTextColour = color(225);
}

function draw() {
    background(200);

    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0, 0, 0, -chartHeight); // Y-axis
    line(0, 0, chartWidth, 0); // X-axis

    push();
    translate(margin, 0);
    for (let i = 0; i < cleanedData.length; i++) {
        let xPos = (barWidth + gap) * i;

        push();
        translate(xPos, 0);
        push();
        // Draw bars for both Spotify and YouTube, stacked on top of each other
        fill(barColour); // Use a single color for both bars
        noStroke();
        rect(0, 0, barWidth, -cleanedData[i].spotify * scaler); // Draw Spotify bar
        translate(0, -cleanedData[i].spotify * scaler); // Move to the top of the Spotify bar
        rect(0, 0, barWidth, -cleanedData[i].youtube * scaler); // Draw YouTube bar
        pop();
        pop();

        // Draw track name on X-axis (with check)
        if (cleanedData[i].track) {
            fill(axisTextColour);
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(8);
            push();
            translate(xPos + (barWidth / 2), 10);
            rotate(60);
            text(cleanedData[i].track, 0, 0); // Display track name
            pop();
        } else {
            console.warn(`Track name is missing for row ${i}`);
        }
    }

    pop();
    pop();
}

// Function to clean and process data
function cleanData() {
    let trackSet = new Set(); // Use a Set to store unique track names

    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track")?.trim(); // Use optional chaining to prevent undefined access

        let spotify = data.getString(i, "Spotify_Streams")?.replace(/,/g, "");
        let youtube = data.getString(i, "YouTube_Views")?.replace(/,/g, "");

        // Convert to integers and handle invalid values
        spotify = parseInt(spotify) || 0;
        youtube = parseInt(youtube) || 0;

        cleanedData.push({ track, spotify, youtube });
        trackSet.add(track); // Mark track as added
    }

    // Sort by combined streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => (b.spotify + b.youtube) - (a.spotify + a.youtube));
    cleanedData = cleanedData.slice(0, 10); // Keep only the top 10
}
