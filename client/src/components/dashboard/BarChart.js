import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusable-components/styledComponents";
import * as d3 from "d3";
import styled from "styled-components";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const nums = [25, 30, 45, 60, 20, 64, 75];

    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(nums.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale).ticks(data.applied);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(nums)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (v, i) => xScale(i))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", v => 150 - yScale(v));
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

export default connect(mapStateToProps)(BarChart);

//todo - does the d3 fetch really need to be in any other component than this?
