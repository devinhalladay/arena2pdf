import React, { Component } from "react";
import Pages from './Pages';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

export default class Viewer extends Component {
  shouldComponentUpdate() {
    return false
  }
  
  render() {
    return (
      <div className="container hug-top">
        <PDFViewer>
          <Pages metadata={this.props.metadata} blocks={this.props.blocks} />
        </PDFViewer>
      </div>
    )
  }
}