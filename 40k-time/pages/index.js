"use client"
import { act, useEffect, useState } from "react";
import { Grid, Typography, Container, Button } from "@mui/material";
import MissionCard from "../components/MissionCard";
import Popup from "reactjs-popup";
import MissionCardMobile from "../components/MissionCardMobile";

export default function Home() {
  
  let secondaryNames = ["Extend Battle Lines", "Behind Enemy Lines", "Assassination", "Bring It Down", "Engage On All Fronts", "Storm Hostile Objective", "Cleanse", "Deploy Teleport Homer", "Investigate Signals", "No Prisoners", "Defend Stronghold", "Overwhelming Force", "Secure No Mans Land", "Area Denial", "A Tempting Target", "Capture Enemy Outpost"]

  const [attackerSecondaries, setAttackerSecondaries] = useState([]);
  const [defenderSecondaries, setDefenderSecondaries] = useState([]);
  const [attackerUsedSecondaries, setAttackerUsedSecondaries] = useState([]);
  const [defenderUsedSecondaries, setDefenderUsedSecondaries] = useState([]);
  const [error,setError] = useState([])
  const [attackerVp, setAttackerVp] = useState(0)
  const [defenderVp, setDefenderVp] = useState(0)
  const [vp, setVp] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let tempActiveSecondary = [];

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 16);
  };

  const togglePopup = () => setIsOpen(!isOpen);

  const scoreVp = (player, vp) => {
    if (player == "attacker") {
      let newVp = attackerVp + vp
      setAttackerVp(newVp)
    } else {
      let newVp = defenderVp + vp
      setDefenderVp(newVp)
    }
    setIsOpen(false)
  }

  const drawCard = (player) => {
    if (player === "attacker") {
      setAttackerSecondaries((prev) => {
        if (prev.length >= 16) return prev; // Check if the list is 16 or longer
        let newCard = getRandomNumber();
        while (prev.includes(newCard)) {
          newCard = getRandomNumber();
        }
        setAttackerUsedSecondaries((usedPrev) => [...usedPrev, newCard]);
        return [...prev, newCard];
      });
    } else {
      setDefenderSecondaries((prev) => {
        if (prev.length >= 16) return prev; // Check if the list is 16 or longer
        let newCard = getRandomNumber();
        while (prev.includes(newCard)) {
          newCard = getRandomNumber();
        }
        setDefenderUsedSecondaries((usedPrev) => [...usedPrev, newCard]);
        return [...prev, newCard];
      });
    }
  };
  
  

  const resetCards = () => {
    setAttackerSecondaries([]);
    setDefenderSecondaries([]);
    setAttackerUsedSecondaries([]);
    setDefenderUsedSecondaries([]);
    setAttackerVp(0);
    setDefenderVp(0);
  }

  const handleButtonClick = (type, card) => {
    if (isMobile) {
      openPopupMobile(type, card);
    } else {
      openPopup(type, card);
    }
  };

  const openPopupMobile = (player, newCard) => {
    tempActiveSecondary = [player, newCard];
    setActiveSecondary(tempActiveSecondary)
    if(player == "attacker"){
      setVp(attackerVp)
    } else {
      setVp(defenderVp)
    }
    togglePopup();
  } 

  const openPopup = (player, newCard) => {
    tempActiveSecondary = [player, newCard];
    setActiveSecondary(tempActiveSecondary)
    if(player == "attacker"){
      setVp(attackerVp)
    } else {
      setVp(defenderVp)
    }
    togglePopup();
  }

  const startGame = () => {
    setAttackerSecondaries([]);
    setDefenderSecondaries([]);
    setAttackerUsedSecondaries([]);
    setDefenderUsedSecondaries([]);
    drawCard("attacker");
    drawCard("attacker");
    drawCard("defender");
    drawCard("defender");
  };

  const discardCard = (player, card) => {
    if (player === "attacker") {
      setAttackerSecondaries(attackerSecondaries.filter(c => c !== card));
    } else {
      setDefenderSecondaries(defenderSecondaries.filter(c => c !== card));
    }
  };

  return (
    <main>
      <Container style={{ padding: "2rem" }} maxWidth="md">
        <Typography style={{ margin: "2rem", textAlign: "center" }}>
          40k Leviathan Deck Secondaries Tool
        </Typography>
        <Typography>{error}</Typography>
        <Grid container spacing={2} style={{height:"200px"}}>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "center", marginBottom:"1rem" }}>Attacker: {attackerVp}</Typography>
            <Grid container spacing={1} direction="column" alignItems="center">
              {attackerSecondaries.map((card, index) => (
                <Grid item key={index}>
                  <Button variant="contained" color="secondary" onClick={() => handleButtonClick("attacker", card)}>
                    {secondaryNames[card]}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "center", marginBottom:"1rem"}}>Defender: {defenderVp}</Typography>
            <Grid container spacing={1} direction="column" alignItems="center">
              {defenderSecondaries.map((card, index) => (
                <Grid item key={index}>
                  <Button variant="contained" color="secondary" onClick={() => handleButtonClick("defender", card)}>
                    {secondaryNames[card]}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "2rem" }}>
          <Grid container spacing={2} style={{ marginTop: "2rem" }} justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={() => drawCard("attacker")} fullWidth>
                Draw Attacker Card
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={startGame} fullWidth>
                Start Game
              </Button>
              <Popup
                trigger={<Button variant="contained" color="warning" style={{margin:"1rem 0"}}fullWidth>Reset Game</Button>}
              >{close =>
                <Button variant="contained" color="error" fullWidth onClick={()=>{resetCards();close();}}>Confirm Reset</Button>
              }
              </Popup>
            </Grid>          
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={() => drawCard("defender")} fullWidth>
                Draw Defender Card
              </Button>
            </Grid>
          </Grid>
        </Grid> 
      </Container>
      <MissionCard
        vp = {vp}
        scoreVp={scoreVp}
        setIsOpen={setIsOpenMobile}
        isOpen={isOpenMobile} 
        togglePopup={togglePopup}
        secondary={activeSecondary}
        discardCard={discardCard}
      />
      <MissionCardMobile
        vp = {vp}
        scoreVp={scoreVp}
        setIsOpen={setIsOpen}
        isOpen={isOpen} 
        togglePopup={togglePopup}
        secondary={activeSecondary}
        discardCard={discardCard}
      />
    </main>
  );
}
