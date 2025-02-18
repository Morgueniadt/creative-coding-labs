let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 30;
let margin = 15;
let gap;
let axisThickness = 5;
let chartPosX;
let chartPosY;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Female", "Male"];
let xValue = "Age_Group";
let yValueTotal = "Total";
let barColours = [];

let scaler;
let myNewArray;
let total;

function preload() {
    data = loadTable('data/Combined.csv', 'csv', 'header');
}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    barColours.push(color(23, 32, 54))
    barColours.push(color(12, 43, 23))

    myNewArray = cleanedData.map(row => row.Female)
    total = -0

    myNewArray.forEach(item => total = total + item)

    console.log(total)
    chartPosX = width / 2; 
    chartPosY = height / 2; 
}

function draw() {
    background(200);

    push();
    translate(chartPosX, chartPosY);

    for (let i = 0; i < myNewArray.length; i++) {
        
        fill(random(255))
        stroke(255)
        let start = 0;
        let end = ((myNewArray[i] / total) * 360);

        arc(0, 0, 200, 200, start, end, PIE)
        rotate(90)
    }

    textSize(30)
    fill(255)
    noStroke()
    text("john",0,0)
    pop();

}

function cleanData() {
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}
