import { fetchTeams, getTeams } from "./dataAccess.js"

const mainContainer = document.querySelector("#enter-team-container")

fetchTeams().then(() => {
    mainContainer.innerHTML = Form()

})


const Form = () => {
        const teams = getTeams()
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
            document.dispatchEvent(new CustomEvent("team-1-ready"))
        }
    }   
})

document.addEventListener("team-1-ready", e => {
    const teamOneReady = "<button>Team 1 Ready!</button>"
    fetchTeams().then(() => {
        mainContainer.innerHTML = `${Form()} ${teamOneReady}`
    })
    alert("Please Choose the second team!")

})


// document.addEventListener("click", e => {
//     if(e.target.id === "save-team"){
//         const theTeamIndex =  document.getElementById("choose-team").selectedIndex
//         const userTeamName = document.getElementById("choose-team").options[theTeamIndex].text
//         const userFirstPlayerName = document.getElementById("first_player_name").value
//         const userSecondPlayerName = document.getElementById("second_player_name").value
//         const userThirdPlayerName = document.getElementById("third_player_name").value

//         if(userTeamName&&userFirstPlayerName&&userSecondPlayerName&&userThirdPlayerName){
//             document.dispatchEvent(new CustomEvent("team-2-ready"))
//         }
// }})

// document.addEventListener("team-2-ready", e => {
//     const teamOneReady = "<button>Team 2 Ready!</button>"
//     const teamTwoReady = "<button>Team 2 Ready!</button>"
   
//     fetchTeams().then(() => {
//         mainContainer.innerHTML = `${Form()} ${teamTwoReady}`
//     })
//     alert("Please Choose the third team!")

// })