import React from "react"
import Quiz from "./Quiz"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


export default function SecondPage(){
   
    const [questions , setQuestions] = React.useState([])
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [areAllTrue, setAreAllTrue] = React.useState(false)


    React.useEffect(  ()=>{
        fetch('https://opentdb.com/api.php?amount=4&type=multiple')
            .then( res => res.json())
            .then( data => setQuestions(data.results.map(question => { 

                // mixing the correct and incorrect answers
                
                let suggestionsArray = []
                let randomNum = Math.floor(Math.random() * 4)
                suggestionsArray[randomNum] = cleanWord(question.correct_answer)

                for(let i=0, j=0; i < 4; i++){
                    if(i!== randomNum){
                        suggestionsArray[i] = cleanWord(question.incorrect_answers[j])
                        j++
                    }
                }

                // end of mixing the correct and incorrect answers
                
                return (
                    {...question,
                     selectedAnswer: "",
                     id: nanoid(),
                     suggestions: suggestionsArray
                    })
            })))
    }, [])

    /* Clean Data from html encoding */
    function cleanWord(word){
        return word.replaceAll('&quot;', '').replaceAll('&#039', '').replaceAll('&amp;','').replaceAll(';', '').replaceAll('&', '')
    }

    function CleanData(array){
        return array.map( word => {
            return (cleanWord(word))
        })
    }

    /* End of Cleaning Data html encoding */

    const verifyAnswers = () =>{
        setCheckAnswers( true)
        setAreAllTrue( questions.every(question => { question.correct_answer === question.selectedAnswer}))
        if(areAllTrue){
            console.log("congrats")
        } else{
            console.log("hard luck !")
        }
    }

    function handleSelectedAnswer(id, answer){
        setQuestions( questions => questions.map( question =>{
            return (
                question.id === id ? {...question, selectedAnswer: answer} : question
            )
        }))
    }

    const questionElements = questions.map( questionItem => { 

        return (<Quiz 
                key={nanoid()}
                id={questionItem.id}
                title={cleanWord(questionItem.question)} 
                trueValue={cleanWord(questionItem.correct_answer)} 
                suggestions={questionItem.suggestions}
                runCheck={checkAnswers}
                handleSelectedAnswer={handleSelectedAnswer}
                selectedAnswer={questionItem.selectedAnswer}
                />)
    })

    

    return (
        <section id="second-page">
            {areAllTrue && <Confetti  
                            width="1000px"
                            height="1000px"/>}

            <div className="second-page-container">
                <div className="upper-right"></div>
                <div className="questions-wrapper">
                    {questionElements}
                </div>
                <hr className="second-page-sep"/>
                <div className="buttons-wrapper">
                    <button className="intro-page-button" onClick={verifyAnswers}>Show Answers</button>
                    <button className="intro-page-button" onClick={() => window.location.reload(false)}>New Game</button>
                </div>
                <div className="bottom-left"></div>
            </div>
        </section>
        
    )
}