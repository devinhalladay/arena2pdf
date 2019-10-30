import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Switch } from 'react-router';
import axios from 'axios';
import './App.css';

import Home from "./components/Home";
import Viewer from "./components/Viewer";

const apiInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache'
};

let currentPage;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      slug: '',
      originalChannelData: [],
      collectedBlocks: [],
    }

    this.apiCall = this.apiCall.bind(this);
    this.getArenaChannel = this.getArenaChannel.bind(this);
  }

  async apiCall(channel, page) {
    let res = await axios.get(`https://api.are.na/v2/channels/${this.state.slug}?per=100&page=${page}`);
    let data = await res.data;
    return data;
  }

  getArenaChannel(url, page, e) {
    e.preventDefault();
    
    currentPage = page;
    let pageCount;

    this.setState({ slug: url }, () => {
      this.apiCall(url, currentPage)
        .then(data => {
          this.setState({ originalChannelData: data, collectedBlocks: data.contents }, () => {
            pageCount = Math.ceil(data.length / data.per);

            for (let i = currentPage; i < pageCount; i++) {
              currentPage++;
              this.apiCall(url, currentPage)
                .then(data => {
                  this.setState({ 
                    collectedBlocks: [...this.state.collectedBlocks, ...data.contents]
                  }, () => {
                    this.setState({ redirect: true })
                  });
                });
            }
          });
        });
    });
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
              <form className="channel-url-form" onSubmit={(e) => this.getArenaChannel(this.chanInput.value, 1, e)}>
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