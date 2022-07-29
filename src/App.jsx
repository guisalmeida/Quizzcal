import React, { useState, useEffect } from 'react'
import Question from './components/Question'

function App() {
  const [start, setStart] = useState(true)
  const [questions, setQuestions] = useState([])
  const [check, setCheck] = useState(false)
  let result = 0

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(() => {
        return data.results.map(question => {
          question.selected = ""
          return question
        })
      }))
  }

  function checkAnswers() {
    setCheck(true)
  }

  function handleSelected(event, question) {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.question === question) {
        q.selected = event.target.innerText
      }
      return q
    })
    )
  }

  function startQuiz() {
    setCheck(false)
    setStart(true)
    setQuestions([])
    getQuestions()
  }

  useEffect(() => startQuiz(), [])

  return (
    <div className="App">
      {start ?
        <div className="start">
          <h1>Quizzical</h1>
          <p>Challenge from Scrimba with questions about sports using Trivia API, made to practice React using Vite</p>
          <button
            className="button"
            onClick={() => setStart(false)}
          >
            Start quiz
          </button>
        </div>
        :
        <div className="question-content">
          {questions.length > 0 ?
              questions.map((question, i) => {
                const sortedQuestions = [...question.incorrect_answers, question.correct_answer].sort()
                if (question.selected === question.correct_answer) {
                  result += 1
                }
                return (
                  <Question
                    key={i}
                    question={question.question}
                    answers={sortedQuestions}
                    correct={question.correct_answer}
                    selected={question.selected}
                    check={check}
                    handleSelected={handleSelected}
                  />
                )
              }) : <p>Loading...</p>
          }
          {check ?
            <div className='results'>
              <p>{`You scored ${result}/${questions.length} correct answers`}</p>
              <button className="button" onClick={startQuiz}>Play again</button>
            </div>
            :
            <button className="button" onClick={checkAnswers}>Check answers</button>
          }
        </div>
      }
    </div>
  )
}

export default App
