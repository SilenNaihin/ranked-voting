export default function VotingChoice ({choices,choice}) {
    let index = choices.indexOf(choice) + 1 + "."; 

    return (
        <div>
            <div className="mr-2 inline-block">{index}</div>
            <label className="" htmlFor="name">{choice}</label>
            <br></br>
        </div>
    )
}