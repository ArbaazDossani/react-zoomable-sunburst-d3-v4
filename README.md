
# react-zoomable-sunburst-d3-v4


Sunburst component built with React. It is build upon D3 V4 and CRA

### Installation

```bash
npm i react-sunburst-d3-v4
```
### Demo
[![Watch the video](https://drive.google.com/file/d/0B8u1TA7r4bhEVGlCTTEzVHFheEU/view)](https://drive.google.com/file/d/0B8u1TA7r4bhEVGlCTTEzVHFheEU/view)

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
2. UI UX improvements
3. Add Color and Label options from user input props
4. Smooth animation on Click
5. Bar charte line chart, pie chart, multiple line graphs

###
Check out the Example folder for Customized Usage
