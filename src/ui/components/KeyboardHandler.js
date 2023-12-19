import HotkeyHandler from "./HotkeyHandler";

export default function KeyBoardHandler({state, updateState, popup}) {
    return <>
        <HotkeyHandler keyName="1,num_1" actionName="applyFormula" parameters={{slot: 0}} holdable={true}/>
        <HotkeyHandler keyName="2,num_2" actionName="applyFormula" parameters={{slot: 1}} holdable={true}/>
        <HotkeyHandler keyName="3,num_3" actionName="applyFormula" parameters={{slot: 2}} holdable={true}/>
        <HotkeyHandler keyName="4,num_4" actionName="applyFormula" parameters={{slot: 3}} holdable={true}/>
        <HotkeyHandler keyName="5,num_5" actionName="applyFormula" parameters={{slot: 4}} holdable={true}/>
        <HotkeyHandler keyName="b" actionName="basicReset" settingName="hotkeyBasicReset"/>
        <HotkeyHandler keyName="x" actionName="xReset" settingName="hotkeyXReset"/>
        <HotkeyHandler keyName="a" actionName="alphaReset" settingName="hotkeyAlphaReset"/>
        <HotkeyHandler keyName="t" actionName="toggleAutoAll" settingName="hotkeyToggleAuto"/>
        {/* <HotkeyHandler keyName="c" actionName="abortAlphaRun" settingName="hotkeyAbortRun"/> TODO: needs to also work in challenges :(*/}
        {/* <HotkeyHandler keyName="r" actionName="researchAll" settingName="hotkeyResearchAll"/> */}
    </>


}