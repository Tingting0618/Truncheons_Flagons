const applicationState = {}

const API = "http://localhost:4000" // json-server api/database.json -p 4000 -w

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