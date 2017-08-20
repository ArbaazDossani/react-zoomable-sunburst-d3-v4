
# react-zoomable-sunburst-d3-v4


Sunburst component built with React. It is build upon D3 V4 and CRA

### Installation

```bash
npm i react-sunburst-d3-v4
```

### Example

```js
import Sunburst from 'react-sunburst-d3-v4';

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
          scale="linear"
          tooltipContent={ <div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" /> }
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
```

|    Property    | Type  |          Description          | Working |
| -------------  | ----  |          -----------          | ------- |
| data           | Array | Typically same for every Sunburst Chart | Yes |
| scale          | String |Options: linear / exponential - Linear renders each arc with same radii, Exponential reduces gradually by SquareRoot | Yes |
| tooltip | bool | Display Tooltip or not | Yes |
| tooltipContent | HTMLNode | Customized Node for Tooltip rendering | Yes |
| keyId | string | Unique Id for Chart SVG | Yes |
| width | Integer | Width of the Chart Container | Yes |
| height | Integer | Height of the Chart Container | Yes |

### Methods
* `onSelect()`   - Function - Called on Arc Click for re-rendering the chart and passing back to User as props

###
TODO:
1. Add Label Content & Customized Label Content


###
Check out the Example folder for Customized Usage
