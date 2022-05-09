3.json("samples.json").then((data1) => {
  function draw_bar(data,otu_index) {

    var trace1 = {
       x: data.samples[otu_index].sample_values.slice(0,10),
       
       y: data.samples[otu_index].otu_ids.map(d => 'UTO '+d).slice(0,10),
       text:data.samples[otu_index].otu_labels.slice(0,10),
       type: "bar",
       name: "Belly Button",
       orientation: 'h',
       boxpoints: "all"
     };
   
     // Create the data array for the plot
     var data = [trace1];
   
     // Define the plot layout
     var layout = {
       title: "Top 10 OTU",
       xaxis: { title: "OTU Sample Value" },
       yaxis: { title: "OTU id" }
     };
   
     // Plot the chart to a div tag with id "plot"
     Plotly.newPlot("bar", data, layout);
    }

    function draw_bubble(data,otu_index) {

      var trace1 = {
         x: data.samples[otu_index].otu_ids,
         
         y: data.samples[otu_index].sample_values,
         text:data.samples[otu_index].otu_labels,
         mode: "markers",
         marker: {
          color :data.samples[otu_index].otu_ids,
          size: data.samples[otu_index].sample_values
        }
         
       };
     
       // Create the data array for the plot
       var data = [trace1];
     
       // Define the plot layout
       var layout = {
         //title: "Top 10 OTU",
         //xaxis: { title: "OTU Sample Value" },
         xaxis: { title: "OTU id" }
       };
     
       // Plot the chart to a div tag with id "plot"
       Plotly.newPlot("bubble", data, layout);
      }

  //function to display the demographics
  function demographics(data,otu_index){
    //select the proper data to display
    var display_data=data.metadata[otu_index];

    d3.selectAll(".temp").remove();
    Object.entries(display_data).forEach(([key, value])=>{
      var display_text=` ${key}: ${value}`;
      d3.select("#sample-metadata")
        
        .append("p")
        .classed("temp",true)
        .attr("font-weight",150)
        .text(display_text);
    });



  }

  function Challenge(data,otu_index){
    // Enter a speed between 0 and 180
    data.metadata[otu_index].wfreq
var level = data.metadata[otu_index].wfreq*20;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .6;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
    { 
      
      values: [50/9, 50/9, 50/9, 50/9,50/9, 50/9,50/9,50/9,50/9,50],
      rotation: 90,
      text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1',''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(133, 180, 138, 1)', 'rgba(138, 187, 143, 1)',
                             'rgba(140, 191, 136, 1)', 'rgba(183, 204, 146, 1)',
                             'rgba(213, 228, 157, 1)', 'rgba(229, 231, 179, 1)',
                             'rgba(233, 230, 202, 1)', 'rgba(248, 243, 236, 1)',
                             'rgba(200, 200, 200, 0.5)','rgba(255, 255, 255, 0)']},
      labels: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1',''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
    
    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',

      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };
    
    Plotly.newPlot('gauge', data, layout);

  }



  // This function is called when a dropdown menu item is selected
  function  optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var selected_index = dropdownMenu.property("value");
    console.log(selected_index)
    draw_bar(data1,selected_index);
    demographics(data1,selected_index);
    Challenge(data1,selected_index);
    draw_bubble(data1,selected_index);
  }




// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);


//select the first 10 names in our data and insert it to the drop dwon object
var options = data1.names.slice(0,10);

options.forEach(function(d,i){
    d3.select("#selDataset")
      .append("option")
      .attr("value",i)
      .text(d);
  })

  console.log(JSON.stringify(data1));
  Challenge(data1,0);

});