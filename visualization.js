
document.addEventListener("DOMContentLoaded", () => {
  d3.json("/cantons.json")
    .then(cantons => {
      d3.csv("/referendum.csv")
        .then(yesVotes => {

            const width = 1200;
            const height = 1200;

            const container = d3.select("#viz");

            const svg = container.append("svg")
                .attr("width", width)
                .attr("height", height)

            const projection = d3.geoAlbers()
                .center([0, 46.7])
                .rotate([-9, 0, 0])
                .parallels([40, 50])
                .scale(12500)

            const pathGenerator = d3.geoPath().projection(projection);

            const colorScale = d3.scaleThreshold()
                .domain([30,35,40,45,50,55,60,65,70,100])
                .range(["#d0001b", "#e0513c", "#ee7e5f", "#f7a684", "#fdceaa", "#d0e0af", "#a6c185", "#7da35b", "#538633", "#256900"])

            const switzerland = svg.selectAll("path")
                .data(cantons.features)
                .enter()
                .append("path")
                .attr("d", pathGenerator)
                .attr("fill", "#DDD" )
                .attr("stroke", "white")
                .attr("fill", function (d) {
                    const voteMetaData = yesVotes.find(yesVote => yesVote.id == d.properties.id)

                    return colorScale(voteMetaData.ja_anteil)
                })
                .on('mouseenter', function (d) {
                    tooltip
                        .style('opacity', 1)
                        .html(d.properties.name)
                })
                .on('mousemove', function (d) {
                    tooltip
                        .style('left', d3.event.pageX + 'px')
                        .style('top', d3.event.pageY + 'px')
                })
                .on('mouseleave', function () {
                    tooltip
                        .style('opacity', 0)
                })


            const tooltip = container.append('div')
                .style('opacity' , 0)
                .style('position' , 'absolute')
                .style('background' , 'rgba(255, 255, 255, 0.8)')
                .style('padding' , '0.5rem')
                .style('pointer-events' , 'none');

            })

        })
    })

