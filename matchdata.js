const TextDate = require('./textdate.js')


const laLigaTeams = ["Valencia", "Getafe", "Osasuna", "Espanyol", "Cadiz", "Levante", "Mallorca", "Real Betis", "Alaves", "Real Madrid", "Celta Vigo", "Atlético",
    "Barcelona", "Real Sociedad", "Sevilla", "Rayo Vallecano", "Vilarreal", "Granada", "Elche", "A Bilbao"];

const premierLeagueTeams = ["Brentford", "Arsenal", "Man Utd", "Leeds", "Burnley", "Brighton", "Chelsea", "C Palace", "Southampton", "Everton", "Leicester", "Wolves",
    "Watford", "Aston Villa", "Norwich", "Liverpool", "Newcastle", "West Ham", "Spurs", "Man City"];

const ligueOneTeams = ["Monaco", "Nantes", "Lyon", "Brest", "Troyes", "PSG", "Rennes", "Lens", "Bordeaux", "Clermont Foot", "Nice", "Reims",
    "St Etienne", "Lorient", "Strasbourg", "Angers", "Metz", "Lille", "Montpellier", "Marseille"];

class MatchData {
    constructor(date, time, teams, leagueId) {
        this.textDate = new TextDate(date);
        this.time = "" + time;

        this.teams = "" + teams;

        this.teamOne = "";
        this.teamTwo = "";

        let toLoopThrough = [];
        switch (leagueId) {
            case 0:
                toLoopThrough = laLigaTeams;
                break;
            case 1:
                toLoopThrough = premierLeagueTeams;
                break;
            case 2:
                toLoopThrough = ligueOneTeams;
                break;
        }

        toLoopThrough.forEach(team => {
            if (this.teams.includes(team)) {
                if (this.teams.split(team)[0].length < 1) this.teamOne = team;
                else this.teamTwo = team;
            }

            if (this.teams.includes(team.split(" ")[1])) {
                if (this.teams.split(team.split(" ")[0])[0].length < 1) this.teamOne = team;
                else this.teamTwo = team;
            }
        })
    }

    getTextDate() { return this.textDate; }

    getTime() { return this.time; }

    getTeamOne() { return this.teamOne; }

    getTeamTwo() { return this.teamTwo; }
}

module.exports = MatchData;