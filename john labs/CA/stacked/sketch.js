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
let tickLength = 10;
let Total;
let yValues = ["spotify", "youtube"];
let xValue = "track";
let maxStreams;
let maxViews;
let barColours = [];
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
    
    // Define colors for each part of the stacked bar
    barColours.push(color(23, 32, 54)); // Spotify color
    barColours.push(color(12, 43, 23)); // YouTube color
    
    // Determine max values for both Spotify and YouTube streams
    maxStreams = max(cleanedData.map(row => row.spotify));
    maxViews = max(cleanedData.map(row => row.youtube)); 
    Total = maxStreams + maxViews;

    tickInterval = Total / numTicks; // Calculate tick interval based on Total streams
    gap = (chartWidth - (cleanedData.length * barWidth) - (margin * 2)) / (cleanedData.length - 1);
    scaler = chartHeight / Total; // Adjust scaler based on the max combined value

    axisColour = color(169, 169, 169);
    axisTextColour = color(0);
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
        translate(xPos, 0)
        push()
        for (let j = 0; j < yValues.length; j++) {
            fill(barColours[j]); // Fill with the respective color for Spotify or YouTube
            noStroke();
            rect(0, 0, barWidth, -cleanedData[i][yValues[j]] * scaler); // Draw stacked bars
            translate(0, -cleanedData[i][yValues[j]] * scaler); // Adjust for stacking
        }
        pop();
        pop();

        // Draw track name on X-axis with angle
        fill(axisTextColour);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(10);
        push();
        translate(xPos + (barWidth / 2), 10);
        rotate(60);
        text(cleanedData[i][xValue], 0, 0); // Display track name
        pop();
    }

    pop();
    pop();

    // Draw Y-axis ticks and labels
    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(1);

    let tickIncrement = chartHeight / numTicks;
    let valueIncrement = Total / numTicks;

    for (let i = 0; i <= numTicks; i++) {
        let y = -tickIncrement * i;
        let value = Math.floor(i * valueIncrement).toFixed(0); // Round values

        // Draw tick mark
        stroke(0);
        strokeWeight(1);
        line(0, y, -tickLength, y);

        // Draw numerical indicator
        noStroke();
        fill(0);
        textAlign(RIGHT, CENTER);
        text(value, -tickLength - 5, y);    
    }

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

//rgb(116 179 206)rgb(80 137 145)rgb(23 42 58)rgb(0 67 70)rgb(9 188 138) make 