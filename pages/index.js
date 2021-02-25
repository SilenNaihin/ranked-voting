import Choice from "../components/choice";
import {useState, useEffect} from "react";
import uuid from 'react-uuid';
import db from '../firebase/firestoreClient';
import router from 'next/router';

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [inputtext, setinputtext] = useState("");

  const [pollquestion,setPollQuestion] = useState("")
  const [donequestion,setDoneQuestion] = useState(false)
  const [pollElement,setPollElement] = useState('Submit Poll Question') 

  const [buttonElement, setButtonElement] = useState("Add Choice");
  const [createpoll, setCreatePoll] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [removechoice,setRemoveChoice] = useState(false);
  const [numwinners,setNumWinners] = useState("");

  const [iterator,setIterator] = useState(false);

  const [uniqueLink,setUniqueLink] = useState(uuid()); 
  const [url,setUrl] = useState(`${process.env.BASE_URL}${uniqueLink}`) 
  const [finalURL,setFinalUrl] = useState(url);
  const [copied,setCopied] = useState(false)

  function questionSubmit () {
      if (+pollquestion === 0){
          setPollElement('Enter an actual question')
        } else if (+pollquestion > 0){
          setPollElement('Enter an actual question')
        } else if (+pollquestion < 0){
          setPollElement('Enter an actual question')
        } else {
          setDoneQuestion(true);
        } 
  }

  function submitEnter (event){
    if (event.key === 'Enter'){
      questionSubmit()
    }
  }

  function submitEnter1 (event){
    if (event.key === 'Enter'){
      onSubmit()
    }
  }

  function submitEnter2 (event){
    if (event.key === 'Enter'){
      sendData()
    }
  }

  function removeChoice (choice) {
      setChoices(choices.filter(c => c !== choice))
  }

  function onSubmit () {
      if (choices.includes(inputtext)){
        setButtonElement("Choice Already Exists!")
      } else if (inputtext === "") { 
        setButtonElement("Enter Something")
      } else {
        setChoices([...choices, inputtext])
        setButtonElement("Add Choice")
      }  
  }

  function skipToVoting(){
    router.push(`/results/${uniqueLink}`);
  }

  function sendToClipboard(){
    navigator.clipboard.writeText(finalURL);
    setCopied(true)
  }

  function sendData () {
    // change the first time they click on the button
    setButtonElement('Create Poll');
    setIterator(true);
    setRemoveChoice(true); 

    // only execute the second time they click the button
    if (iterator){
      
      if (numwinners >= 20){
        setButtonElement('Enter value less than 20')        
      } else if (choices.length < +numwinners + 1){
        setButtonElement('Too many winners')
      } else if (numwinners <= 0) {
        setButtonElement('Enter positive value')
      } else if (!!+numwinners) {
        setCreatePoll(false)
        setHidden(true)
        db.collection('poll').doc(`${uniqueLink}`).set({
          question: pollquestion,
          choices: choices,
          winners: numwinners,
          voters: 0,
        })  
      } else {
        setButtonElement('Enter a number')
      };
    };


  }

  return (
    <>
    <div className="text-center text-5xl bold mt-24">Simple Ranked Voting</div>
    <div className="text-center mt-26 mt-16">
      <div className={`text-center text-3xl bold mb-8 ${donequestion === false ? 'hidden' : ''}`}>Question: {pollquestion}</div>

      <input type="text" className={`border rounded mr-5 pl-2 ${donequestion === true ? 'hidden' : ''}`} onKeyPress={submitEnter} value={pollquestion} onChange={e => setPollQuestion(e.target.value)}/>
      <button className={`border rounded px-3 ${donequestion === true ? 'hidden' : ''} ${pollElement === "Submit Poll Question" ? "text-black" : "text-red-600"}`} onClick={questionSubmit}>{pollElement}</button>
      
      {iterator === false ? (
        <input className={`border rounded mr-5 pl-2 ${donequestion === false ? 'hidden' : ''}`} onKeyPress={submitEnter1} placeholder='Start typing...' type="text" value={inputtext} onChange={e => setinputtext(e.target.value)}/>
      ) : (
        <input className={`border rounded mr-5 pl-2 ${hidden === true ? "hidden" : ""}`} onKeyPress={submitEnter2} placeholder='How many winners...' type="text" value={numwinners} onChange={e => setNumWinners(e.target.value)}/>
      )}
      {iterator === false ? (
        <button className={`border rounded px-3 ${donequestion === false ? 'hidden' : ''} ${buttonElement === "Add Choice" ? "text-black" : "text-red-600"}`} onClick={onSubmit}>{buttonElement}</button>
      ) : (
        <button className={`border rounded px-3 ${buttonElement === "Create Poll" ? "text-black" : "text-red-600"} ${hidden === true ? "hidden" : ""}`} onClick={sendData}>{buttonElement}</button> // make 'see results' clickable
      )}
      

      <div className="mt-4">
        {choices.map(choice => (
          <Choice key={choice} choice={choice} choices={choices} removeChoice={removeChoice} hidden={hidden} removechoice={removechoice}/>
        ))}
      </div>
      
      {createpoll ? (
        <button className={`border rounded px-3 mt-4 text-center mx-auto ${donequestion === false ? 'hidden' : ''} ${iterator ? 'hidden' : ''} ${choices.length < 2 ? 'hidden' : ''}`} type="submit" onClick={sendData}>Finalize Options</button>
      ) : (
        <div>
          <div className="mt-4 mx-auto" onClick={sendToClipboard}>Send link to participants (click to copy): {url}</div>
          <div className={`mx-auto text-sm ${copied ? 'text-blue-500' : 'hidden'}`}>Copied!</div>
          <button className='border rounded px-3 mt-4 text-center mx-auto' type="submit" onClick={skipToVoting}>See Results</button>
        </div>
        
      )}
    </div>    
    </>
  )
}

  