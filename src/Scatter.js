import React from 'react';
import * as d3 from 'd3';

class Scatter extends React.Component{
    
    componentDidMount(){

        var req = new XMLHttpRequest();
        req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', false);
        req.send();

        let data = {};
        data = JSON.parse(req.responseText);

        this.drawBarChart(data)
    }

    drawBarChart(data){  
        const canvasHeight = 710
        const canvasWidth = 1200
        const axis = 50

        var tooltip = d3.select(".toolt").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);


        var overlay = d3.select('.toolt').append('div')
        .attr('class', 'overlay')
        .style('opacity', 0);

        const svgCanvas = d3.select("div")
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .attr("id", "tooltip")
        .style("border", "1px solid black")
        .style("padding", "10px 10px")
        .style("margin", "20px 50px")

        var years = data.map(function (item) {
            return item.Year;
        })

        var time = data.map(function (item) {
            //item.Place = +item.Place;
            var parsedTime = item.Time.split(':');
            item.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
            return item.Time;
        })

        var xScale = d3.scaleTime()
            .domain([d3.min(years), d3.max(years)])
            .range([axis, canvasWidth-100]);

        var yScale = d3.scaleTime()
            .domain([d3.min(time), d3.max(time)])
            .range([100, canvasHeight-axis])


        var timeFormat = d3.timeFormat("%M:%S");

        var x_axis = d3.axisBottom(xScale).tickFormat(d3.format("d"))

        var y_axis = d3.axisLeft(yScale).tickFormat(timeFormat)


        svgCanvas.append("g")
            .attr("transform", "translate(0,"+(canvasHeight-axis) + " )")
            .attr("id", "x-axis")
            .call(x_axis)

        svgCanvas.append("g")
            .attr("transform", "translate("+ axis + ", 0)")
            .attr("id", "y-axis")
            .call(y_axis)

        svgCanvas.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d,i) => xScale(d.Year))
            .attr("cy", (d,i) => yScale(d.Time))
            .attr("r", 5)
            .attr("class", "dot")
            .attr('data-xvalue', function(d, i) {
                return d.Year
            })
            .attr('data-yvalue', function(d, i) {
                return d.Time
            })
            .on("mouseover", function(datapoint, iteration) {            
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(datapoint.Year + '<br>' + datapoint.Time)
                    .attr('data-year', datapoint.Year)
            })
            .on("mouseout", function (d,i) {
                tooltip.transition()
                .duration(200)
                .style('opacity', 0);
                overlay.transition()
                    .duration(200)
                    .style('opacity', 0);
            })

    }

    render(){
        return(
            <div>
                <h1 id="title">Scatter</h1>
                <h2 id="legend">Legend</h2>
                <div className="toolt">
                </div>
            </div>
        )
    }
}

export default Scatter;