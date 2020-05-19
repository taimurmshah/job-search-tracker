import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusable-components/styledComponents";
import * as d3 from "d3";
import styled from "styled-components";

const BarChart2 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // const nums = [25, 30, 45, 60, 20, 64, 75];
    const nums = Object.values(data);
    const names = Object.keys(data);

    let margin = { left: 80, right: 20, top: 50, bottom: 100 };

    //what is the reason for these?
    let width = 700; //- margin.left - margin.right;
    let height = 400; //- margin.top - margin.bottom;
    const svg = d3
      .select(svgRef.current)
      .attr("height", height /* + margin.top + margin.bottom */)
      .attr("width", width /* + margin.left + margin.right*/);

    //scales
    let x = d3
      .scaleBand()
      .domain(names)
      .range([0, width]);

    let y = d3
      .scaleLinear()
      .domain([0, Math.ceil(nums[0] / 10) * 10]) //want to have the domain as number of jobs applied to rounded to nearest top 10
      .range([height, 0]); //range value is the value of the length of the y axis

    //axes
    let xAxisCall = d3.axisBottom(x);
    svg
      .select(".x-axis")
      // .style("transform", `translate(0, ${height})`)
      .style("transform", `translateY(${height}px)`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "20")
      .attr("font-size", "15");

    let yAxisCall = d3.axisLeft(y);
    svg.select(".y-axis").call(yAxisCall);
  }, [data]);

  return (
    <HeaderContainer>
      <SVG ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </SVG>
    </HeaderContainer>
  );
};

const SVG = styled.svg`
  background: #eee;
  overflow: visible;
  margin-bottom: 100px;
`;

const mapStateToProps = state => ({ data: state.job.jobsProgress });

export default connect(mapStateToProps)(BarChart2);

//todo - does the d3 fetch really need to be in any other component than this?
