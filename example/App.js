import React, { Component } from 'react';
import Sunburst from 'react-sunburst-d3-v4';
import data from './data';

class App extends Component {
  onSelect(event){
    console.log(event);
  }
  render() {
    return (
      <div className="App">
        <Sunburst
          data={data}
          onSelect={this.onSelect}
          scale="linear" // or exponential
          tooltipContent={<div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" />} // eslint-disable-line
          tooltip
          tooltipPosition="right"
          keyId="anagraph"
          width="480"
          height="400"
        />
      </div>
    );
  }
}

export default App;
