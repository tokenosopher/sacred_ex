import React from 'react';
import styled from 'styled-components';

const About = () => {

    return (
        <Container>
            <TLDRContainer>
                <Header>TL:DR</Header>
                <p>SacredEx aims to tackle some of the fundamental problems that our society faces, and also aims to make the users of the dex healthier, happier and more knowledgeable. </p>
                <p>Our motto? <i>Don’t just make money, make a difference.</i></p>
            </TLDRContainer>
            <GoalContainer>
                <Header>Goal</Header>
                <p>Dexes have the potential to become major financial powers. At the time of this writing, the Uniswap TVL is at almost 6 billion dollars. Our goal is to have each million added to SacredEx improve the lives of those using it and of the society at large, while also making the users of the Dex money.</p>
            </GoalContainer>
            <HowContainer>
                <Header>How?</Header>
                <p>First, the coins listed on SacredEx need to satisfy some conditions. All of them will be created as sacred contracts - a sacred contract is a contract that at its creation states that “this contract is built for the betterment of all” in its code (the contract is currently in development).</p>
                <p>Second, all of the coins need to be sacred coins. Sacred coins are contracts built with guidelines in mind, intended for the user of the coin. For example, the guideline of the gratitude coin is <i>Every time you buy or sell the coin, you should think about something that you’re grateful for.</i> These guidelines are stored in the coin’s contract, and the SacredEx retrieves them and places them on the website, for all to see.</p>
                <p>Sacred coins are built with accomplishing a goal in mind - for example, the intention of the gratitude coin is to spread the practice of gratitude; The  intention of the General Peace Token is to foster peace in the world.</p>
                <p>To that end, sacred coins have unique functionalities that aim to help reach their stated goal. For example, the gratitude coin allows people to write a message of gratitude when they buy or sell the coin. SacredEx accommodates those unique functionalities within the decentralized exchange. So in the case of the gratitude coin, the user has the option of writing a message of gratitude. That message then not only gets published on the blockchain, but it also goes on social media websites (currently Twitter) to help inspire others to think about what they are grateful for.</p>
                <p>And finally, a portion of the fee that the exchange charges for a transaction will go towards charities that help to accomplish the coin’s goals, via Endaoment. So for example, a portion of the fee acquired when buying or selling the General Peace Token will go towards The World Peace Game Foundation and PeaceDirect - both of which aim to help solve conflicts and bring about world peace. (Feature currently in development)</p>
                <p>That way, the more users buy a specific coin, the more resources goes towards accomplishing its goal.</p>
                <p>Eventually, SacredEx aims to make the process of choosing the charities that the fees will go to decentralized.</p>
            </HowContainer>
            <WhatItMeansContainer>
                <Header>What does this mean?</Header>
                <p>It means that when you are investing on SacredEx you are not just making money, you are making a difference.</p>
                <p>Every coin that you invest in is aimed towards the betterment of all, or towards enriching the lives of the coin users.</p>
                <p>There is still opportunity to make money, of course - a coin’s value may grow via your investment and or spreading the popularity of the coin, but on SacredEx, this money making opportunity is  coupled with the opportunity of doing good. To have one of these coins gain popularity means to raise awareness around the topic that it addresses, via its stated goal and via the messages that people write, and to divert resources in that direction via the dex exchange fee. So it is a win-win-win.</p>
                <p>It has been said that love of money is the root of all evil.  On SacredEx, we aim to show that with the help of blockchain technology, love of money can become the root of all good.</p>
            </WhatItMeansContainer>
        </Container>
    )
}
export default About;

const Container = styled.div`
    min-height: calc(100vh - 70px);
    align-items: center;
    margin-left: calc(7vw + 10px);
    margin-right: calc(7vw + 10px);
    color: white;
    margin-top: 40px;
`;

const Header = styled.h1`
`

const TLDRContainer = styled.div`
  margin-left: calc(3.5vw + 5px);
`

const GoalContainer = styled.div`
  margin-left: calc(3.5vw + 5px);
`

const HowContainer = styled.div`
  margin-left: calc(3.5vw + 5px);
`

const WhatItMeansContainer = styled.div`
  margin-left: calc(3.5vw + 5px);
`