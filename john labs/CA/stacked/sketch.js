let data;
let cleanedData = [];
let chartHeight = 600;
let chartWidth = 600;
let barWidth = 30;
let margin = 15;
let gap;
let axisThickness = 5;
let chartPosX = 50;
let chartPosY = 600;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Spotify_Streams","YouTube_Views"];
let xValue = "Track";
let yValueTotal = "Total";
let barColours= [];

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
    barColours.push(color(23,32,54))
    barColours.push(color(12,43,23))
    


    gap = (chartWidth - (cleanedData.length * barWidth) - (margin * 2)) / (cleanedData.length - 1);
    scaler = chartHeight/(max(cleanedData.map(row=> row[yValueTotal])));

    axisColour = color(169, 169, 169);
    barColour =color(168, 230, 207);
    axisTextColour = color(225);
}

function draw() {
    background(100);

    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0, 0, 0, -chartHeight); // Y-axis
    line(0, 0, chartWidth, 0);   // X-axis

    // Draw the bars
    push();
    translate(margin, 0);
    for (let i = 0; i < cleanedData.length; i++) {
        let xPos = (barWidth + gap) * i;

        push();
        translate(xPos, 0);

        // Draw the Spotify bar
        fill(barColours[0]);
        noStroke();
        rect(0, 0, barWidth, -cleanedData[i].spotify * scaler); // Spotify stream
        translate(0, -cleanedData[i].spotify * scaler);

        // Draw the YouTube bar stacked on top of Spotify
        fill(barColours[1]);
        noStroke();
        rect(0, 0, barWidth, -cleanedData[i].youtube * scaler); // YouTube views

        pop();

        // Label the X-axis with the track name
        fill(axisTextColour);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(15);
        push();
        translate(xPos + (barWidth / 2), 10);
        rotate(60);
        text(cleanedData[i].track, 0, 0); // Display track name
        pop();
    }
    pop();

    pop();
}


function cleanData() {
    let trackSet = new Set(); // Use a Set to store unique track names

    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track").trim(); // Ensure consistent formatting
        let spotify = data.getString(i, "Spotify_Streams").replace(/,/g, ""); // Remove commas
        let youtube = data.getString(i, "YouTube_Views").replace(/,/g, ""); // Remove commas
        
        // Convert to integers
        spotify = int(spotify) || 0;
        youtube = int(youtube) || 0;

        // Check if track is already in the Set before adding
        if (!trackSet.has(track)) {
            cleanedData.push({ track, spotify, youtube });
            trackSet.add(track); // Mark track as added
        }
    }

    // Sort by streams (descending) and keep the top 10 tracks
    cleanedData.sort((a, b) => (b.spotify + b.youtube) - (a.spotify + a.youtube));
    cleanedData = cleanedData.slice(0, 10); // Keep only the top 10
}
