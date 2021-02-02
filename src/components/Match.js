import React, { useState, useEffect } from 'react'
import MatchList from './MatchList';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/customer',{
    autoConnect: false,
});

function Match({reservation, done, quit}) {
    const [matchList, setMatchList] = useState([]);

    const displayList = matchList.map((results, index) => (
        <MatchList key={index} results={results} finalAccept={finalAcceptHandler}/>
    ))
    
    useEffect(() => {
        socket.open();
        socket.once('connect', () => {
            socket.emit('reservation:create', reservation)
            socket.on('reservation:send_service', (service) => {
                console.log(service)
                setMatchList((prevState) => [...prevState, service])
            })
            socket.on('reservation:cancel_keeper_get', (store) => {
                setMatchList((prevState) => (prevState.filter((data) => (data.userInfo.store_id !== store))))
            })        
        })  
    },[])

    function onQuitHandler(){
        socket.emit('reservation:cancel', reservation)
        socket.close()
        quit();
    }

    function finalAcceptHandler(result){
        socket.emit('reservation:result', {
            ...result,
            reservation: {
                ...result.reservation,
                status: 'DONE',
            }
        })
        done();
    }

    return (
        <div>
            <button onClick={onQuitHandler}>연결해제</button>
            {displayList}
        </div>
    )
}

export default Match
