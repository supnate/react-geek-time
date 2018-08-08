import React, { Component } from "react";
import _ from "lodash";
import { Button } from "antd";
import * as d3 from "d3";
const data = require("./data.json");

require("./D3Sample.css");

const width = 600;
const height = 600;

export default class D3Sample extends Component {
  state = {
    data,
  };
  componentDidMount() {
    this.svg = d3
      .select(this.d3Node)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    this.linksGroup = this.svg.append("g");
    this.nodesGroup = this.svg.append("g");

    this.updateDiagrarm();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data !== prevState.data) this.updateDiagrarm();
  }
  updateDiagrarm() {
    const { data } = this.state;
    let link = this.linksGroup
      .attr("class", "links")
      .selectAll("line")
      .data(data.links);
    link.exit().remove();
    link = link
      .enter()
      .append("line")
      .attr("stroke-width", function(d) {
        return Math.sqrt(d.value);
      })
      .merge(link);

    let node = this.nodesGroup
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes);
    node.exit().remove();
    node = node
      .enter()
      .append("circle")
      .attr("r", d => (d.id === "id1" ? 24 : 16))
      .attr("fill", d => {
        return this.color(d.group);
      })
      .call(
        d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended),
      )
      .merge(node);

    this.simulation.nodes(data.nodes).on("tick", ticked);

    this.simulation
      .force("link")
      .links(data.links)
      .distance(100);

    this.simulation.alpha(1).restart();

    function ticked() {
      link
        .attr("stroke", "#c7c7c7")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);
    }
  }

  dragstarted = d => {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
  dragged = d => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  dragended = d => {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  handleAddNode = () => {
    const id = `id${new Date().getTime()}`;
    const node = { id, group: _.random(1, 9) };
    this.setState({
      data: {
        nodes: [...this.state.data.nodes, node],
        links: [
          ...this.state.data.links,
          { source: "id1", target: id, value: 1 },
        ],
      },
    });
  };
  render() {
    return (
      <div className="d3-sample">
        <div style={{ margin: "0 0 20px 0" }}>
          <Button onClick={this.handleAddNode}>Add node</Button>
        </div>
        <div className="d3-node" ref={node => (this.d3Node = node)} />
      </div>
    );
  }
}
