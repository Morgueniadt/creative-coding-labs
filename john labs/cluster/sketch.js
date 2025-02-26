let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 6;
let margin = 15;
let gap;
let axisThickness = 5;
let chartPosX = 150;
let chartPosY = 400;
let axisColour;
let barColours = [];
let scaler;
let yValues = ["spotify", "youtube", "tiktok"];
let xValue = "track";

function preload() {
    data = loadTable('data/Most_Streamed_Spotify_Songs_2024.csv', 'csv', 'header');
}

function setup() {
    createCanvas(800, 600);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    barColours.push(color(23, 32, 54)); // Spotify
    barColours.push(color(12, 43, 23)); // YouTube
    barColours.push(color(200, 50, 50)); // TikTok

    gap = (chartWidth - (cleanedData.length * barWidth * yValues.length) - (margin * 2)) / (cleanedData.length - 1);
    
    let maxSpotify = max(cleanedData.map(row => row.spotify));
    let maxYouTube = max(cleanedData.map(row => row.youtube));
    let maxTikTok = max(cleanedData.map(row => row.tiktok));
    let maxValue = max([maxSpotify, maxYouTube, maxTikTok]);

    scaler = chartHeight / maxValue;

    axisColour = color(255, 204, 0);
}

function draw() {
    background(200);
    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0, 0, 0, -chartHeight);
    line(0, 0, chartWidth, 0);

    // Draw tick increments and values
    let tickCount = 5;
    let tickGap = chartHeight / tickCount;
    let tickValueGap = max(cleanedData.map(row => max(row.spotify, row.youtube, row.tiktok))) / tickCount;
    textAlign(RIGHT, CENTER);
    fill(0);
    noStroke();
    for (let i = 0; i <= tickCount; i++) {
        let yPos = -i * tickGap;
        let tickValue = int(i * tickValueGap);
        text(tickValue, -10, yPos);
        stroke(100);
        line(0, yPos, chartWidth, yPos);
    }

    push();
    translate(margin, 0);
    textAlign(CENTER, CENTER);
    
    for (let i = 0; i < cleanedData.length; i++) {
        push();
        translate((gap + (barWidth * 3)) * i, 0);
        
        for (let j = 0; j < yValues.length; j++) {
            noStroke();
            fill(barColours[j]);
            rect(barWidth * j, 0, barWidth, -cleanedData[i][yValues[j]] * scaler);
        }

        // Draw track label
        translate(barWidth, 20);
        fill(0);
        rotate(60);
        textSize(10);
        textAlign(LEFT, CENTER)
        text(cleanedData[i].track, 0, 0);
        pop();
    }

    pop();
    pop();
}

function cleanData() {
    let trackSet = new Set();

    for (let i = 0; i < data.getRowCount(); i++) {
        let track = data.getString(i, "Track").trim();
        let spotify = int(data.getString(i, "Spotify_Streams").replace(/,/g, "")) || 0;
        let youtube = int(data.getString(i, "YouTube_Views").replace(/,/g, "")) || 0;
        let tiktok = int(data.getString(i, "TikTok_Views").replace(/,/g, "")) || 0;

        if (!trackSet.has(track)) {
            cleanedData.push({ track, spotify, youtube, tiktok });
            trackSet.add(track);
        }
    }
    cleanedData.sort((a, b) => b.spotify - a.spotify);
    cleanedData = cleanedData.slice(0, 10);
}
