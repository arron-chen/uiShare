<template>
    <div>
      <canvas id="canvas" width="400px" height="400px"
              @mousedown="canvasDown($event)"
              @mouseup="canvasUp($event)"
              @mousemove="canvasMove($event)"
              @touchstart="canvasDown($event)"
              @touchend="canvasUp($event)"
              @touchmove="canvasMove($event)"
              >您的浏览器不支持canvas</canvas>
      <div id="controller">
        <div id="black_btn" class="color_btn color_btn_selected"></div>
        <div id="blue_btn" class="color_btn"></div>
        <div id="green_btn" class="color_btn"></div>
        <div id="red_btn" class="color_btn"></div>
        <div id="orange_btn" class="color_btn"></div>
        <div id="yellow_btn" class="color_btn"></div>

        <div id="clear_btn" class="op_btn" @click="clearCanvas($event)">清 除</div>
        <div class="clearfix"></div>
      </div>
    </div>
</template>
<script>
  const canvasWidth = 400;
  const canvasHeight =400;

  export default {
    data(){
      return {
        canvas:'',
        isMouseDown:false,
        lastLoc:{x:0,y:0},
        lastTimestamp:0,
        lastLineWidth:-1,
        maxLineWidth:10,
        minLineWidth:1,
        maxStrokeV:10,
        minStrokeV:0.1
      }
    },
    methods:{
      drawGrid(){
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        console.log(context);
        console.log(canvasHeight);console.log(canvasWidth);

        context.save()  //保存当前环境的状态

        context.strokeStyle = "rgb(230,11,9)" //设置或返回用于笔触的颜色、渐变或模式

        context.beginPath() //起始一条路径，或重置当前路径
        context.moveTo( 2 , 2 ) //把路径移动到画布中的指定点，不创建线条
        context.lineTo( canvasWidth - 2 , 2 ) //添加一个新点，然后在画布中创建从该点到最后指定点的线条
        context.lineTo( canvasWidth - 2 , canvasHeight - 2 )
        context.lineTo( 2 , canvasHeight - 2 )
        context.closePath() //创建从当前点回到起始点的路径
        context.lineWidth = 4 //设置或返回当前的线条宽度
        context.stroke() //绘制已定义的路径

        context.beginPath()
        context.moveTo(0,0)
        context.lineTo(canvasWidth,canvasHeight)

        context.moveTo(canvasWidth,0)
        context.lineTo(0,canvasHeight)

        context.moveTo(canvasWidth/2,0)
        context.lineTo(canvasWidth/2,canvasHeight)

        context.moveTo(0,canvasHeight/2)
        context.lineTo(canvasWidth,canvasHeight/2)

        context.lineWidth = 1
        context.stroke()

        context.restore()  //返回之前保存过的路径状态和属性
      },
      beginStroke(point){
        this.isMouseDown = true
        //console.log("mouse down!")
        this.lastLoc = this.windowToCanvas(point.x, point.y)
        this.lastTimestamp = new Date().getTime();
      },
      endStroke(){
        this.isMouseDown = false
      },
      canvasDown(e){
        e.preventDefault()
        this.beginStroke( {x: e.clientX , y: e.clientY} )
      },
      canvasUp(e){
        e.preventDefault()
        this.endStroke()
      },
      canvasMove(e){
        e.preventDefault()
        if( this.isMouseDown ){
          this.moveStroke({x: e.clientX , y: e.clientY})
        }
      },
      moveStroke(point){

        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        var curLoc = this.windowToCanvas( point.x , point.y );
        var curTimestamp = new Date().getTime();
        var s = this.calcDistance( curLoc , this.lastLoc )
        var t = curTimestamp - this.lastTimestamp

        var lineWidth = this.calcLineWidth( t , s );

        //draw
        context.beginPath();
        context.moveTo( this.lastLoc.x , this.lastLoc.y );
        context.lineTo( curLoc.x , curLoc.y );

        context.strokeStyle = this.strokeColor
        context.lineWidth = lineWidth
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()

        this.lastLoc = curLoc
        this.lastTimestamp = curTimestamp
        this.lastLineWidth = lineWidth
      },
      calcLineWidth( t , s ){
        var v = s / t;
        var resultLineWidth;
        if( v <= this.minStrokeV )
          resultLineWidth = this.maxLineWidth;
        else if ( v >= this.maxStrokeV )
          resultLineWidth = this.minLineWidth;
        else{
          resultLineWidth = this.maxLineWidth - (v-this.minStrokeV)/(this.maxStrokeV-this.minStrokeV)*(this.maxLineWidth-this.minLineWidth);
        }

        if( this.lastLineWidth == -1 )
          return resultLineWidth;

        return resultLineWidth*1/3 + this.lastLineWidth*2/3;
      },
      calcDistance( loc1 , loc2 ){
        return Math.sqrt( (loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y) )
      },
      windowToCanvas( x , y ){
        var bbox = canvas.getBoundingClientRect()
        return {x:Math.round(x-bbox.left) , y:Math.round(y-bbox.top)}
      },
      clearCanvas(e){
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        context.clearRect( 0 , 0 , canvasWidth, canvasHeight )
        this.drawGrid();
      },

    },
    mounted(){
        this.drawGrid();
    }
  }
</script>
<style scoped>
  #canvas{
    display:block;
    margin:0 auto;
  }
  #controller{
    margin:0 auto;
    width: 400px;
  }
  .op_btn{
    float: right;
    margin:10px 0 0 10px;
    border:2px solid #aaa;
    width:60px;
    height:25px;
    line-height:25px;
    font-size:16px;
    text-align:center;
    border-radius: 5px 5px;
    cursor:pointer;
    background-color: white;
    font-family: Microsoft Yahei, Arial;
  }
  .op_btn:hover{
    background-color:#def;
  }
  .clearfix{
    clear:both;
  }

  .color_btn{
    float: left;
    margin: 10px 10px 0 0;
    border:5px solid white;
    width:25px;
    height:25px;
    border-radius: 5px 5px;
    cursor:pointer;
  }
  .color_btn:hover{
    border: 5px solid violet;
  }
  .color_btn_selected{
    border: 5px solid blueviolet;
  }
  #black_btn{
    background-color: black;
  }
  #blue_btn{
    background-color: blue;
  }
  #green_btn{
    background-color: green;
  }
  #red_btn{
    background-color: red;
  }
  #orange_btn{
    background-color: orange;
  }
  #yellow_btn{
    background-color: yellow;
  }
</style>
