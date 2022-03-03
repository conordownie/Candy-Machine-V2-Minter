import React, {useState, useEffect} from 'react'
import { BarAndText, Phase, PhaseContainer, PhaseTitle, RoadmapContainer, RoadmapGoal, RoadmapText, UpArrow, ButtonDiv, DownArrow } from './RoadmapElements'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'


const RoadmapGoals = () => {
    

    const [PhaseNumber, setPhaseNumber] = useState(0);
    
    if (PhaseNumber < 1){

        
    return (
        <RoadmapContainer>
            <ButtonDiv>
                
            </ButtonDiv>
        <PhaseContainer>
        <Phase>
            <PhaseTitle style={{ color: "#030303"}}>
                ROADMAP
            </PhaseTitle>
        </Phase>
        <BarAndText>
            <RoadmapText>
                <RoadmapGoal>-Summon SMINEM</RoadmapGoal>
                <RoadmapGoal>-Whitelist + Presale for Select Communities</RoadmapGoal>
                <RoadmapGoal>-Public Mint</RoadmapGoal>
                <RoadmapGoal>-Secondary Market Listings </RoadmapGoal>
                <RoadmapGoal>-Save SOLANA NFTs through MEMEs and incentives </RoadmapGoal>
                <RoadmapGoal>-Whatever it takes to increase the floor </RoadmapGoal>
            </RoadmapText>
        </BarAndText>
        
    </PhaseContainer>
      <ButtonDiv>
      <DownArrow onClick={() => setPhaseNumber(PhaseNumber + 1)}>
          <TiArrowSortedDown/>
      </DownArrow>
  </ButtonDiv>
 
        </RoadmapContainer>
            ) 
    }
}





const RoadmapSegment = () => {

    return (
       <RoadmapGoals/>
    )
}

export default RoadmapSegment
