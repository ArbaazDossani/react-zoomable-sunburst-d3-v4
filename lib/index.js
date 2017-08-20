'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lang = require('lodash/lang');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sunburst Chart React Stateless Component with the following allowable Props *
 * data => JSON Array - Typically same for every Sunburst Chart *
 * scale => String - Options: linear | exponential - Linear renders each arc with same radii, Exponential reduces gradually by SquareRoot *
 * onSelect => Function - Called on Arc Click for re-rendering the chart and passing back to User as props *
 * tooltip => Boolean - Display Tooltip or not *
 * tooltipContent => HTMLNode - Customized Node for Tooltip rendering *
 * keyId => String - Unique Id for Chart SVG *
 * width => Integer - Width of the Chart Container *
 * height => Integer - Height of the Chart Container *
 */
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderSunburst(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _lang.isEqual)(this.props, nextProps)) {
        this.renderSunburst(nextProps);
      }
    }
  }, {
    key: 'arcTweenData',
    value: function arcTweenData(a, i, node, x, arc) {
      // eslint-disable-line
      var oi = d3.interpolate({ x0: a.x0s ? a.x0s : 0, x1: a.x1s ? a.x1s : 0 }, a);
      function tween(t) {
        var b = oi(t);
        a.x0s = b.x0; // eslint-disable-line
        a.x1s = b.x1; // eslint-disable-line
        return arc(b);
      }
      if (i === 0) {
        var xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
        return function (t) {
          x.domain(xd(t));
          return tween(t);
        };
      } else {
        // eslint-disable-line
        return tween;
      }
    }
  }, {
    key: 'update',
    value: function update(root, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node, self) {
      // eslint-disable-line
      if (firstBuild) {
        // eslint-disable-line
        var arcTweenZoom = function arcTweenZoom(d) {
          // eslint-disable-line
          var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
              // eslint-disable-line
          yd = d3.interpolate(y.domain(), [d.y0, 1]),
              yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
          return function (data, i) {
            return i ? function () {
              return arc(data);
            } : function (t) {
              x.domain(xd(t));y.domain(yd(t)).range(yr(t));return arc(data);
            };
          };
        };

        var click = function click(d) {
          // eslint-disable-line
          node = d; // eslint-disable-line
          self.props.onSelect && self.props.onSelect(d);
          svg.selectAll('path').transition().duration(1000).attrTween('d', arcTweenZoom(d));
        };

        firstBuild = false;
        var tooltipContent = self.props.tooltipContent;
        var tooltip = d3.select('#' + self.props.keyId).append(tooltipContent ? tooltipContent.type : 'div').style('position', 'absolute').style('z-index', '10').style('opacity', '0');
        if (tooltipContent) {
          Object.keys(tooltipContent.props).forEach(function (key) {
            tooltip.attr(key, tooltipContent.props[key]);
          });
        }
        svg.selectAll('path').data(partition(root).descendants()).enter().append('path').style('fill', function (d) {
          var hue = void 0;
          var current = d;
          if (current.depth === 0) {
            return '#33cccc';
          }
          if (current.depth <= 1) {
            hue = hueDXScale(d.x0);
            current.fill = d3.hsl(hue, 0.5, 0.6);
            return current.fill;
          }
          current.fill = current.parent.fill.brighter(0.5);
          var hsl = d3.hsl(current.fill);
          hue = hueDXScale(current.x0);
          var colorshift = hsl.h + hue / 4;
          return d3.hsl(colorshift, hsl.s, hsl.l);
        }).attr('stroke', '#fff').attr('stroke-width', '1').on('click', function (d) {
          return click(d, node, svg, self, x, y, radius, arc);
        }).on('mouseover', function (d) {
          if (self.props.tooltip) {
            d3.select(this).style('cursor', 'pointer');
            tooltip.html(function () {
              var name = utils.formatNameTooltip(d);return name;
            });
            return tooltip.transition().duration(50).style('opacity', 1);
          }
          return null;
        }).on('mousemove', function () {
          if (self.props.tooltip) {
            tooltip.style('top', d3.event.pageY - 50 + 'px').style('left', (self.props.tooltipPosition === 'right' ? d3.event.pageX - 100 : d3.event.pageX - 50) + 'px');
          }
          return null;
        }).on('mouseout', function () {
          if (self.props.tooltip) {
            d3.select(this).style('cursor', 'default');
            tooltip.transition().duration(50).style('opacity', 0);
          }
          return null;
        });
      } else {
        svg.selectAll('path').data(partition(root).descendants());
      }
      svg.selectAll('path').transition().duration(1000).attrTween('d', function (d, i) {
        return self.arcTweenData(d, i, node, x, arc);
      });
    }
  }, {
    key: 'renderSunburst',
    value: function renderSunburst(props) {
      if (props.data) {
        var self = this,
            // eslint-disable-line
        gWidth = props.width,
            gHeight = props.height,
            radius = Math.min(gWidth, gHeight) / 2 - 10,
            svg = d3.select('svg').append('g').attr('transform', 'translate(' + gWidth / 2 + ',' + gHeight / 2 + ')'),
            x = d3.scaleLinear().range([0, 2 * Math.PI]),
            y = props.scale === 'linear' ? d3.scaleLinear().range([0, radius]) : d3.scaleSqrt().range([0, radius]),
            partition = d3.partition(),
            arc = d3.arc().startAngle(function (d) {
          return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
        }).endAngle(function (d) {
          return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
        }).innerRadius(function (d) {
          return Math.max(0, y(d.y0));
        }).outerRadius(function (d) {
          return Math.max(0, y(d.y1));
        }),
            hueDXScale = d3.scaleLinear().domain([0, 1]).range([0, 360]),
            rootData = d3.hierarchy(props.data);
        var firstBuild = true;
        var node = rootData;
        rootData.sum(function (d) {
          return d.size;
        });
        self.update(rootData, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node, self); // GO!
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: this.props.keyId, className: 'text-center' },
        _react2.default.createElement('svg', { style: { width: parseInt(this.props.width, 10) || 480, height: parseInt(this.props.height, 10) || 400 }, id: this.props.keyId + '-svg' })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;


_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));
