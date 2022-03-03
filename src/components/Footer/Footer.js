import React from 'react'
import { FaBars, FaDiscord, FaTwitter } from 'react-icons/fa'
import { FootIcon, Socials, Foot } from './FooterElements'

const Footer = () => {
    return (
        <Foot>
            <Socials>

                <FootIcon href="https://twitter.com/boywhosavedNFTS">
                    <FaTwitter/>
                </FootIcon>
            
            </Socials>

        </Foot>
    )
}

export default Footer
