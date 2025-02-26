class ClusterBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.axisTickThickness = obj.axisTickThickness || 1;

        this.chartPosX = obj.xPos || 50;
        this.chartPosY = obj.yPos || 350;
        
        this.title = obj.title || "";  // ✅ Dynamic title

        // Calculate gap between bars dynamically
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        // Calculate max value from CSV data dynamically
        this.maxValue = Math.max(...this.data.map(row => parseFloat(row[this.yValue]) || 0));

        // Calculate scaler
        this.scaler = this.chartHeight / this.maxValue;

        // Colors
        this.axisColour = color(169, 169, 169);  // Light Gray (Axis)
        this.axisTickColour = color(0);  // Black (Ticks)
        this.axisTextColour = color(0, 0, 0);

        this.numTicks = 10;
        this.tickLength = 10;

        // Custom color palette
        this.barColors = [
            color("#74D3AE"), // Light Green
            color("#678D58"), // Olive Green
            color("#A6C48A"), // Muted Green
            color("#F6E7CB"), // Cream
            color("#DD9787")  // Soft Coral
        ];
        }
    }