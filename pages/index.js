import Choice from "../components/choice";
import {useState, useEffect} from "react";
import uuid from 'react-uuid';
import db from '../firebase/firestoreClient';
import firebase from "../firebase/index"

const uniqueLink =  uuid()
let url = `https://ranked-voting.vercel.app/${uniqueLink}`;

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [inputtext, setinputtext] = useState("");
  const [buttonElement, setButtonElement] = useState("Add Choice");
  const [createpoll, setCreatePoll] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [voting, setVoting] = useState(false);
  const [removechoice,setRemoveChoice] = useState(false);
  const [numwinners,setNumWinners] = useState("");
  const [iterator,setIterator] = useState(false);

  useEffect(()=> {
    if (url == window.location.href){
      setVoting(true)
    }
  });

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

  function moveUp (choice) {
    let addIn = choices.indexOf(choice);
    let string = choices[choices.indexOf(choice)];
    let newChoices = choices.slice(0);
    newChoices.splice(addIn,1)
    newChoices.splice(addIn - 1,0,string)
    setChoices(newChoices)
  }

  
  function moveDown (choice) {
    let addIn = choices.indexOf(choice);
    let string = choices[choices.indexOf(choice)];
    let newChoices = choices.slice(0);
    newChoices.splice(addIn,1)
    newChoices.splice(addIn + 1,0,string)
    setChoices(newChoices)
  }

  function sendData () {
    // change the first time they click on the button
    if (iterator === false){
      setButtonElement('Create Poll');
      setIterator(true);
      setRemoveChoice(true);
    }
    // only execute the second time they click the button
    if (iterator){
      
      if (numwinners >= 20){
        setButtonElement('Enter value less than 20')        
      } else if (!!+numwinners) {
        setCreatePoll(false)
        setHidden(true)
      } else {
        setButtonElement('Enter a number')
      };
    };
      
      // numwinners is number of winners possible. needed for algorithm
    
    
    // return db 
    //   .collection('')

    // set Id to uniqueLink


  }

  return (
    <>
    <div className="text-center text-5xl bold mt-24">Ranked Voting</div>
    <div className="text-center mt-26 w-96s h-96 mt-24">
      {iterator === false ? (
        <input className={`border rounded mr-5 pl-2 ${voting === true ? "hidden" : ""}`} placeholder='Start typing...' type="text" value={inputtext} onChange={e => setinputtext(e.target.value)}/>
      ) : (
        <input className={`border rounded mr-5 pl-2 ${voting === true ? "hidden" : ""} ${hidden === true ? "hidden" : ""}`} placeholder='How many winners...' type="text" value={numwinners} onChange={e => setNumWinners(e.target.value)}/>
      )}
      {iterator === false ? (
        <button className={`border rounded px-3 ${voting === true ? "hidden" : ""} ${buttonElement === "Add Choice" ? "text-black" : "text-red-600"}`} onClick={onSubmit}>{buttonElement}</button>
      ) : (
        <button className={`border rounded px-3 ${voting === true ? "hidden" : ""} ${buttonElement === "Create Poll" ? "text-black" : "text-red-600"} ${hidden === true ? "hidden" : ""}`} onClick={sendData}>{buttonElement}</button>
      )}
      

      <div className="mt-4">
        {choices.map(choice => (
          <Choice key={choice} choice={choice} choices={choices} removeChoice={removeChoice} moveUp={moveUp} moveDown={moveDown} hidden={hidden} voting={voting} removechoice={removechoice}/>
        ))}
      </div>
      
      {createpoll ? (
        <button className={`border rounded px-3 mt-4 text-center mx-auto ${iterator ? 'hidden' : ''} ${choices.length < 2 ? 'hidden' : ''}`} type="submit" onClick={sendData}>Finalize Options</button>
      ) : (
        <div className="mt-4 mx-auto">Send this link to your friends: {url}</div>
      )}
    </div>    
    </>
  )
}

  