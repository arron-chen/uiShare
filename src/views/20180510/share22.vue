<template>
    <div>
      <canvas id="canvas" width="400px" height="400px"
              @mousedown="canvasDown($event)"
              @mouseup="canvasUp($event)"
              @mousemove="canvasMove($event)"
              >您的浏览器不支持canvas</canvas>
      <div id="controller">
        <div id="black_btn"  class="color_btn color_btn_selected" @click="handleClickColor($event)"></div>
        <div id="blue_btn" class="color_btn" @click="handleClickColor($event)"></div>
        <div id="green_btn"  class="color_btn" @click="handleClickColor($event)"></div>
        <div id="red_btn" class="color_btn" @click="handleClickColor($event)"></div>
        <div id="orange_btn" class="color_btn" @click="handleClickColor($event)"></div>
        <div id="yellow_btn" class="color_btn" @click="handleClickColor($event)"></div>

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
        isMouseDown:false,  //只有当mouseDown为真时才开始绘制画布
        lastLoc:{x:0,y:0},  //记录上一次鼠标绘制的位置
        lastTimestamp:0,    //记录上一次鼠标绘制的时间
        lastLineWidth:-1,   //记录上一次萧条宽度
        maxLineWidth:10,    //最大的绘制线条宽度
        minLineWidth:1,     //最小的绘制线条宽度
        maxStrokeV:10,      //最大笔触速度
        minStrokeV:0.1,     //最小笔触速度
        strokeColor:'black' //笔触的颜色
      }
    },
    methods:{
      drawGrid(){//绘制背景
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        //console.log(context);
        //console.log(canvasHeight);console.log(canvasWidth);

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
        this.isMouseDown = true //赋值为真，开始绘制
        //console.log("mouse down!")
        this.lastLoc = this.windowToCanvas(point.x, point.y) //记录上一次鼠标绘制的位置
        this.lastTimestamp = new Date().getTime(); //记录上一次鼠标绘制的时间
      },
      moveStroke(point){
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        let curLoc = this.windowToCanvas( point.x , point.y );
        let curTimestamp = new Date().getTime();
        let s = this.calcDistance( curLoc , this.lastLoc )
        let t = curTimestamp - this.lastTimestamp

        let lineWidth = this.calcLineWidth( t , s );

        //draw
        context.beginPath();
        context.moveTo( this.lastLoc.x , this.lastLoc.y );
        context.lineTo( curLoc.x , curLoc.y );

        context.strokeStyle = this.strokeColor
        context.lineWidth = lineWidth
        context.lineCap = "round" //lineCap 属性设置或返回线条末端线帽的样式。butt	默认。向线条的每个末端添加平直的边缘 round	向线条的每个末端添加圆形线帽。square	向线条的每个末端添加正方形线帽
        context.lineJoin = "round" //属性设置或返回所创建边角的类型，当两条线交汇时。bevel	创建斜角round	创建圆角。miter	默认。创建尖角。
        context.stroke() //实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。

        this.lastLoc = curLoc
        this.lastTimestamp = curTimestamp
        this.lastLineWidth = lineWidth
      },
      endStroke(){
        this.isMouseDown = false
      },

      canvasDown(e){
        e.preventDefault() //阻止鼠标的默认事件
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

      calcLineWidth( t , s ){
        let v = s / t;
        let resultLineWidth;
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
        let bbox = canvas.getBoundingClientRect() //获取画布的包围盒信息；getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        return {x:Math.round(x-bbox.left) , y:Math.round(y-bbox.top)} //Math.round四舍五入将浮点变为为整数
      },
      clearCanvas(e){
        //重绘背景画布
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        context.clearRect( 0 , 0 , canvasWidth, canvasHeight )  //clearRect() 方法清空给定矩形内的指定像素
        this.drawGrid();
      },
      handleClickColor(e){
          //console.log(e);
          let sib =document.querySelectorAll('.color_btn');
          console.log(sib.length)
          for(let i=0,len=sib.length;i< len;i++){
              sib[i].className="color_btn"
          }
          e.target.className ="color_btn color_btn_selected";
          let color= window.getComputedStyle(e.target,null).backgroundColor;
          this.strokeColor=color;
      }

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
