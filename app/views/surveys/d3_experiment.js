<script>
 var bardata = [25, 50, 75, 100, 20, 90, 10, 5, 40, 12, 1];



 var height = 300,
 width = 400,
 barWidth = 50,
 barOffset = 5;

 var colors = d3.scale.linear()
    .domain([0, bardata.length-10, d3.max(bardata)])
    .range(['#9b59b6', '#8e44ad', '#2c3e50'])

 var tempColor;

 var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height])


 var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width])

 var tooltip = d3.select('body').append('div')
 .style('position', 'absolute')
 .style('padding', '0 10px')
 .style('background', 'white')
 .style('opacity', 0)

d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    .style('fill', colors)
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('x', function(d,i) {
        return xScale(i);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
  .on('mouseover', function(d){
    tooltip.transition()
    .style('opacity', .9)

    tooltip.html(d +'%')
    .style('left', (d3.event.pageX) + 'px')
    .style('top', (d3.event.pageY) + 'px')


    tempColor = this.style.fill;
      d3.select(this)
      .style('opacity', .5)
      .style('fill', 'green')
  })
  .on('mouseout', function(d){
    d3.select(this)
    .style('opacity', 1)
    .style('fill', tempColor)
  })
</script>