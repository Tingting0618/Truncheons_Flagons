/* eslint-disable indent */
import { getTeams, fetchTeams, saveGame } from './dataAccess.js';

const roundsBody = document.querySelector('#rounds-container'); 

fetchTeams().then(() => {
    roundsBody.innerHTML = `${roundPage()}`;
  });

  
const roundPage = () => {
    let html = '';
    html += ` 
    ${roundTable()}
    ${roundTable()}
    ${roundTable()}
    <button id="save_game">Save Game</button><br>
    `;
    return html; 
};


  const roundTable = () => {
      
      const teams = getTeams();

      return `
      <div class="round_table">
      <table>
      <thead>
      <tr>
      <th>Round Score</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      ${teams.map(team => {
          return `
          <td value="${team.id}">${team.teamName}</td>
          <td><input class="points" type="number" id="${team.id}"/></td>
          `;
        }).join('')}
        </tr>
        </tbody>
        </table>
        </div>
        `;
    };
    
    roundsBody.addEventListener('click', e => {
        if (e.target.id === 'save_game') {
            const teamOneGame = parseInt(document.querySelectorAll('.points')[0].value) + parseInt(document.querySelectorAll('.points')[3].value) + parseInt(document.querySelectorAll('.points')[6].value);
            const teamTwoGame = parseInt(document.querySelectorAll('.points')[1].value) + parseInt(document.querySelectorAll('.points')[4].value) + parseInt(document.querySelectorAll('.points')[7].value);
            const teamThreeGame = parseInt(document.querySelectorAll('.points')[2].value) + parseInt(document.querySelectorAll('.points')[5].value) + parseInt(document.querySelectorAll('.points')[8].value);


            const sendToAPI = {
                teamOne : teamOneGame,
                teamTwo : teamTwoGame,
                teamThree : teamThreeGame
            };
        
            // if(document.querySelectorAll('.points').every(input => {
            //      return input.value > 0;
            // })){
                saveGame(sendToAPI);
        //     } else {
        //         alert('Please enter all scores before submitting team points!');
        //     }
        // }
    }});