
 var bardata = [25, 50, 75, 100, 20];
 var categories = ["chocolate", "vanilla", "strawberry", "sometimes", "mendel"]

var makeTheGraph = function(bardata, categories) {

bardata.sort(function compareNumbers(a,b){
  return a-b;
});

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
        .domain(d3.range(0, categories.length))
        .rangeBands([0, width])

 var tooltip = d3.select('body').append('div')
 .style('font-size', '14px')
 .style('position', 'absolute')
 .style('padding', '0 10px')
 .style('background', 'white')
 .style('opacity', 0)

var myChart = d3.select('body').append('svg')
   .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
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
  .on('mouseover', function(d, i){
    tooltip.transition()
    .style('opacity', .9)

    tooltip.html(categories[i] + " " + d +'%')
    .style('left', (d3.event.pageX) + 'px')
    .style('top', (d3.event.pageY) + 'px')



    tempColor = this.style.fill;
      d3.select(this)
      .style('opacity', .5)
      .style('fill', 'green')


    })
    .on('mouseout', function(d, i){
      setTimeout(800)
      tooltip.transition()
      .style('opacity', 0)

      d3.select(this)
      .style('opacity', 1)
      .style('fill', tempColor)
    })


    myChart.transition()
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .delay(function(d,i) {
      return i * 20;
    })
    .duration(1000)
    .ease('elastic')

console.log('made a graph')
}

makeTheGraph(bardata, categories)




var piedata = [
    {label: "Chocolate",
     value: 50
   },
    {label: "Vanilla",
     value: 35
   },
    {label: "Mendel",
     value: 15
   },
    {label: "Pistachio",
    value: 20
  }
   ]

var makeThePie = function(piedata) {

var width = 400,
    height = 400,
    radius = 200,
    colors = d3.scale.category20c();

var piedata = [
    {label: "Chocolate",
     value: 50
   },
    {label: "Vanilla",
     value: 35
   },
    {label: "Mendel",
     value: 15
   },
    {label: "Pistachio",
    value: 20
  }
   ]

   var pie = d3.layout.pie()
        .value(function(d) {
            return d.value;
        })

   var arc = d3.svg.arc()
      .outerRadius(radius)


   var myChart = d3.select('#piechart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
          .attr('transform', 'translate('+(width-radius)+','+(height-radius)+')')
          .selectAll('path').data(pie(piedata))
          .enter().append('g')
              .attr('class', 'slice')

    var slices = d3.selectAll('g.slice')
      .append('path')
      .attr('fill', function(d,i){
        return colors(i);
      })
      .attr('d', arc)



    var text = d3.selectAll('g.slice')
      .append('text')
      .text(function(d,i){
          console.log(d);
          return d.data.label + " " + d.data.value + '%';
      })
      .style('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('transform', function(d){
          d.innerRadius = 0;
          d.outerRadius = radius;
          return 'translate('+arc.centroid(d)+')'
      })
console.log('made a pie')
}

makeThePie(piedata)
