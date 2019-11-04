import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Switch } from 'react-router';
import { getArenaChannel } from './helpers/api';

import './App.css';

import Home from "./components/Home";
import Viewer from "./components/Viewer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: true
    }

    this.getChannelData = this.getChannelData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getChannelData = this.getChannelData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getChannelData(chan) {
    if (this.state.redirect === true) {
      this.setState({ redirect: false })
    }

    this.setState({ loading: true }, () => {
      this.setState({ slug: chan }, () => {
        this.setState({ redirect: true }, () => {
          getArenaChannel(this.state.slug, 1).then(data => {
            this.setState({ ...data }, () => {
              this.setState({ loading: false })
            })
          }, (reason) => {
            console.log(reason);
          })
        })
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let inputVal = this.chanInput.value;
    let re = /[^/]+(?=\/$|$)/;
    let inputSlug = re.exec(inputVal)[0];

    this.getChannelData(inputSlug);
  }

  handleInputChange(e) {
    this.setState({ chanInput: e.target.value });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="control-center">
            <div className="site-title">
              <Link to="/">arena2pdf</Link>
            </div>

            <section className="form">
              <form className="channel-url-form" onSubmit={this.handleSubmit}>
                <input placeholder="Are.na channel URL" defaultValue={this.state.slug} type="text" ref={(input) => this.chanInput = input} onChange={this.handleInputChange} />
                <input type="submit" value={"2pdf →"} disabled={!this.state.chanInput} />
              </form>
            </section>
          </div>

          {this.state.redirect ? <Redirect to={`/channel/${this.state.slug}`} push /> : null}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} />}
            />
            <Route
            path={["/:channel"]}
            render={(props) => {
                return (
                  <Viewer {...props}
                    metadata={this.state.originalChannelData}
                    blocks={this.state.collectedBlocks}
                    getChannelData={this.getChannelData}
                    loading={this.state.loading}
                  />
                )
              }
            }
          />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}