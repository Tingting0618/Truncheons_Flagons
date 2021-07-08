import { fetchTeams, getTeams, sendTeams, getButtons, setButtons } from './dataAccess.js';

const mainContainer = document.querySelector('#enter-team-container');

fetchTeams().then(() => {
  mainContainer.innerHTML = Form();
});


const Form = () => {
  const teams = getTeams();
  const buttons = getButtons();
  return `
      <div class="header_div">
      <h1 class="tf-header">TRUNCHEONS & FLAGONS</h1>
      </div>
       
      <div class="field">
        <label>Team Name: </label>
        <select id="choose-team">
        <option>please choose a team</option>
            ${teams.map(team => {
    return `<option value="${team.id}">${team.teamName}</option>`;
  }).join('')}
        </select>
        </div>

        <div class="field">
        <button id="create-team">Create Team</button>
        </div>

        <div class="buttons">
        ${buttons.map(button => {
    return `${button.name}`;
  }).join('')}
        </div>

        `;

};


document.addEventListener('click', e => {
  if (e.target.id === 'create-team') {
    const theTeamIndex = document.getElementById('choose-team').selectedIndex;
    const userTeamName = document.getElementById('choose-team').options[theTeamIndex].text;

    const dataSendToAPI = {
      teamName : userTeamName,
      teamId : theTeamIndex
    };

    if (userTeamName) {
      setButtons();
      sendTeams(dataSendToAPI);
      document.dispatchEvent(new CustomEvent('state-changed'));
    }
  }
});

document.addEventListener('state-changed', () => {
  const buttons = getButtons();
  if (buttons.length < 3) {
    fetchTeams().then(() => {
      mainContainer.innerHTML = `${Form()}`;
    });
  } else {
    fetchTeams().then(() => {
      mainContainer.innerHTML = `<div class="buttons">
      ${buttons.map(button => {
    return `${button.name}`;
  }).join('')}
      </div>
      <a href="../pages/rounds.html"><button>Head to Scoreboard</button></a>
      `;
    });
  }
});