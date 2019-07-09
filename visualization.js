document.addEventListener("DOMContentLoaded", () => {
    d3.json("/cantons.json")
        .then(cantons => {
            d3.csv("/20170924_resulatate.csv")
                .then(yesVotes => {

                    const width = 1200;
                    const height = 1200;

                    const container = d3.select("#viz");

                    const svg = container.append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    const projection = d3.geoAlbers()
                        .center([0, 46.7])
                        .rotate([-9, 0, 0])
                        .parallels([40, 50])
                        .scale(12500);

                    const pathGenerator = d3.geoPath().projection(projection);

                    const colorScale = d3.scaleThreshold()
                        .domain([30, 35, 40, 45, 50, 55, 60, 65, 70, 100])
                        .range([
                            "#660066",
                            "#883988",
                            "#aa71aa",
                            "#ccaAcc",
                            "#dfd3df",
                            "#d9e2d3",
                            "#b8d4aa",
                            "#89b771",
                            "#599a39",
                            "#2a7d00"]);

                    const switzerland = svg.selectAll("path")
                        .data(cantons.features)
                        .enter()
                        .append("path")
                        .attr("d", pathGenerator)
                        .attr("fill", "#DDD")
                        .attr("stroke", "white")
                        .attr("fill", function (d) {
                            const voteMetaData = yesVotes.find(yesVote => yesVote.id == d.properties.id);

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
                        });

                    svg.append("text").attr("x", 810).attr("y", 130).text("% Ja-Stimmen").style("font-size", "15px",).attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 170).attr("r", 6).style("fill", "#660066");
                    svg.append("text").attr("x", 830).attr("y", 170).text("0% - 30%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 200).attr("r", 6).style("fill", "#883988");
                    svg.append("text").attr("x", 830).attr("y", 200).text("30% - 35%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 230).attr("r", 6).style("fill", "#aa71aa");
                    svg.append("text").attr("x", 830).attr("y", 230).text("35% - 40%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 260).attr("r", 6).style("fill", "#ccaAcc");
                    svg.append("text").attr("x", 830).attr("y", 260).text("40% - 45%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 290).attr("r", 6).style("fill", "#dfd3df");
                    svg.append("text").attr("x", 830).attr("y", 290).text("45% - 50%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 320).attr("r", 6).style("fill", "#d9e2d3");
                    svg.append("text").attr("x", 830).attr("y", 320).text("50% - 55%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 350).attr("r", 6).style("fill", "#b8d4aa");
                    svg.append("text").attr("x", 830).attr("y", 350).text("55% - 60%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 380).attr("r", 6).style("fill", "#89b771");
                    svg.append("text").attr("x", 830).attr("y", 380).text("60% - 65%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 410).attr("r", 6).style("fill", "#599a39");
                    svg.append("text").attr("x", 830).attr("y", 410).text("65% - 70%").style("font-size", "15px").attr("alignment-baseline", "middle");

                    svg.append("circle").attr("cx", 810).attr("cy", 440).attr("r", 6).style("fill", "#2a7d00");
                    svg.append("text").attr("x", 830).attr("y", 440).text("70% - 100%").style("font-size", "15px").attr("alignment-baseline", "middle");


                    const tooltip = container.append('div')
                        .style('opacity', 0)
                        .style('position', 'absolute')
                        .style('background', 'rgba(255, 255, 255, 0.8)')
                        .style('padding', '0.5rem')
                        .style('pointer-events', 'none');

                })

        })
})

