/* eslint-disable indent */
import { getUserTeams, fetchUserTeams, saveGame } from './dataAccess.js';

const roundsBody = document.querySelector('#rounds-container'); 

fetchUserTeams().then(() => {
    roundsBody.innerHTML = `${roundPage()}`;
  });

  
const roundPage = () => {
    let html = '';
    html += ` 
    <h2>Round One</h2>
    ${roundTable()}
    <h2>Round Two</h2>
    ${roundTable()}
    <h2>Round Three</h2>
    ${roundTable()}
    <a href="../pages/leaderboard.html"><button id="save_game">Save Game</button></a><br>
    `;
    return html; 
};


  const roundTable = () => {
      
      const teams = getUserTeams();

      return `
      <div class="round_table">
      <table>
      <thead>
      <tr>
      <th>🎲</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      ${teams.map(team => {
          return `
          <td class="${team.id}">${team.teamName}</td>
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
            const teamOneGameScore = parseInt(document.querySelectorAll('.points')[0].value) + parseInt(document.querySelectorAll('.points')[3].value) + parseInt(document.querySelectorAll('.points')[6].value);
            const teamTwoGameScore = parseInt(document.querySelectorAll('.points')[1].value) + parseInt(document.querySelectorAll('.points')[4].value) + parseInt(document.querySelectorAll('.points')[7].value);
            const teamThreeGameScore = parseInt(document.querySelectorAll('.points')[2].value) + parseInt(document.querySelectorAll('.points')[5].value) + parseInt(document.querySelectorAll('.points')[8].value);

            const firstTeamName = document.getElementsByClassName('1')[0].textContent;
            const secondTeamName = document.getElementsByClassName('2')[0].textContent;
            const thirdTeamName = document.getElementsByClassName('3')[0].textContent;

            const sendToAPI = {
                firstTeamName : firstTeamName,
                firstTeamScore: teamOneGameScore,
                secondTeamName : secondTeamName,
                secondTeamScore: teamTwoGameScore,
                thirdTeamName : thirdTeamName,
                thirdTeamScore: teamThreeGameScore,
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