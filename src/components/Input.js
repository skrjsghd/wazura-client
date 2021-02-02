import React, { useEffect, useRef } from 'react'

function Input({start}) {
    
    const persons = useRef();
    const times = useRef();

    function onSubmitHandler(e){
        e.preventDefault();
        start(times.current.value, persons.current.value)
    }
    
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>인원</label>
                <input ref={persons} type="number" placeholder="person" required/>
                <label>시간</label>
                <input ref={times} type="number" placeholder="time" required/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default Input
