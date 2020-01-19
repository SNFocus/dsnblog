/**
 * title: 模仿华为手机充电界面动画
 */
<template>
  <section style="padding:1.5rem;overflow:hidden;">
    <section>
      <div class="battery-wrapper wrapper">
        <div style="width:280px;margin:auto;height:100%;">
          <div class="circle"></div>
          <span class="number">99.6%</span>

          <div class="base">
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
          </div>
        </div>
      </div>
    </section>
    <section class="static-battery wrapper" style="float:left;">
      <div class="battery"></div>
    </section>
    <section class="wave-battery wrapper" style="float:left;">
      <div class="battery">
        <div class="battery-body">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
}
.battery {
  width: 100px;
  height: 180px;
  position: relative;
  background: white;
  margin: auto;
  border-radius: 8px 8px 6px 6px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));

  // 电池头部方块
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 26px;
    height: 22px;
    margin-left: -13px;
    margin-top: -11px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px 5px 0 0;
    overflow: hidden;
  }

  // 背景颜色渐变设置
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      #7abcff 0%,
      #00bcd4 44%,
      #2196f3 100%
    );
    filter: hue-rotate(90deg);
  }
  // 背景动画
  .static-battery &::after {
    animation: charging 10s linear infinite;
  }

  .wave-battery &::after {
    animation: charging 10s linear infinite;
  }

  // 第二种波浪充电内部包含快
  .battery-body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 8px 8px 6px 6px;
  }

  // 波浪模拟
  .wave {
    position: absolute;
    left: 50%;
    top: -80px;
    margin-left: -140px;
    z-index: 9;
    width: 280px;
    height: 280px;
    animation: circle-rotate 10s linear infinite;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 45% 47% 44% 42%;

    &:nth-child(2) {
      border-radius: 38% 46% 43% 47%;
      transform: rotate(70deg);
    }

    &:nth-child(3) {
      border-radius: 42% 46% 37% 40%;
      transform: rotate(135deg);
    }
  }

  //   第三种充电动画
}

.battery-wrapper {
  background: black;
  text-align: center;
  height: 280px;
  filter: contrast(15) hue-rotate(0deg);
  .number {
    color: white;
    font-size: 2rem;
    position: absolute;
    top: 70px;
    left: 50%;
    margin-left: -40px;
  }
  .circle {
    width: 140px;
    height: 140px;
    position: relative;
    margin: auto;
    filter: blur(8px);
    color: white;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: black;
    }

    &::before {
      padding: 6px;
      box-sizing: content-box;
      background: #00ff6f;
      border-radius: 39px 60px 31px 53px;
      animation: rotate 10s infinite linear;
      margin-left: -6px;
    }
  }

  .base {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -40px;
    width: 80px;
    height: 28px;
    background: #00ff6f;
    border-radius: 40px 40px 0 0;
    filter: blur(5px);

    .bubble {
      position: absolute;
      border-radius: 50%;
      background: #00ff6f;
    }
  }

  @for $i from 0 through 10 {
    .bubble:nth-child(#{$i}) {
      $width: 15 + random(15) + px;
      left: 15 + random(70) + px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: $width;
      height: $width;
      animation: moveToTop
        #{random(6 + 3)}s
        ease-in-out -#{random(5000) /
        1000}s
        infinite;
    }
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
    transform: translate(-50%, -100px);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}

// 充电动画
@keyframes charging {
  0% {
    top: 95%;
    box-shadow: 0 2px 8px 6px rgba(122, 188, 255, 0.2);
  }
  50% {
    top: 40%;
    box-shadow: 0 14px 28px rgba(0, 150, 136, 0.83),
      0px 4px 10px rgba(9, 188, 215, 0.4);
  }
  100% {
    top: 0;
    filter: hue-rotate(0);
    box-shadow: 0 14px 28px rgba(4, 188, 213, 0),
      0 10px 10px rgba(9, 188, 215, 0.4);
  }
}

// 圆块旋转模拟波浪
@keyframes circle-rotate {
  10% {
    top: -100px;
    transform: rotate(0.5turn);
  }
  50% {
    top: -200px;
    transform: rotate(1turn);
  }
  100% {
    top: -270px;
    transform: rotate(2turn);
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
