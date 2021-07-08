const applicationState = {
    readyButtons: [],
    readyButton: {}
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

export const sendTeams = (team) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
    }

    return fetch(`${API}/userTeams`, fetchOptions)
    .then(response => response.json())
}

export const fetchUserTeams = () => {
    return fetch(`${API}/userTeams`)
    .then(response => response.json())
    .then(teams => {
        applicationState.userTeams = teams
    })
}

export const getUserTeams = () => {
    return applicationState.userTeams.map(team => ({...team}))
}

export const saveGame = (game) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    }

    return fetch(`${API}/scores`, fetchOptions)
    .then(response => response.json())
}

export const fetchScores = () => {
    return fetch(`${API}/scores`)
    .then(res => res.json())
    .then((scores) => {
        applicationState.scores = scores
    })
}

export const getScores = () => {
    return applicationState.scores.map(score => ({...score}))
}

export const saveTotal = (points) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(points)
    }

    return fetchTeams(`${API}/allTeams`, fetchOptions)
    .then(response => response.json())
} 