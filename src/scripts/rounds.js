/* eslint-disable indent */
import { getTeams, fetchTeams } from './dataAccess.js';

const roundsBody = document.querySelector('#rounds-container'); 

fetchTeams().then(() => {
    roundsBody.innerHTML = `${roundOne()} ${roundTwo()} ${roundThree()}`;
  });

//roundOne will collect total scores and display in table
//   scores [{   
//     "id" : 1,
//     "roundId" : 1,
//     "teamId" :  1,
//     "score" : 5
// }]

const roundOne = () => {
    
    const teams = getTeams();

  return `
      <div class="roundTable">
        <table>
            <thead>
                <tr>
                    <th>Round One Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                ${teams.map(team => {
                return `
                    <td value="${team.id}">${team.teamName}</td>
                    <td><input type="text"/></td>
                    `;
                      }).join('')}
                </tr>
            </tbody>
        </table>
      </div>
      `;
};

const roundTwo = () => {

    const teams = getTeams();

return `
        <div class="roundTable">
        <table>
            <thead>
                <tr>
                    <th>Round Two Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                ${teams.map(team => {
                return `
                    <td value="${team.id}">${team.teamName}</td>
                    <td><input type="text"/></td>
                    `;
                      }).join('')}
                </tr>
            </tbody>
        </table>
      </div>
      `;
};

const roundThree = () => {

    const teams = getTeams();

return `
        <div class="roundTable">
        <table>
            <thead>
                <tr>
                    <th>Round Three Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                ${teams.map(team => {
                return `
                    <td value="${team.id}">${team.teamName}</td>
                    <td><input type="text"/></td>
                    `;
                      }).join('')}
                </tr>
            </tbody>
        </table>
      </div>
      `;
};

