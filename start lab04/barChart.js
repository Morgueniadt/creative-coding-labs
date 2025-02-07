class barChart {
	constructor(obj) {
		//Position and Size Properties
		this.x = obj.x;
		this.y = obj.y;
		this.w = obj.w;
		this.h = obj.h;

		//Data Propoerties
		this.data = obj.data;
		this.yAxisValue = obj.yAxisValue;
		this.xAxisLabel = obj.xAxisLabel;

		//Axis Properties
		this.axisLineColor = obj.axisLineColor;
		this.axisLineThickness = obj.axisLineThickness;

		//Bar Properties
		this.barWidth = obj.barWidth;
		this.barColor = obj.barColor;
	}

	render() {
		push();
		translate(this.x, this.y);
		strokeWeight(this.axisLineThickness);
		stroke(this.axisLineColor);
		line(0, 0, 0, -this.h);
		line(0, 0, this.w, 0);

		//prettier-ignore
		let gap = (this.w - (this.data.length * this.barWidth)) / (this.data.length + 1);
		let labels = this.data.map((d) => d[this.xAxisLabel]);

		//Draws the Bars and the labels
		push();
		translate(gap, 0);
		for (let i = 0; i < this.data.length; i++) {
			fill(this.barColor);
			let maxValues = this.data.map((d) => d[this.yAxisValue]);
			let maxValue = max(maxValues);
			let scale = this.h / maxValue;

			rect(0, 0, this.barWidth, -this.data[i][this.yAxisValue] * scale);

			push();
			noStroke();
			fill(0);
			textSize(15);
			textAlign(LEFT, CENTER);

			translate(this.barWidth / 2, 10);
			rotate(90);
			text(labels[i], 0, 0);
			pop();

			translate(this.barWidth + gap, 0);
		}
		pop();

		pop();
	}
}
