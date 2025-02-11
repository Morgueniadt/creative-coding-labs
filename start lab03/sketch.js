let data;
let cleanedData = [];
let charts = [];
let femaleScores;
let ageGroups;


function preload(){
    data= loadTable('data/Combined.csv', 'csv', 'header')
}
 
function setup(){
    createCanvas(800,800);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    charts.push(new BarChart(cleanedData,"Age_Group", "Female", 300, 400, 20, 10, 1, 50, 700));
    //charts.push(new BarChart(cleanedData,"Age_Group", "Male", 150, 300, 1, 5, 1, 100, 740));
    //charts.push(new BarChart(cleanedData,"Age_Group", "Total", 200, 400, 20, 20, 3, 380, 250));
    // femaleScores = cleanedData.map(row =>row.Female);
    // ageGroups = cleanedData.map(row =>row.Age_Group);
    // console.log(femaleScores, ageGroups);
    // axisColour= color(255,204,0);
    // barColour = color (100,221,100);
    // axisTextColour = color( 0,0,0);
 
    //(Width of chart - (Amount of bars * width of bars))
 
    // gap = (chartWidth - (femaleScores.length * barWidth) - (margin * 2))/(femaleScores.length-1);
    // scaler = chartHeight / (max(cleanedData.map(row => row.Female)));
}
 
function draw() {
    background(100,150,255)
    charts.forEach(chart => {
        chart.renderBars()
        chart.renderAxis()
        //chart.renderLabels()
        chart.renderTicks()
    })
    
    // push();
    // translate(chartPosX,chartPosY)
    // noFill()
    // stroke(axisColour)
    // strokeWeight(axisThickness)
    // line(0,0,0,-chartHeight)
    // line(0,0,chartWidth,0)

    // push()
    // translate(margin,0)
    // for (let i = 0; i < femaleScores.length; i++) {
    //     let xPos = (barWidth + gap) * i;
    //     fill(barColour)
    //     noStroke()
    //     rect(xPos,0,barWidth,-femaleScores[i]*scaler)
    //     push()
    //     fill(axisTextColour);
    //     textAlign(LEFT, CENTER)
    //     translate(xPos + (barWidth/2), 15)
    //     textSize(10)
    //     rotate(60)
    //     text (ageGroups[i], 0 , 0);
    //     pop()
    // }
    // pop()
    // pop()

 
    //let femaleAges= []
    // Method 1
    // for(let i=0; i<cleanedData.length; i++){
    //     femaleAges.push(cleanedData[i].Female)
    //     console.log(femaleAges)
    // }
 
    // Method 2a
    // cleanedData.forEach(
    //     function(row){
    //         femaleAges.push(row.Female)
    //     }
    // )
    // Method 2b
    // cleanedData.forEach(
    // row => {femaleAges.push(row.Female)}
    //  )
 
    //Method 3a
    // let femaleAges = cleanedData.map(
    //     function(row){
    //         return row.Female
    //     }
    // )
 
        //Method 3b
    // let femaleAges = cleanedData.map(number => number.Female)
    // let filteredFemaleAges = femaleAges.filter(number => number > 3)
    // console.log(femaleAges)
    // console.log(filteredFemaleAges)
 
 
   
}

// class Friend {
//     constructor() {
//     this.name = "John";
//     this.number = 123;
//     }
// }

// class Friend {
//     constructor(_name, _number) {
//     this.name = _name;
//     this.number = _number;
//     }
//     report() {
//         console.log(this.name, this.number)

//     }
// }

let friends = [];
friends.push(new Friend("Dave", 289));
friends.push(new Friend("Roger", 119));
console.log(friends)
 
function cleanData() {
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }
    console.log(cleanedData); // Check if the data is cleaned properly
    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female) || 0;
        cleanedData[i].Male = parseInt(cleanedData[i].Male) || 0;
        cleanedData[i].Total = parseInt(cleanedData[i].Total) || 0;
    }
}