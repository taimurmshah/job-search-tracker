import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusable-components/styledComponents";
import * as d3 from "d3";
import styled from "styled-components";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    const max = data[0].number;
    const returnPercent = n => {
      if (n === 0) return "";
      if (n < max) {
        const p = (n / max) * 100;
        return p > 10
          ? p.toString().slice(0, 4) + "%"
          : p.toString().slice(0, 3) + "%";
      } else return max;
    };

    // let margin = { left: 80, right: 20, top: 50, bottom: 100 };

    let width = 800; //- margin.left - margin.right;
    let height = 500; //- margin.top - margin.bottom;
    const svg = d3
      .select(svgRef.current)
      .attr("height", height /* + margin.top + margin.bottom */)
      .attr("width", width /* + margin.left + margin.right*/);

    //scales
    let x = d3
      .scaleBand()
      .domain(data.map(d => d.stage))
      .range([0, width]);

    data.forEach(d => {
      console.log("x(d.stage):", x(d.stage));
    });

    let y = d3
      .scaleLinear()
      .domain([0, Math.ceil(data[0].number / 10) * 10]) //want to have the domain as number of jobs applied to rounded to nearest top 10
      .range([height, 0]); //range value is the value of the length of the y axis

    //y lines
    const makeYLines = () => d3.axisLeft().scale(y);
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

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
      .attr("font-size", "30px")
      .attr("text-anchor", "middle")
      // .attr("transform", "rotate(-90)")
      .text("Job Hunt Progress");

    //y label
    svg
      .append("text")
      .attr("class", "d3-label")
      .attr("y", -60)
      .attr("x", -(height / 2))
      .attr("font-size", "25px")
      // .style("color", "white")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Companies");

    //bars
    svg
      .selectAll(".bar")
      .data(data)

      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", d => x(d.stage) + x.bandwidth() / 4)

      .attr("y", -height)
      .attr("width", x.bandwidth() / 2)
      // .on("mouseenter", () => {
      //   svg.selectAll(".tooltip").remove();
      // })
      // .on("mouseenter", v => {
      //   svg
      //     .selectAll(".num")
      //     .data([v.number])
      //     .join("text")
      //     .attr("class", "num")
      //     .text(v.number)
      //     .attr("fill", "#fff")
      //     .attr("x", x(v.stage) + x.bandwidth() / (v.number > 10 ? 2.3 : 2.9))
      //     .attr("y", y(v.number) + (v.number > 4 ? 20 : 17))
      //     .transition()
      //     .attr("opacity", 1);
      // })
      // .on("mouseleave", () => svg.selectAll(".tooltip").remove())
      .transition()
      .attr("height", d => height - y(d.number))
      .attr("fill", "#80cbc4 !important");

    const placement = n => {
      if (n === max) {
        if (n < 100) return 2.3;
        else return 2.6;
      } else return 2.7;
    };

    svg
      .selectAll(".tooltip")
      .data(data)
      .join("text")
      .attr("class", "tooltip")
      // .text(v => (v.number !== max ? returnPercent(v.number) + " %" : v.number))
      .text(v => returnPercent(v.number))
      .attr("fill", "#fff")
      // .attr("x", v => x(v.stage) + x.bandwidth() / (v.number > 10 ? 2.4 : 2.9))
      .attr("x", v => x(v.stage) + x.bandwidth() / placement(v.number))
      .attr("y", v => y(v.number) + (v.number > 4 ? 20 : 17))
      .transition()
      .attr("opacity", 1);
  }, [data]);

  return (
    <HeaderContainer>
      <ChartArea>
        <SVG ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </SVG>
      </ChartArea>
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

const mapStateToProps = state => ({ data: state.job.jobsProgress });

export default connect(mapStateToProps)(BarChart);

//todo - does the d3 fetch really need to be in any other component than this?
