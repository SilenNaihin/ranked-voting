export default function VotingChoice ({choices,choice,moveUp,moveDown,voted}) {
    let index = choices.indexOf(choice) + 1 + "."; 

    return (
        <div>
            <div className="mr-2 inline-block">{index}</div>
            <label className="" htmlFor="name">{choice}</label>
            <button className={`text-green-600 shadow rounded-sm w-4 ml-6 font-bold text-center text-lg y-auto ${voted === true ? 'hidden' : ''}`} onClick={() => moveUp(choice)}> + </button>
            <button className={`text-red-600 shadow rounded-sm w-4 ml-2 font-bold text-center text-lg y-auto ${voted === true ? 'hidden' : ''}`} onClick={() => moveDown(choice)}> - </button>
            <br></br>
        </div>
    )
}