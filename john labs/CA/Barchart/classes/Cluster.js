class ClusterBarChart {
    constructor(data, options = {}) {
        this.data = data;
        this.options = options;
        this.initChart();
    }

    initChart() {
        // Initialize chart properties
        this.width = this.options.width || 800;
        this.height = this.options.height || 600;
        this.margin = this.options.margin || { top: 20, right: 30, bottom: 40, left: 40 };
        this.colors = this.options.colors || d3.schemeCategory10;

        // Create SVG element
        this.svg = d3.select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.createScales();
        this.createAxes();
        this.drawBars();
    }

    createScales() {
        this.x0 = d3.scaleBand()
            .domain(this.data.map(d => d.category))
            .rangeRound([0, this.width - this.margin.left - this.margin.right])
            .paddingInner(0.1);

        this.x1 = d3.scaleBand()
            .domain(this.data[0].values.map(d => d.name))
            .rangeRound([0, this.x0.bandwidth()])
            .padding(0.05);

        this.y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d3.max(d.values, v => v.value))])
            .nice()
            .rangeRound([this.height - this.margin.top - this.margin.bottom, 0]);
    }

    createAxes() {
        this.xAxis = d3.axisBottom(this.x0);
        this.yAxis = d3.axisLeft(this.y);

        this.svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
            .call(this.xAxis);

        this.svg.append('g')
            .attr('class', 'y-axis')
            .call(this.yAxis);
    }

    drawBars() {
        const category = this.svg.selectAll('.category')
            .data(this.data)
            .enter().append('g')
            .attr('class', 'category')
            .attr('transform', d => `translate(${this.x0(d.category)},0)`);

        category.selectAll('rect')
            .data(d => d.values)
            .enter().append('rect')
            .attr('x', d => this.x1(d.name))
            .attr('y', d => this.y(d.value))
            .attr('width', this.x1.bandwidth())
            .attr('height', d => this.height - this.margin.top - this.margin.bottom - this.y(d.value))
            .attr('fill', (d, i) => this.colors[i]);
    }
}