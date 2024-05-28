import React, {useState} from 'react'


export default function Start(props){

  return(
    <div className="start">
      <h1 className="start-title">Quizzical</h1>
      <p>5 question quiz game using the open trivia database API</p>
      <div className="select">
        <label htmlFor="category">Category: </label>
        <select 
                name="category" 
                id="category"
                className="select-options"
                value={props.category}
                onChange={() => props.changeGameOptions(event)}
          >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </div>
      <div className="select">
        <label htmlFor="difficulty">Difficulty: </label>
        <select 
                name="difficulty" 
                id="difficulty"
                className="select-options"
                value={props.difficulty}
                onChange={() => props.changeGameOptions(event)}
          >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={props.startGame} className="start-btn">Start Quiz</button>
    </div>
  )
}