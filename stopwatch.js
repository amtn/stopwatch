"use strict";

{
  const counter = document.getElementById('counter')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')

  let startTime;//クリック時の時間を保持するための変数定義
  let timeoutId;//clearTimeoutの引数に渡すためのやつ
  let elapsedTime = 0;//タイマーで経過した時間

  function countUp() {
    const d = new Date(Date.now() - startTime);
    const m = String(d.getMinutes()).padStart(1,'0');
    const s = String(d.getSeconds()).padStart(1,'0');
    const ms = String(d.getMilliseconds()).padStart(1,'0');
    counter.textContent = `${m}:${s}:${ms}`
  
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }


  //スタートボタンがクリックされたとき
  start.addEventListener('click',() => {
    setButtonStateRunning();//Runningへ移行
    startTime = Date.now();
    countUp();
  });

  //ストップボタンがクリックされたとき
  stop.addEventListener('click',() => {
    setButtonStateStopped();//Sutoppedへ移行
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;//ストップした時点での時間経過
    //elapsedTimeやってるのにスタート押すと０からになっちゃうのか
  });

  //リセットボタンがクリックされたとき
  reset.addEventListener('click',() => {
    setButtonStateInitial();//Initialへ移行
    counter.textContent = '0:0:0';
    elapsedTime = 0;
  });
  
  
  //必要なボタンだけ押せるようにする
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  
  setButtonStateInitial();
}


//https://qiita.com/amanomunt/items/6329ab755dc30264ee0e
//https://qiita.com/ryomaDsakamoto/items/c49a9d4cd2017405af1b