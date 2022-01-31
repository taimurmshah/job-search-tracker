import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusableComponents/styledComponents";
import * as d3 from "d3";
import styled from "styled-components";

const BarChart = ({ data, hasJobs }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    // let margin = { left: 80, right: 20, top: 50, bottom: 100 };

    let width = 800;
    let height = 500;
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width);

    //scales
    let x = d3
      .scaleBand()
      .domain(data.map((d) => d.stage))
      .range([0, width]);

    let y = d3
      .scaleLinear()
      .domain([0, Math.ceil(data[0].number / 10) * 10]) //want to have the domain as number of jobs applied to rounded to nearest top 10
      .range([height, 0]); //range value is the value of the length of the y axis

    //y lines
    const makeYLines = () => d3.axisLeft().scale(y);
    svg.append("g").attr("class", "grid");

    //axes
    let xAxisCall = d3.axisBottom(x);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "20")
      .attr("font-size", "15");

    let yAxisCall = d3.axisLeft(y);
    svg.select(".y-axis").call(yAxisCall);

    //labels
    //x label bottom
    svg
      .append("text")
      .attr("class", "d3-label")
      .attr("y", height + 70)
      .attr("x", width / 2)
      .attr("font-size", "25px")
      .attr("text-anchor", "middle")
      .text("Stages");

    //top x label
    svg
      .append("text")
      .attr("class", "d3-label")
      .attr("y", -15)
      .attr("x", width / 2)
      .attr("font-size", "6em")
      .attr("text-anchor", "middle")
      .text("Job Hunt Progress");

    //y label
    svg
      .append("text")
      .attr("class", "d3-label")
      .attr("y", -60)
      .attr("x", -(height / 2))
      .attr("font-size", "25px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Companies");

    const numPlacement = (n) => {
      if (n > 100) return 2.4;
      if (n > 10) return 2.3;
      return 2.16;
    };

    //bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (d) => x(d.stage) + x.bandwidth() / 4)
      .attr("y", -height)
      .attr("width", x.bandwidth() / 2)

      .on("mouseenter", function (barData, idx) {
        d3.selectAll(".bar").transition().duration(400).attr("opacity", 0);
        d3.select(this)

          .transition()
          .duration(400)
          .attr("opacity", 0.6);
      })
      .on("mouseleave", function () {
        d3.selectAll(".bar").transition().duration(400).attr("opacity", 1);
        d3.select(this).transition().duration(400).attr("opacity", 1);
      })
      .transition()
      .attr("height", (d) => height - y(d.number))

      .attr("fill", "#80cbc4 !important");

    // svg
    //     //   .selectAll(".tooltip")
    //     //   .data(data)
    //     //   .join("text")
    //     //   .attr("class", "tooltip")
    //     //   .text(v => (v.number > 0 ? v.number : null))
    //     //   .attr("fill", "#fff")
    //     //   .attr("x", v => x(v.stage) + x.bandwidth() / numPlacement(v.number))
    //     //   .attr("y", v => y(v.number) + (v.number > 4 ? 20 : 17))
    //     //   .transition()
    //     //   .attr("opacity", 1);
  }, [data]);

  return (
    <HeaderContainer>
      {hasJobs && (
        <ChartArea>
          <SVG ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
          </SVG>
        </ChartArea>
      )}
    </HeaderContainer>
  );
};

const SVG = styled.svg`
  background: #eee;
  overflow: visible;
  margin-bottom: 100px;
  background-color: #2f4a6d;
  @media screen and (prefers-color-scheme: light) {
    background-color: #2f4a6d;
  }
`;

const ChartArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px
  height: 650px;
  width: 1000px;
  margin-bottom: 100px;
  background-color: #2F4A6D;
  color: white;
  @media screen and (prefers-color-scheme: light) {
    background-color: #2f4a6d;
  }
`;

const mapStateToProps = (state) => ({
  data: state.job.jobsProgress,
  hasJobs: state.job.hasJobs,
});

export default connect(mapStateToProps)(BarChart);

//todo - does the d3 fetch really need to be in any other component than this?
