import React, {useState} from 'react'
import Input from './Input';
import Match from './Match';
import Result from './Result';
import { v4 as uuidv4 } from 'uuid';

const userId = uuidv4();

function App() {
  const [onProcess, setOnProcess] = useState('waiting');
  const [resInfo, setResInfo] = useState({
    userInfo: {
      customer_id: userId,
      store_id: "",
    },
    reservation: {
      status: "",
      time: "",
      person: "",
      service: "",
    }
  })

  function sendInfo(time, person){
    setResInfo({
      ...resInfo,
      reservation: {
        ...resInfo.reservation,
        status: "WAITING",
        time: time,
        person: person,
      }
    })
    setOnProcess('progress');
  }

  if(onProcess === 'waiting'){
    return (
      <Input start={sendInfo}/>
    )
  } else if(onProcess === 'progress'){
    return (
      <Match reservation={resInfo} done={() => {setOnProcess('done')}} quit={() => {setOnProcess('waiting')}}/>
    )
  } else if(onProcess === 'done'){
    return (
      <Result />
    )
  }
}

export default App
