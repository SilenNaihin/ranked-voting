import {useEffect, useState} from 'react';
import db from '../../firebase/firestoreClient';
import { useRouter } from "next/router";
// import VotingChoice from "../../components/resultsChoices";
import imgArrow from '../../public/images/triangle.svg'

export default function Results(){
    const router = useRouter();
    const [pollquestion,setPollQuestion] = useState('');
    const [choices,setChoices] = useState([]);
    const [numwinners,setNumWinners] = useState(0);
    const [voters,setVoters] = useState(0)


    useEffect(()=> {
        const fetchData = async () => {
            const docRef = db.collection('poll').doc(`${router.query.pollId}`);
            console.log(docRef)
            
            const doc = await docRef.get();
            console.log(doc)
        
            const docData = doc.data();
            console.log(docData)
            console.log(`${router.query.pollId}`)

            if (!!docData){ 
                for(const key in docData) {
                    if (key == 'choices'){
                        setChoices(docData[key]);
                        console.log('choices: ' + choices)
                    } else if (key == 'winners'){
                        setNumWinners(docData[key]);
                        console.log('numwinners: ' + numwinners)
                    } else if (key == 'question'){
                        setPollQuestion(docData[key]);
                        console.log('pollquestion: ' + pollquestion)
                    } else if (key == 'voters'){
                        setVoters(docData[key]);
                        console.log('voters: ' + voters)
                    } else {
                        console.log('error')
                    }
                 }       
                
                
            } else {
                router.push('/')
                console.log('other')
          }
        }

        if (router.query.pollId) fetchData();
    }, [router.query]);

    return (
        <>
        <div className="text-center text-4xl bold mt-24">Results</div>
        <div className="text-center text-3xl bold mt-12">{pollquestion}</div>
        <button className="mx-auto text-xl bold mt-6 pl-3 bg-gray-300 rounded flex justify-center">
            <p className="inline">{voters} voters</p>
            <img src={imgArrow}  width='20px' height='20px' className="my-auto inline ml-12 mr-2"></img>
        </button>
        </>
    )
}