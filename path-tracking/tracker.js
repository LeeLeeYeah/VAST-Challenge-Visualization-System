var width;
    width = 593;
    texth = 120;
var height;
    height = 589;
var dw;
    dw = width/100;
var dh;
    dh = height/100;
var svg = d3.select("#chart1").append("svg")
        .attr("width", width+texth)
        .attr("height", height)
        .attr("style","background-image: url('Map3.png'); background-repeat:no-repeat; align: center; padding-top:10px; padding-left:9px");
        //.attr("background-image", "url('Park Map.jpg')");
var userid = location.search.split('userid=')[1];
document.title= userid;
console.log(userid);
var dataset;
dataset = [];

minspeed = 1000;
  maxspeed = 0;

d3.csv("csvdata/"+userid+".csv", function(data) {
  dataset = data.map(function(d) {
    return [ +d["X"], +d["Y"], d["Timestamp"], d["type"] ];
  });
  for (i = 1; i < dataset.length; i++) {
    var time2 = new Date(dataset[i][2]);
    var time1 = new Date(dataset[i-1][2]);
    var x1 = dataset[i-1][0]*dw;
    var y1 = (100 - dataset[i-1][1])*dh;
    var x2 = dataset[i][0]*dw;
    var y2 = (100 - dataset[i][1])*dh;
    var dist = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    var speed = dist / (time2 - time1);
    minspeed = Math.min(minspeed, speed);
    maxspeed = Math.max(maxspeed, speed);
  };

   // minspeed = 0;
   // maxspeed = 0.001;

  console.log(minspeed);
  console.log(maxspeed);
  quantize = d3.scale.quantize()
    .domain([minspeed, maxspeed])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  //var caData;
  caData = new Array(dataset.length-1);
  for (i = 1; i < dataset.length; i++) {
    caData[i-1] = new Object();
    var time2 = new Date(dataset[i][2]);
    var time1 = new Date(dataset[i-1][2]);
    caData[i-1].timestamp = (new Date(dataset[i-1][2])).Format("M-d hh:mm");
    var x1 = caData[i-1].x1 = dataset[i-1][0]*dw;
    var y1 = caData[i-1].y1 = (100 - dataset[i-1][1])*dh;
    var x2 = caData[i-1].x2 = dataset[i][0]*dw;
    var y2 = caData[i-1].y2 = (100 - dataset[i][1])*dh;
    caData[i-1].movement = dataset[i-1][3];
    var dist = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    var speed = caData[i-1].speed = dist / (time2 - time1);
    console.log(dist,time2,time2);
    //console.log(quantize(speed));
    var red = d3.rgb(255,128,128);
    var blue = d3.rgb(128,128,128);
    color = d3.interpolate(blue,red);        //颜色插值函数
    var circle = svg.append("circle")
                      .attr("cx", x2)
                      .attr("cy", y2)
                      .attr("r", "10")
                      .attr("opacity", "0")
                      .attr("id", "mycircle"+ i);
    var line = svg.append("line")
                  .attr("x1", x1)
                  .attr("y1", y1)
                  .attr("x2", x1)
                  .attr("y2", y1)
                  /*.attr("class", function(d) {
                    return quantize(speed);
                  })*/
                  .attr("id","myline"+ i);
                }

        var scan = new Array(1);
        var scantext = svg.selectAll(".TimeText")
            .data(scan)
            .enter()
            .append("text")
            .attr("class","TimeText")
            .attr({'text-anchor': 'end'})
            .attr("transform","translate(-10,-10)")
            .attr("x", width+texth)
            .attr("y", height)
            .text(caData[0].timestamp);

        var scancirle = svg.selectAll(".ScanCircle")
            .data(scan)
            .enter()
            .append("circle")
            .attr("cx", caData[0].x1)
            .attr("cy", caData[0].y1)
            .attr("r", "10")
            .attr("opacity", "1")
            .attr("fill", "green")
            .attr("id", "ScanCircle");
  });


var id=0;
svg.select("#mycircle"+1)
              .transition()
              .duration(500)
              .attr("r", "10")
              .style("fill", "red");


function run(){
  //console.log(caData);
  if(id<caData.length){
    if(id!=0){
    var i = id-1;
    console.log(caData[i].movement);
    if (caData[i].movement == "check-in") {
      console.log(i);
    svg.select("#mycircle"+id)
                  .transition()
                  .duration(500)
                  .attr("opacity", "1")
                  .attr("fill", "red");
                }

    svg.select("#ScanCircle")
            .transition()
            .duration(10)
            .attr("cx", caData[i].x1)
            .attr("cy", caData[i].y1)
    svg.select("#myline"+id)
                  .transition()
                  .duration(10)
                  .attr("x1", caData[i].x1)
                  .attr("y1", caData[i].y1)
                  .attr("x2", caData[i].x2)
                  .attr("y2", caData[i].y2)
                  .attr("stroke-width", 4)
                  .attr("stroke",function(d){
                    console.log(caData[i].speed);
                    return color((caData[i].speed-minspeed)/maxspeed);
                  });

    svg.selectAll(".TimeText")
                .text(function(){return caData[i].timestamp});
    }
    id++;
    var i = id-1;
    console.log(caData[i].movement);
    if (caData[i].movement == "check-in") {
      console.log(i);
    svg.select("#mycircle"+id)
                  .transition()
                  .duration(500)
                  .attr("opacity", "1")
                  .attr("fill", "red");
                }

    svg.select("#ScanCircle")
            .transition()
            .duration(10)
            .attr("cx", caData[i].x1)
            .attr("cy", caData[i].y1)
    svg.select("#myline"+id)
                  .transition()
                  .duration(10)
                  .attr("x1", caData[i].x1)
                  .attr("y1", caData[i].y1)
                  .attr("x2", caData[i].x2)
                  .attr("y2", caData[i].y2)
                  .attr("stroke-width", 4)
                  .attr("stroke",function(d){
                    console.log(caData[i].speed);
                    return color((caData[i].speed-minspeed)/maxspeed);
                  });

    svg.selectAll(".TimeText")
                .text(function(){return caData[i].timestamp});

  };
 }

 function last(){
  //console.log(caData);
  if(id>0){
    if(id!=caData.length){
    var i = id-1;
    console.log(caData[i].movement);
    if (caData[i].movement == "check-in") {
      console.log(i);
    svg.select("#mycircle"+id)
                  .transition()
                  .duration(500)
                  .attr("opacity", "0")
                  .attr("fill", "red");
                }

    svg.select("#ScanCircle")
            .transition()
            .duration(10)
            .attr("cx", caData[i].x1)
            .attr("cy", caData[i].y1)
    svg.select("#myline"+id)
                  .transition()
                  .duration(10)
                  .attr("x1", caData[i].x1)
                  .attr("y1", caData[i].y1)
                  .attr("x2", caData[i].x1)
                  .attr("y2", caData[i].y1)
                  .attr("stroke-width", 4)
                  .attr("stroke",function(d){
                    console.log(caData[i].speed);
                    return color((caData[i].speed-minspeed)/maxspeed);
                  });

    svg.selectAll(".TimeText")
                .text(function(){return caData[i].timestamp});
    }
    id--;
    var i = id-1;
    console.log(caData[i].movement);
    if (caData[i].movement == "check-in") {
      console.log(i);
    svg.select("#mycircle"+id)
                  .transition()
                  .duration(500)
                  .attr("opacity", "0")
                  .attr("fill", "red");
                }

    svg.select("#ScanCircle")
            .transition()
            .duration(10)
            .attr("cx", caData[i].x1)
            .attr("cy", caData[i].y1)
    svg.select("#myline"+id)
                  .transition()
                  .duration(10)
                  .attr("x1", caData[i].x1)
                  .attr("y1", caData[i].y1)
                  .attr("x2", caData[i].x1)
                  .attr("y2", caData[i].y1)
                  .attr("stroke-width", 4)
                  .attr("stroke",function(d){
                    console.log(caData[i].speed);
                    return color((caData[i].speed-minspeed)/maxspeed);
                  });

    svg.selectAll(".TimeText")
                .text(function(){return caData[i].timestamp});

  };
 }





 document.onkeydown=function(event){
var e = event || window.event || arguments.callee.caller.arguments[0];
if(e && e.keyCode==13){ // enter 键
  //要做的事情
  run();
}
if(e && e.keyCode==27){
  last();
}
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
