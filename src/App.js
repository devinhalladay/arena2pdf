import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
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
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.redirect === true) {
      this.setState({ redirect: false })
    }

    this.setState({ slug: this.chanInput.value })

    console.log(this.state.slug);
    

    getArenaChannel(this.chanInput.value, 1).then(data => {
      this.setState({ ...data }, () => {
        this.setState({ redirect: true }, () => {
          console.log('redirected');
        })
      })
    }, reason => {
      // console.log(reason);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div class="control-center">
            <div className="site-title">
              <Link to="/">arena2pdf</Link>
            </div>

            <section className="form">
              <form className="channel-url-form" onSubmit={this.handleSubmit}>
                <input placeholder="Are.na channel URL" defaultValue="liquid-disintegration" type="text" ref={(input) => this.chanInput = input} />
                <input type="submit" value={"2pdf →"} />
              </form>
            </section>
          </div>

          {this.state.redirect ? <Redirect to={`/${this.state.slug}`} push /> : ''}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} />}
            />
            <Route
            path={["/:channel"]}
            render={(props) =>
              <Viewer {...props}
                metadata={this.state.originalChannelData}
                blocks={this.state.collectedBlocks}
              />
            }
          />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}