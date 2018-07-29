import React from 'react'
import './style.css'

function calledNumbers({ calledNumbers }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <h3>LAST BALL</h3>
        <div
          className="called-number"
          style={{ width: 100, height: 100, fontSize: 25 }}
        >
          {calledNumbers[calledNumbers.length - 1]}
        </div>
      </div>
      <div>
        <h6 style={{ textAlign: 'right' }}>PREVIOUS BALLS</h6>
        <div className="called-numbers">
          {calledNumbers
            .slice(0, calledNumbers.length - 1)
            .map((calledNumber, i) => {
              return (
                <div key={i} className="called-number">
                  {calledNumber}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default calledNumbers
