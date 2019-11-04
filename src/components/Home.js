import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <section className="info">
          <p>Download a customizable PDF of any Are.na channel! Another <a href="https://github.com/devinhalladay/arena2pdf" target="_blank" rel="noopener noreferrer">free, open tool</a> created for <a href="https://www.are.na/explore/" target="_blank" rel="noopener noreferrer">all of you</a> by <a href="https://www.are.na/devin-halladay" target="_blank" rel="noopener noreferrer">@devin-halladay</a>. Demo time!</p>
          <p><svg viewBox="0 0 68 8">
            <defs>
              <path id="curve" d="M1 7C3.72841 6.46763 6.35387 5.54841 9.11111 5.09722C11.4433 4.71559 13.7807 4.46658 16.125 4.1875C19.3427 3.80445 22.6471 4 25.8819 4C29.5052 4 33.1823 3.94722 36.7917 4.22222C38.4026 4.34496 40.0508 4.25 41.6667 4.25C43.7331 4.25 45.7893 4.28837 47.8472 4.0625C54.0411 3.38268 62 3.5 67.5 0.5"></path>
            </defs>
            <text width="1000" fill="url(#gradientFill)">
              <textPath href="#curve">If you liked this, you might also like:</textPath>
            </text>
          </svg></p>
          {/* <p className="wonky">If you liked this, you may also like:</p> */}
          <ul>
            <li><a href="https://differance.network" target="_blank" rel="noopener noreferrer">Différance.Network</a> — An Are.na application for comparing two randomly chosen blocks from a given channel. You can use it to generate unexpected ideas from related content :o</li>
            <li><a href="https://intertwingled.network" target="_blank" rel="noopener noreferrer">Intertwingled.Network</a></li>
          </ul>
        </section>
      </div>
    )
  }
}