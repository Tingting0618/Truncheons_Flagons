const applicationState = {}

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