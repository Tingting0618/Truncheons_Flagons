import { getUserTeams, fetchUserTeams, getScores, fetchScores, getTeams, fetchTeams } from './dataAccess.js';

const leaderboardBody = document.querySelector('#leaderboard-container'); 

fetchUserTeams().then(() => {
  fetchScores().then(() => {
    fetchTeams().then(() => {
      leaderboardBody.innerHTML = `${leaderboardPage()}`;
    });
  });
});

const leaderboardPage = () => {
  const teams = getUserTeams();
  const allTeams = getTeams();
  const scores = getScores();

  let html = '';
  html += `
  <div class="game_score">
      <table>
      <thead>
      <tr>
      <th>Current Game Scores</th>
      </tr>
      </thead>
      <tbody>
      ${scores.map(score => {
    return `
          <tr>
          <td>${score.firstTeamName}</td>
          <td>${score.firstTeamScore}</td>
          </tr>
          <tr>
          <td>${score.secondTeamName}</td>
          <td>${score.secondTeamScore}</td>
          </tr>
          <tr>
          <td>${score.thirdTeamName}</td>
          <td>${score.thirdTeamScore}</td>
          </tr>
          `;
  })}
        </tbody>
        </table>
        </div>
        
    <div class="leaderboard_table">
      <table>
      <thead>
      <tr>
      <th>Leaderboard</th>
      </tr>
      </thead>
      <tbody>
      ${allTeams.map(team => {
    return `
          <tr>
          <td value="${team.id}">${team.teamName}</td>
          <td>${team.currentPoints}</td>
          </tr>
          `;
  }).join('')}
        </tbody>
        </table>
        </div>`;

  return html;
};