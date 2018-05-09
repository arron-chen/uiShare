<template>
    <div>
      <section class="section1">
        <div class="section1Cont commonWidth">
          <div class="example1 mt20">
            <h4 class="mb20"> 效果一</h4>
            <div class="item item1">HOVER HERE</div>
          </div>
          <div class="example1 mt20">
            <h4 class="mb20"> 效果二</h4>
            <div class="item item2">HOVER HERE</div>
          </div>
          <div class="example1 mt20">
            <h4 class="mb20"> 效果三</h4>
            <div class="item item3">HOVER HERE</div>
          </div>
          <div class="example1 mt20">
            <h4 class="mb20"> 效果四</h4>
            <div class="item item4">HOVER HERE</div>
          </div>
          <div class="example1 mt20">
            <h4 class="mb20"> 效果五</h4>
            <div class="item item5">HOVER HERE</div>
          </div>
        </div>

      </section>
    </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .commonWidth{
    width:1000px;
    margin:0 auto;
  }
  .mt20{
    margin-top:20px;
  }
  .mb20{
    margin-bottom:20px;
  }
  .section1Cont {
    list-style:none;
    height:700px;
  }
  .example1{
    height:100px;
  }
  .item{
    width:160px;
    height:40px;
    line-height: 40px;
    float:left;
    position:absolute;
    text-align: center;
    cursor: pointer;
  }
  .item::before{
    content: "";
    position: absolute;
    left: 0;
    width: 160px;

  }

  .item1::before {
    bottom: 0;
    height: 2px;
    background: deeppink;
    transition: transform .5s;
    transform: scaleX(0);
  }
  .item1:hover::before{
    transform: scaleX(1);
  }

  .item2::before {
    bottom: 0;
    height: 2px;
    background: deeppink;
    transition: transform .5s;
    transform: scaleX(0);
    transform-origin: 100% 0;
  }
  .item2:hover::before{
    transform: scaleX(1);
    transform-origin: 0 0;
  }

  .item3 {
    color: #333;
    text-align: center;
    transition: color .5s;
    margin: 10px;
  }
  .item3::before{
    height: 40px;
    background: deeppink;
    z-index: -1;
    transform: scale3d(0, 1, 1);
    transform-origin: 100% 50%;
    transition: transform .5s;
  }
  .item3:hover::before{
    transform: scale3d(1, 1, 1);
    transform-origin: 0% 50%;
    transition-timing-function: ease-in;
  }

  .item4 {
    color: #333;
    text-align: center;
    transition: color .5s;
    margin: 10px;
  }
  .item4::before{
    height: 40px;
    background: deeppink;
    z-index: -1;
    transform: scale3d(0, 0, 1);
    transform-origin: 100% 100%;
    transition: transform .5s;
  }
  .item4:hover::before{
    transform: scale3d(1, 1, 1);
    transform-origin: 0% 0%;
    transition-timing-function: ease-in;
  }

  .item5 {
    color: #333;
    text-align: center;
    transition: color .5s;
    margin: 10px;
  }
  .item5::before{
    height: 40px;
    background: deeppink;
    z-index: -1;
    transform: scale3d(0, 0, 1);
    transform-origin: 50% 100%;
    transition: transform .5s;
  }
  .item5:hover::before{
    transform: scale3d(1, 1, 1);
    transform-origin: 50% 0%;
    transition-timing-function: ease-in;
  }
</style>
