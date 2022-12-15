import React, {useState, useEffect}from 'react'
import Start from './components/Start'
import Question from './components/Question'
import {nanoid} from 'nanoid'

export default function App() {
  const [start, setStart] = useState(false);
  const [allData, setAllData] = useState([]);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const[loading, setLoading] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    category: '',
    difficulty: ''
  })

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  function changeGameOptions(event) {
    setGameOptions(prevOptions => ({...prevOptions, [event.target.name]:event.target.value}))
  }

  function chooseUrl(){
    const {category, difficulty} = gameOptions;
    let url = 'https://opentdb.com/api.php?amount=5&type=multiple';

    if(category && difficulty){
      url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
    } else if (category){
      url = `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`
    } else if (difficulty){
      url = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    }
    return url
  }

  useEffect(() => {
    try{
      if(start === true){
        async function getQuestions() {
          setLoading(true);
          const response = await fetch(chooseUrl());
          const responseJson = await response.json();
          setAllData(prevData => {
            let newData = []
            for(let i = 0; i < responseJson.results.length; i++){
              newData.push({
                question: responseJson.results[i].question,
                correct_answer: responseJson.results[i].correct_answer,
                answers: shuffleArray([
                  {answer: responseJson.results[i].correct_answer, isSelected: false, answerId: nanoid()},
                  {answer: responseJson.results[i].incorrect_answers[0], isSelected: false, answerId: nanoid()},
                  {answer: responseJson.results[i].incorrect_answers[1], isSelected: false, answerId: nanoid()},
                  {answer: responseJson.results[i].incorrect_answers[2], isSelected: false, answerId: nanoid()}
                ]),
                id: nanoid()
              })
            }
            return newData
          });
        }
        getQuestions();
      }
    }catch(err){
      console.alert(err, 'This combination does not exist.')
      resetGame();
    }

    setTimeout(() => {
      setLoading(false);
    },3000);
  }, [start])


  function startGame(){
    setStart(true);
  }


  function answerSelected(answerId, dataId){
    setAllData(prevData => {
      return prevData.map(data => {
        const newAnswers = data.answers.map(answer => {
          if(data.id === dataId && answer.answerId === answerId ){
            return {...answer, isSelected: !answer.isSelected};
          }else if(data.id === dataId){
            return {...answer, isSelected: false};
          }else{
            return answer;
          }
        })
        return{...data, answers: newAnswers};
      })
    })
  }

  function checkAnswers(){
    if(finish === false){
      allData.forEach(data => {
        data.answers.forEach(answer => {
          if(answer.isSelected === true && answer.answer === data.correct_answer){
            setScore(prevScore => prevScore + 1);
          }
        })
      });
      setFinish(true);
    }else{
      resetGame();
    }
  }

  function resetGame(){
    setFinish(false);
    setStart(false);
    setScore(0);
    setAllData([]);
    setGameOptions({ category: '', difficulty: ''})
  }


  const questionElements = allData?.map(data => (
    <Question 
      key={data.id} 
      question={data.question}
      answers={data.answers} 
      id={data.id}
      finish={finish}
      correct_answer={data.correct_answer}
      answerSelected={answerSelected}
    />
  ));

  return(
    <main>
      { !start && <Start startGame={startGame} changeGameOptions={changeGameOptions} />}
      {start && loading && <h1 className="loading">Loading...</h1>}
      {start && !loading && questionElements}
      {finish && <p className="results">You got {score}/5 correct</p>}
      {!loading && start && <button onClick={checkAnswers} className="check-btn">{finish ? 'New Game' : 'Check Answers'}</button>}
      <img className="image-blue" src="../src/images/blob-blue.png" />
      <img className="image-yellow" src="../src/images/blob-yellow.png" />
    </main>
  )
}