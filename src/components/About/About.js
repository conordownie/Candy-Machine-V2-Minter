import React from 'react'
import { AboutContainer, AboutText, AboutTitle, AboutWrapper, ImageRow, ImageWrapper, FrogExample, AboutBox, PriceWrapper, PriceText } from './AboutElements'

import Preview1 from '../../img/About/Preview1.png'
import Preview2 from '../../img/About/Preview2.png'
import Preview3 from '../../img/About/Preview3.png'
import Preview4 from '../../img/About/Preview4.png'
import { AboutArea } from '../Hero/HeroElements'


const AboutSection = () => {
    return (
        <AboutContainer {...AboutArea}>
            <AboutWrapper>
                <AboutBox>
                    <AboutTitle>
                    The Boy Who Saved NFTs 
                    </AboutTitle>
                    <AboutText>
                    SMINEM saved crypto once, and he is coming back to save Solana NFTs from the bear market through a collection of uniquely generated Sminem NFTS living on the Solana blockchain.
                    </AboutText>
                    <PriceWrapper>
                    <PriceText>
                        Supply: 4269
                    </PriceText>
                    <PriceText>
                        Price: 1 SOL 
                    </PriceText>
               
                    </PriceWrapper>
                </AboutBox>
                <ImageWrapper>
                    <ImageRow>
                        <FrogExample src = {Preview1}/>
                        <FrogExample src = {Preview2}/>
                    </ImageRow>
                    <ImageRow>
                        <FrogExample src = {Preview3}/>
                        <FrogExample src = {Preview4}/>
                    </ImageRow>
                </ImageWrapper>
            </AboutWrapper>
            </AboutContainer>
    )
}

export default AboutSection
