import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [timeStart, setTimestart] = useState(true);
  var [timeCount, setTimeCount] = useState(0);
  var [lapCount, setLapcount] = useState(0);
  const [lapStart, setLapstart] = useState(true);
  const [ids, setIds] = useState({
    timerId: 0,
    lapsId: 0
  })
  const [lapShow, setLapshow] = useState([]);
  const [lapshowBool, setLapbool] = useState(false);
  const [modalShow, setModalshow] = useState(false);
  let [timevariables,setTimeVariables] = useState({
    minutes: "0",
    seconds: "0",
    centiSec: "0"
  })
  let [lapvariables,setLapVariables] = useState({
    minutes: "0",
    seconds: "0",
    centiSec: "0"
  })
  const formatter = (num)=>{
    if(parseInt(num)<10){
      return '0'+num;
    }
    return num;
  }

  const handleLapStart = ()=>{
    setLapbool(false);
    setLapstart(false);
  }


  const handleLapStop = ()=>{
    const tempRec = [...lapShow];
    const tempObj = {
      minutes: lapvariables.minutes,
      seconds: lapvariables.seconds,
      centiSec: lapvariables.centiSec
    }
    tempRec.push(tempObj);
    setLapshow(tempRec);
    setLapstart(true);
    setLapbool(true);
  }

  useEffect(()=>{
    if(lapStart){
      clearInterval(ids.lapsId);
    }
  } ,[lapStart]);



  useEffect(()=>{
  var lapId;
    if(lapStart){
      return
    }
    if(lapCount>=100*60*100){
      setLapcount(0);
    }
    lapId = setInterval(()=>{
    setLapcount((lapCount)=>lapCount+=1);
    lapCount++;
    setLapVariables({
      minutes : Math.floor(lapCount/6000),
      seconds : Math.floor(lapCount%6000/100),
      centiSec: Math.floor(lapCount%6000%100)
    })
    setIds({...ids, lapsId:lapId})
    return ()=>{
      clearInterval(lapId);
    }
  }, 10)
}, [lapStart]);


  useEffect(()=>{
    lapshowBool ? setModalshow(true):setModalshow(false);
  },[lapStart]);

  useEffect(()=>{
    if(timeStart){
      clearInterval(ids.timerId);
    }
  } ,[timeStart])
  useEffect(()=>{
    var timeId;
      if(timeStart){
          return
      }
      if(timeCount===100*60*100){
        setTimeCount(0);
      }
      timeId = setInterval(()=>{
      setTimeCount((timeCount)=>timeCount+=1);
      timeCount++;
      setTimeVariables({...timevariables,
        minutes : Math.floor(timeCount/6000),
        seconds : Math.floor(timeCount%6000/100),
        centiSec: Math.floor(timeCount%6000%100)
      })
      setIds({...ids, timerId:timeId})
      return ()=>{
        clearInterval(timeId);
      }
    }, 10)
  }, [timeStart]);

  return (
    <div className="App">
      <div className="container">
        <button className='reset-btn' onClick={()=>window.location.reload()}>Reset</button>
        <div className="title-app">
          StopWatch
        </div>
        <div className="lap-locator">Lap Count</div>
        <div className="lap-timer">
          <span id="lap-min">{formatter(lapvariables.minutes)}</span>:<span id="lap-sec">{formatter(lapvariables.seconds)}</span>:<span id="lap-msec">{formatter(lapvariables.centiSec)}</span>
        </div>
        <div className="time-timer">
          <span id="time-min" className='digital'>{formatter(timevariables.minutes)}</span>:<span id="time-sec" className='digital'>{formatter(timevariables.seconds)}</span>:<span id="time-msec" className='digital'>{formatter(timevariables.centiSec)}</span>
        </div>
        <div className="btn-box">
          <div>
            {timeStart ? <button id='timer-btn-start' onClick={()=>setTimestart(false)}>Start</button> : <button id='timer-btn-stop' onClick={()=>setTimestart(true)}>Stop</button>}
          </div>
          <div>
            {lapStart ? <button id='lap-btn-start' onClick={handleLapStart}>Lap</button> : <button id='lap-btn-stop' onClick={handleLapStop}>Start</button>}
          </div>
        </div>
        {modalShow && <div className='modal-box'>{
          lapShow.map((lap, idx)=>{
            return (<div className='lap-each' key={idx}>
              <div>{`Lap${idx+1}:`}</div><div className='rec-margin'>{formatter(lap.minutes)+':'+formatter(lap.seconds)+':'+formatter(lap.centiSec)}<hr/></div>
            </div>)
          })
          
        }<hr/></div>}
      </div>
    </div>
  );
}

export default App;
