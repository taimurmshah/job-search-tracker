import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusable-components/styledComponents";
import * as d3 from "d3";
import styled from "styled-components";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // const nums = [25, 30, 45, 60, 20, 64, 75];
    data = [
      { stage: "Applied", number: data.Applied },
      { stage: "Recruiter Call", number: data["Recruiter Call"] },
      { stage: "Code Challenge", number: data["Code Challenge"] },
      { stage: "Technical Call", number: data["Technical Call"] },
      { stage: "Onsite", number: data.Onsite },
      { stage: "Offer", number: data.Offer }
    ];

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
      .domain(data.map(d => d.stage))
      .range([0, width]);

    data.forEach(d => {
      console.log("x(d.stage):", x(d.stage));
    });

    let y = d3
      .scaleLinear()
      .domain([0, Math.ceil(data[0].number / 10) * 10]) //want to have the domain as number of jobs applied to rounded to nearest top 10
      .range([height, 0]); //range value is the value of the length of the y axis

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
    //x label
    svg
      .append("text")
      .attr("y", height + 70)
      .attr("x", width / 2)
      .attr("font-size", "30px")
      .attr("text-anchor", "middle")
      .text("Stages");

    //top x label
    svg
      .append("text")
      .attr("y", -15)
      .attr("x", width / 2)
      .attr("font-size", "30px")
      .attr("text-anchor", "middle")
      // .attr("transform", "rotate(-90)")
      .text("Job Hunt Progress");

    //bars
    svg
      .selectAll(".bar")
      .data(data)
      // .enter()
      // .append("rect")
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.stage) + x.bandwidth() / 4)
      .attr("y", d => y(d.number))
      .attr("height", d => height - y(d.number))
      .attr("width", x.bandwidth() / 2)
      .attr("fill", "grey");
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
`;

const ChartArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px
  height: 500px;
  width: 900px;
  border: black 1px solid;
  margin-bottom: 20px;
`;

const mapStateToProps = state => ({ data: state.job.jobsProgress });

export default connect(mapStateToProps)(BarChart);

//todo - does the d3 fetch really need to be in any other component than this?
