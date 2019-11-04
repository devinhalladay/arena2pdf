import React, { Component } from "react";
import Pdf from './Pdf';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    let re = /[^/]+(?=\/$|$)/;
    let chan = re.exec(window.location.href);

    this.props.getChannelData(chan);
  }

  render() {
    if (this.props.loading == false) {
      return (
        <Pdf 
          metadata={this.props.metadata}
          blocks={this.props.blocks}
        />
      )
    } else {
      return (
        <div className="loading-screen">
          <h2>Loading...</h2>
        </div>
      )
    }
  }
}