class BarChart {
    constructor(obj) {
      this.data = obj.data;
      this.xValue = obj.xValue || "Track";  // Default to Track
      this.yValues = obj.yValues || ["Spotify_Streams", "YouTube_Views"];  // Default to Spotify_Streams and YouTube_Views
      this.chartHeight = obj.chartHeight || 300;
      this.chartWidth = obj.chartWidth || 300;
      this.barWidth = obj.barWidth || 10;
      this.margin = obj.margin || 10;
      this.axisThickness = obj.axisThickness || 1;
      this.axisTickThickness = obj.axisTickThickness || 1;
    
      this.chartPosX = obj.xPos || 50;
      this.chartPosY = obj.yPos || 350;
    
      // Calculate gap between bars dynamically
      this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
    
      // Calculate max value from CSV data dynamically
      this.maxValue = Math.max(...this.data.map(row => 
        Math.max(...this.yValues.map(yValue => parseFloat(row[yValue]) || 0))
      ));
    
      // Calculate scaler
      this.scaler = this.chartHeight / this.maxValue;
    
      // Colors
      this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
      this.axisTickColour = color(0);  // Black (Ticks)
      this.barColours = [color(168, 230, 207), color(23, 32, 54)]; // Array of bar colors
      this.axisTextColour = color(0, 0, 0);  // Black for text
    
      this.numTicks = 10;
      this.tickLength = 10;
    }
    
    renderBars() {
      push();
      translate(this.chartPosX, this.chartPosY);
    
      push();
      translate(this.margin, 0);
      for (let i = 0; i < this.data.length; i++) {
        let xPos = (this.barWidth + this.gap) * i;
        let yOffset = 0;  // This will be used to stack bars on top of each other
    
        // Render bars for each yValue
        for (let j = 0; j < this.yValues.length; j++) {
          fill(this.barColours[j]);
          noStroke();
          let barHeight = this.data[i][this.yValues[j]] * this.scaler;
          rect(xPos, -yOffset, this.barWidth, -barHeight);
          yOffset += barHeight;  // Increment offset for the next bar
        }
    
        // Render track labels on X-axis
        push();
        fill(this.axisTextColour);
        textAlign(LEFT, CENTER);
        translate(xPos + (this.barWidth / 2), this.chartHeight + 10);
        rotate(60);
        text(this.data[i][this.xValue], 0, 0); // Track name
        pop();
      }
      pop();
      pop();
    }
    
    renderAxis() {
      push();
      translate(this.chartPosX, this.chartPosY);
      noFill();
      stroke(this.axisColour);
      strokeWeight(this.axisThickness);
      line(0, 0, 0, -this.chartHeight);  // Y-axis
      line(0, 0, this.chartWidth, 0);    // X-axis
      pop();
    }
    
    renderTicks() {
      push();
      translate(this.chartPosX, this.chartPosY);
      noFill();
    
      // Set stroke for tick marks
      stroke(this.axisTickColour);
      strokeWeight(this.axisTickThickness);
    
      let tickIncrement = this.chartHeight / this.numTicks;
      let valueIncrement = this.maxValue / this.numTicks;
    
      for (let i = 0; i <= this.numTicks; i++) {
        let y = -tickIncrement * i;
        let value = Math.floor(i * valueIncrement).toFixed(0); // Round values
    
        // Draw tick mark
        line(0, y, -this.tickLength, y);
    
        // Draw numerical indicator
        noStroke();
        fill(0);
        textAlign(RIGHT, CENTER);
        text(value, -this.tickLength - 5, y);
      }
    
      pop();
    }
    
    renderTitle() {
      push();
      translate(this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 20);
      fill(this.axisTextColour);
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Chart Title: Most Streamed Spotify Songs", 0, 0);
      pop();
    }
    
    render() {
      this.renderBars();
      this.renderAxis();
      this.renderTicks();
      this.renderTitle();
    }
  }
  