import { useRouter } from "next/router";
import {useEffect, useState} from 'react';
import db from '../firebase/firestoreClient';
import VotingChoice from "../components/votingChoices";



export default function Poll() {
    const router = useRouter();
    const [pollquestion,setPollQuestion] = useState('');
    const [choices,setChoices] = useState([]);
    const [numwinners,setNumWinners] = useState(0);
    const [voters,setVoters] = useState(0)

    const [name,setName] = useState('');
    const [submitName,setSubmitName] = useState(false)

    const [voted,setVoted] = useState(false);
    const [buttonElement,setButtonElement] = useState('Enter Name');

    useEffect(()=> {
        const fetchData = async () => {
            const docRef = db.collection('poll').doc(`${router.query.pollId}`);
            
            const doc = await docRef.get();
        
            const docData = doc.data();

            if (!!docData){ 
                for(const key in docData) {
                    if (key == 'choices'){
                        setChoices(docData[key]);
                    } else if (key == 'winners'){
                        setNumWinners(docData[key]);
                    } else if (key == 'question'){
                        setPollQuestion(docData[key]);
                    } else if (key == 'voters'){
                        setVoters(docData[key]);
                    } else {
                    }
                 }       
                
                
            } else {
                router.push('/')
          }
        }

        if (router.query.pollId) fetchData();
    }, [router.query]);

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


      function submitEnter (event){
        if (event.key === 'Enter'){
          onSubmitName()
        }
      }

      function onSubmitName(){
        if (+name === 0){
            setButtonElement('Enter an actual name')
          } else if (+name > 0){
            setButtonElement('Enter an actual name')
          } else if (+name < 0){
            setButtonElement('Enter an actual name')
          } else {
            setSubmitName(true)
          }
      }

      function orderSubmit(){
        setVoted(true)
        db.collection('poll').doc(`${router.query.pollId}`).update({
            voters: voters + 1
          }) 
        db.collection('poll').doc(`${router.query.pollId}`).collection('votes').doc(`${name}`).set({
          }) 
        for (let i = 0; i < choices.length; i++){
             db.collection('poll').doc(`${router.query.pollId}`).collection('votes').doc(`${name}`).update({
                [`${i}`]:choices[i] // returns 4 fields
                // [`choice.${i}`]:choices[i] returns 1 array with i options
                // [`choice.${i}`]:[choices[i]] returns i arrays 
             })   
        }
        router.push(`/results/${router.query.pollId}`)
      }


    return (
        <>
        <div className="text-center text-4xl bold mt-24">Rank by:</div>
        <div className="text-center text-3xl bold mt-12">{pollquestion}</div>
        <div className="text-center mt-26 mt-8">

            <input type="text" placeholder='Enter your name...' onKeyPress={submitEnter} className={`border rounded mr-5 pl-2 ${submitName=== true ? 'hidden' : ''}`} onKeyPress={submitEnter} value={name} onChange={e => setName(e.target.value)}/>
            <button className={`border rounded inline-block mt-6 px-3 ${submitName=== true ? 'hidden' : ''} ${buttonElement === "Enter Name" ? "text-black" : "text-red-600"}`} onClick={onSubmitName}>{buttonElement}</button>

            <div className="mt-4">
                {choices.map(choice => (
                <VotingChoice key={choice} choice={choice} choices={choices} moveUp={moveUp} moveDown={moveDown} voted={voted}/>
                ))}
            </div>
            <button className={`border rounded mt-6 px-3 ${submitName=== false ? 'hidden' : ''} ${voted === true ? 'hidden' : ''}`} onClick={orderSubmit}>Submit Ranking</button>
            <div className={`rounded mt-6 px-3 ${voted === false ? 'hidden' : ''}`}>Redirecting to results...</div>
        </div> 
        </>
    )

    // send name to firebase as doc id 
    // orderSubmit()
}