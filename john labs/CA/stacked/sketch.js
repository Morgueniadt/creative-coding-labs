let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 30;
let margin = 15;
let gap;
let axisThickness = 5;
let chartPosX = 50;
let chartPosY = 400;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Female","Male"];
let xValue = "Age_Group";
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
    axisTextColour = color(125);
}

function draw() {
    background(100);

    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0, 0, 0, -chartHeight);
    line(0, 0, chartWidth, 0);

    push();
    translate(margin, 0);
    for (let i = 0; i < cleanedData.length; i++) {
        let xPos = (barWidth + gap) * i;

        push();
        translate(xPos, 0)
        push()
        for (let j = 0; j < yValues.length; j++) {
            fill(barColours[j]);
            noStroke();
            rect(0,0, barWidth, -cleanedData[i][yValues[j]] * scaler);
            translate(0, -cleanedData[i][yValues[j]]* scaler);

            
        }
        pop();
        pop()

        fill(axisTextColour);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(8);
        push();
        translate(xPos + (barWidth / 2), 10);
        rotate(60);
        pop();
    }

    pop();

    pop();
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