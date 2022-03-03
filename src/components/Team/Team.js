import React from 'react'
import { ImgContainer, TeamContainer, TeamMember, TeamTitle, TeamImg, TeamInfo, SocialIcon, TeamWrapper } from "../Team/TeamElements.js"
import Frog7 from "../../img/Frogs/7.png"
import Frog15 from "../../img/Frogs/15.png"
import Frog60 from "../../img/Frogs/60.png"
import Frog80 from "../../img/Frogs/80.png"

import { FaTwitter } from 'react-icons/fa'

const Team = () => {
    return (
        <TeamContainer>
              <TeamTitle>
                TEAM
              </TeamTitle>
              <TeamWrapper>
              <ImgContainer>
  
                <TeamMember>
                <SocialIcon href="">
                      
                  <TeamImg src = {Frog15}/>

                  </SocialIcon>
                  <TeamInfo>
                    <h1>SMINEM</h1>
                    Dev
                  </TeamInfo>
                  <SocialIcon>
                
                  </SocialIcon>
                </TeamMember>


                <TeamMember>
                <SocialIcon href="https://twitter.com/boywhosavedNFTS">
                
                  <TeamImg src = {Frog7}/>
              
                  </SocialIcon>
                  <TeamInfo>
                    <h1>SMINEM</h1>
                    MARKETING
                  </TeamInfo>
                  <SocialIcon>
                   
                  </SocialIcon>
                </TeamMember>
  
              </ImgContainer>

      <ImgContainer>
              
              <TeamMember>
                <SocialIcon href="">
                <TeamImg src = {Frog60}/>
                </SocialIcon>
                <TeamInfo>
                  <h1>SMINEM</h1>
                  COMMUNITY MANAGER
                </TeamInfo>
                <SocialIcon></SocialIcon>
              </TeamMember>

              <TeamMember>
                <SocialIcon href="https://twitter.com/boywhosavedNFTS">
                <TeamImg src = {Frog80}/>
                </SocialIcon>
                <TeamInfo>
                  <h1>SMINEM</h1>
                   PUMPINOMIC DIRECTOR
                </TeamInfo>
                <SocialIcon></SocialIcon>
              </TeamMember>

            </ImgContainer>
            </TeamWrapper>
      </TeamContainer>
    )
}

export default Team
