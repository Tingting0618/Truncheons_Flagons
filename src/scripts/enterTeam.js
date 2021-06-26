import { fetchTeams, getTeams, getButtons, setButtons } from "./dataAccess.js"

const mainContainer = document.querySelector("#enter-team-container")

fetchTeams().then(() => {
    mainContainer.innerHTML = Form()
})


const Form = () => {
        const teams = getTeams()
        const buttons = getButtons()
        return `
        <div class="field">
        <lable>Team Name: </lable>
        <select id="choose-team">
        <option>please choose a team</option>
            ${teams.map(team => {
                return `<option>${team.teamName}</option>`
            }).join("")}
        </select>
        </div>

        <div class="field">
        <lable for="first_player_name">First Player Name: </lable>
        <input type="text" id="first_player_name">
        </div>

        <div class="field">
        <lable for="second_player_name">Second Player Name: </lable>
        <input type="text" id="second_player_name">
        </div>

        
        <lable for="third_player_name">Third Player Name: </lable>
        <input type="text" id="third_player_name">
        </div>

        <div class="field">
        <button id="create-team">Create Team</button>
        </div>

        <div class="buttons">
        ${buttons.map(button => {
            return `${button.name}`
        }).join("")}
        </div>

        `
        
}


document.addEventListener("click", e => {
    if(e.target.id === "create-team"){
        const theTeamIndex =  document.getElementById("choose-team").selectedIndex
        const userTeamName = document.getElementById("choose-team").options[theTeamIndex].text
        const userFirstPlayerName = document.getElementById("first_player_name").value
        const userSecondPlayerName = document.getElementById("second_player_name").value
        const userThirdPlayerName = document.getElementById("third_player_name").value

        if(userTeamName&&userFirstPlayerName&&userSecondPlayerName&&userThirdPlayerName){
            setButtons()
            document.dispatchEvent(new CustomEvent("state-changed"))
        }
    }   
})

document.addEventListener("state-changed", e => {
    const buttons = getButtons()
    if(buttons.length < 3){
        fetchTeams().then(() => {
            mainContainer.innerHTML = `${Form()}`
        })
    }else {
        fetchTeams().then(() => {
            mainContainer.innerHTML = `${Form()} <a><button>Head to Scoreboard</button></a>`
        })
    }
})