// components/PopupComponent.js
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Box, Button, Typography } from "@mui/material"

const MissionCard = ({vp, scoreVp, setIsOpen, isOpen, togglePopup, secondary, discardCard}) => {

    let secondaries = [["Extend Battle Lines", `At the end of your turn, if you control one or more objective markers in your own deployment zone and you also control one or more objective markers in No Man's Land, this Secondary Mission is achieved and you score 5VP.\n\nIf you only have one unit remaining in your army, then this Secondary Mission is instead achieved at the end of your turn if that unit  controls one objective marker in No Man's Land, but in this instance you score 2VP instead of 5VP.`], 
    ["Behind Enemy Lines",`At the end of your turn, if two or more units from your army (excluding AIRCRAFT) are wholly within your opponent's deployment zone, this Secondary Mission is achieved and you score 4VP (or 5VP if you are using Tactical Missions).\n\nIf, at the end of your turn, only one unit from your army (excluding AIRCRAFT) is wholly within your opponent's deployment zone, then this Secondary Mission is still achieved, but in this instance you score 3VP instead of 4VP (or instead of 5VP).`], 
    ["Assassination", "If you are using Tactical Missions, then at the end of the turn, if either of the conditions below are satisfied, this Secondary Mission is achieved and you score 5VP.\n\n1. One or more enemy CHARACTER units were destroyed during this turn.\n\n2. All CHARACTER units from your opponent's Army Roster have been destroyed during the battle.\n\nNote that if you are using Tactical Missions, this Secondary Mission is achieved even if such a unit was destroyed and then subsequently resurrected for any reason."],
    ["Bring It Down", "While this Secondary Mission is active, each time an enemy Monster or VEHICLE model is destroyed, you score 2VP and an extra 1VP for each of the conditions below that are satisfied (all are cumulative):\n\n1. The destroyed model had a Wounds characteristic of 10+.\n2. The destroyed model had a Wounds characteristic of 15+.\n3. The destroyed model had « Wounds characteristic of 20+.\n\nNote that VP are scored even if such a model is destroyed and then subsequently resurrected for any reason. If you score any VP from this Secondary Mission during a turn, then at the end of that turn this Secondary Mission is achieved.\n\nIf you are Using Tactical Missions, then when this Secondary Mission is achieved you score an extra 1VP However, if you are Using Tactical Missions, you cannot score more than 8VP in total from this Secondary Mission."],
    ["Engage On All Fronts", "At the end of your turn, if you have one or more qualifying units (see below) from your army wholly within three or more different table quarters, and those units are all more than 3 inches away from any other table quarter, this Secondary Mission is achieved and you score 4VP if you have qualifying units in four different table quarters, or 2VP if you have qualifying units in three different table quarters.\n\nWhile a unit is Battle-shocked, it is not a qualifying unit.\n\nIf, when you draw this Secondary Mission card, you only have one or two qualifying units remaining in your army, you can discard this Secondary Mission card and draw a new Secondary Mission card.\n\nIf you are using Tactical Missions, then when this Secondary Mission is achieved you score an extra 1VP [for a maximum of 5VP)."],
    ["Storm Hostile Objective", "At the end of your turn, if either of the below conditions are satisfied, this Secondary Mission is achieved and you score 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions:\n\n1. You control one or more objective markers that were controlled by your opponent at the start of your turn.\n2. Your opponent did not control any objective markers at the start of your turn and you control one or more objective markers that you did not control at the start of your turn.\n\nThis Secondary Mission cannot be achieved during the first battle round; if you randomly drew this Secondary Mission card during the first battle round, draw a new Secondary Mission card and shuffle this Secondary Mission card back into your Secondary Mission deck."],
    ["Cleanse", "In your Shooting phase, you can select one or more units from your army thet are not Battle-shocked and are eligible to shoot. Until the end of your turn, the units you selected are not eligible to shoot or declare a charge.\n\nAt the end of your turn, each objective marker that is not within your deployment zone that you control that has one or more of these selected units within range is cleansed by your army.\n\nIf one or more objective markers are cleansed by your army this turn, this Secondary Mission is achieved and you score a number of VP depending on the number of objective markers cleansed by your army this turn, as follows:\n\n1. objective marker cleansed = 2VP if you are using Fixed Missions, or 3VP if you are using Tactical Missions.\n2. or more objective markers cleansed = 4VP if you are using Fixed Mission, or 5VP if you arc Using Tactical Missions"],
    ["Deploy Teleport Homer", "In your Shoooting phase, you can select one or more Units from your army that are not Battle-shocked and are eligible to shoot. Until the end of your turn, the units you selected are not eligible to shoot or declare a charge.\n\nAt the end of your turn, if that unit is within your opponent's deployment zone, or within 6 inches of the centre of the battlefield, it deploys a teleport homer at that location, this Secondary Mission is achieved and you score a number of VP depending on where the teleport homer was deployed, as follows:\n\n1. Centre of battlefield = 3VP. \n2. Opponents deployment zone = 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions"], 
    ["Investigate Signals", "In your Shooting phase, you can select one or more units from your army thet are not Battle-shocked and are eligible to shoot. Until the end of your turn, the units you selected are not eligible to shoot or declare a charge.\n\nAt the end of your turn, each comer of the battlefield that has one or more of these selected units wholly within 9 inches of it is scanned by your army.\n\nIf one or more corners are scanned by your army, this Secondary Mission is achieved and you score 2VP for each corner scanned by your army this turn. "], 
    ["No Prisoners", "While this Secondary Mission is active, each time an enemy unit is destroyed, you score 2VP (to a maximum of 5VP].\n\nNote that VP are scored even if such a unit is destroyed and then subsequently resurrected for any reason. If you score any VP from this Secondary Mission during a turn, then at the end of that turn this Secondary Mission is achieved."], 
    ["Defend Stronghold", "At the end of your opponent's turn, or at the end of the battle (whichever comes first), if you control one or more objective markers in your own deployment zone, this Secondary Mission is achieved end you score 3VP.\n\nThis Secondary Mission cannot be achieved during the first battle round; if you draw this Secondary Mission card during the first battle round, draw a new Secondary Mission card and shuffle this Secondary Mission card back into your Secondary Mission deck."],
    ["Overwhelming Force", "While this Secondary Mission is active, each time an enemy unit that started the turn within range of an objective marker is destroyed, you score 3VP (to a maximum of 5VP).\n\nNote that VP are scored even if such a unit is destroyed and then subsequently resurrected for any reason. If you score any VP from this Secondary Mission during a turn, then et the end of that turn this Secondary Mission is achieved."],
    ["Secure No Mans Land", "At the end of your turn, if you control two or more objective markers in No Man's Land, this Secondary Mission is achieved and you score 5VP.\n\nIf, at the end of your turn, you only control one objective marker in No Man's Land, this Secondary Mission is still achieved, but in this instance you score 2VP instead of 5VP."], 
    ["Area Denial", "At the end of your turn, if one or more units from your army [excluding Battle-shocked units) are wholly within 6 inches of the centre of the battlefield, and there are no enemy units wholly within 6 inches of the centre of the battlefield, this Secondary Mission is achieved and you score 5VP.\n\nIf, at the end of your turn, there are one or more enemy units wholly within 6 inches of the centre of the battlefield, but there are no enemy units within 3 inches of the centre of the battlefield, then this Secondary Mission is still achieved, but in this instance you score 3VP instead of 5VP"], 
    ["A Tempting Target", "When this Secondary Mission card is drawn, your opponent must select one objective marker in No Man's Land.\n\nAt the end of your turn, if you control that selected objective marker, this Secondary Mission is achieved and you score 5VP."],
    ["Capture Enemy Outpost", "At the end of your turn, if you control one or more objective markers in your opponent's deployment zone, this Secondary Mission is achieved and you score 5VP."]]

    const [newVp, setNewVp] = useState(0)

    return (
      <Box sx={{ textAlign: 'center', mt: 4, position: 'relative' }}>
        <Popup open={isOpen} modal nested>
          <Box bgcolor="#363636" sx={{ p: 2, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <Typography variant="h6" style={{ whiteSpace: "pre-line" }}>
              {secondaries[secondary[1]] ? secondaries[secondary[1]][0] : null}
            </Typography>
            <Typography sx={{m:2}} style={{ whiteSpace: "pre-line" }}>
              {secondaries[secondary[1]] ? secondaries[secondary[1]][1] : null}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => {setIsOpen(false); discardCard(secondary[0], secondary[1])}}
              sx={{ position: 'absolute', top: 0, right: 0, m: 2 }}
            >
              Discard Card
            </Button>
            <Popup trigger={<Button variant="contained" sx={{ mt: 2 }}>Score this Secondary</Button>}>
              <Box bgcolor="#363636" sx={{ p: 2, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                <Typography variant="h6">Points Scored: {newVp}</Typography>
                <Typography>Current VP: {vp}</Typography>
                <Button variant="contained" onClick={(e) => { e.stopPropagation(); setNewVp(newVp + 1); }} sx={{ mt: 2, mx: 2 }}>+</Button>                
                <Button variant="contained" onClick={(e) => { e.stopPropagation(); scoreVp(secondary[0], newVp); }} sx={{ mt: 2 }}>Score!</Button>
                <Button variant="contained" onClick={(e) => { e.stopPropagation(); setNewVp(newVp - 1); }} sx={{ mt: 2, mx: 2 }}>-</Button>                
              </Box>
            </Popup>
          </Box>
        </Popup>
      </Box>
    );
  };

export default MissionCard;
