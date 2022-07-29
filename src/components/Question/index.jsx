import React from 'react'
import he from "he"

import './styles.scss'

export default function Question(props) {
  function verifyAnswer(answer) {
    let str = ""
    if (props.correct === answer) {
      str += " right"
    } else if (props.selected === answer && props.correct !== answer) {
      str += " wrong"
    } else {
      str += " non-selected"
    }
    return str
  }

  return (
    <div className='question'>
      <p>{he.decode(props.question)}</p>
      {props.answers &&
        props.answers.map((answer, i) => {
          return props.check ?
            (
              <button
                key={i}
                className={`question-btn ${verifyAnswer(answer)}`}
              >
                {he.decode(answer)}
              </button>
            ) : (
              <button
                key={i}
                className={`question-btn ${props.selected === he.decode(answer) ? "selected" : ""}`}
                onClick={event => props.handleSelected(event, props.question)}
              >
                {he.decode(answer)}
              </button>
            )
        })
      }
    </div>
  )
}
