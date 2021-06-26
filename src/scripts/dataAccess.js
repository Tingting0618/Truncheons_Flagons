const applicationState = {
    readyButtons: [],
    readyButton: {

    }
}

const API = "http://localhost:4000"

let teams = []
export const fetchTeams = () => {
    return fetch(`${API}/allTeams`)
        .then(res => res.json())
        .then((allTeams) => {
            teams = allTeams
        })
}

export const getTeams = () => {
    return teams.map(team => ({...team }))
}

export const getButtons = () => {
    return applicationState.readyButtons.map(button => ({...button }))
}

export const setButtons = () => {
    const readyButton = {...applicationState.readyButton }
    readyButton.id = applicationState.readyButtons.length + 1
    readyButton.name = `<button>Team ${readyButton.id} Ready!</button>`
    applicationState.readyButtons.push(readyButton)
}