import * as d3 from 'd3';

function formatNumberTooltip(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function formatNameTooltip(d) {
  const name = d.data.name;
  return `${name}<br> (${formatNumberTooltip(d.value)})`;
}
export function computeTextRotation(d, x) {
  if (d.depth !== 0) {
    return ((x((d.x0 + d.x1) / 2) - (Math.PI / 2)) / Math.PI) * 180;
  }
  return 0;
}
export function wrap() {
  const self = d3.select(this);
  let textLength = self.node().getComputedTextLength();
  let text = self.text();
  while (textLength > (20) && text.length > 0) {
    text = text.slice(0, -1);
    self.text(`${text}...`);
    textLength = self.node().getComputedTextLength();
  }
}
export function handleClick(SVG, RADIUS, ARC, x, y, d, text, context) {
  const self = context;
  text.transition().attr('opacity', 0);
  SVG.transition()
    .duration(750)
    .tween('scale', () => {
      const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
      const yd = d3.interpolate(y.domain(), [d.y0, 1]);
      const yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, RADIUS]);
      return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
    })
    .selectAll('path')
    .attrTween('d', select => function () { return ARC(select); })
    .on('end', function (e) {
      if (e.x0 > d.x0 && e.x0 < d.x1 && e.depth <= 3) {
        const arcText = d3.select(this.parentNode).select('text');
        arcText.transition().duration(750)
            .attr('opacity', 1)
            .attr('class', 'visible')
            .attr('transform', () => `rotate(${computeTextRotation(e, x)})`)
            .attr('x', select => y(select.y0))
            .text(select => self.props.label ? select.data.name : '') // eslint-disable-line no-confusing-arrow
            .each(wrap);
      }
    })
    .selectAll('path')
    .attrTween('d', tweenedData => function () { return ARC(tweenedData); });
  self.props.onSelect(d);
}
