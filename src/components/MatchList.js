import React from 'react'

function MatchList({results, finalAccept}) {
    return (
        <div>
            <h3>{results.userInfo.store_id}</h3>
            <div>{results.reservation.service}</div>
            <button onClick={() => finalAccept(results)}>수락</button>
        </div>
    )
}

export default MatchList
