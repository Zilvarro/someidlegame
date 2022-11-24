import AlphaResearchBar from './AlphaResearchBar.js'

export default function AlphaResearchTab({state, updateState, setTotalClicks}) {
return (
    <div>{<>
        <h2>Research</h2>
        <AlphaResearchBar key="research" research={"test"} state={state} updateState={updateState}/>
        <p>Starting x: 10
            <br/>&rarr;Unspent Alpha (x100)
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 1st S-Reset (x1.41)
        </p>
        <p>Production Speed x': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 2nd S-Reset (x1.41)
        </p>
        <p>Production Speed x'': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 3rd S-Reset (x1.41)
        </p>
        <p>Production Speed x''': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on &alpha;-Reset (x1.41)
        </p>
        <p>Formula Efficiency: 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Fastest time 1h23m59s on &alpha;-Reset (x1.41)
        </p>
        <p>Passive Alpha: 1 every 1234s
            <br/>&rarr;Alpha Upgrade (10%)
            <br/>&rarr;Best &alpha; over time on &alpha;-Reset (12340s)
        </p>
        </>}
    </div>)
}