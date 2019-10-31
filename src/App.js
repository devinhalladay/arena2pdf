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
      loading: true
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: !this.state.loading }, () => {
      if (this.state.redirect === true) {
        this.setState({ redirect: false })
      }

      this.setState({ slug: this.chanInput.value }, () => {
        getArenaChannel(this.chanInput.value, 1).then(data => {
          this.setState({ ...data }, () => {
            this.setState({ loading: false }, () => {
              this.setState({ redirect: true }, () => {
                console.log(`loaded and redirected to ${this.state.slug}`);
              })
            })
          })
        }, reason => {
          // console.log(reason);
        })
      })
    })
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
                <input placeholder="Are.na channel URL" defaultValue="liquid-disintegration" type="text" ref={(input) => this.chanInput = input} />
                <input type="submit" value={"2pdf →"} />
              </form>
            </section>
          </div>

          {this.state.redirect ? <Redirect to={`/${this.state.slug}`} push /> : null}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} />}
            />
            <Route
            path={["/:channel"]}
            render={(props) => {
                if (this.state.loading) {
                  return (<div>Loading</div>)
                } else {
                  return (
                    <Viewer {...props}
                      metadata={this.state.originalChannelData}
                      blocks={this.state.collectedBlocks}
                      loading={this.state.loading}
                    />
                  )
                }
              }
            }
          />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}