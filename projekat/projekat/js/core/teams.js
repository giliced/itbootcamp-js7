
teams = window.script || {};

teams = {

    teamUsers: [],

    init: function() {
        let teamUser = localStorage.getItem("myTeam");
        this.teamUsers = teamUser == "undefined" ? [] : JSON.parse(localStorage.getItem("myTeam"));
    },

    addToTeam: function(userToken, from, to) {
        let allUsers = users.getAllUsers();
        for(let user in allUsers) {
            if(allUsers[user].token === userToken) {
                if(!users.isHiredAtDate(user, from, to)) {
                    users.markHired(allUsers[user], from, to);
                    this.addDeveloperToTeam(allUsers[user], from, to);
                    alert("You have added this developer to your team.");
                } else {
                    alert("This developer is already hired at that date!");
                }
            }
        }
    },

    addDeveloperToTeam: function(user, from, to) {
        if(this.teamUsers === null) {
            this.teamUsers = [];
        }
        this.teamUsers.push({
            userToken: user.token,
            from: from,
            to: to,
        });
        localStorage.setItem("myTeam", JSON.stringify(this.teamUsers));
    },

    getTeam: function() {
        return this.teamUsers;
    },

    removeUserFromTeam: function(userToken) {
        for(let teamUser in this.teamUsers) {
            if(this.teamUsers[teamUser].token === userToken) {
                users.removeScheduleForUser(userToken, this.teamUsers[teamUser].from, this.teamUsers[teamUser].to);
                this.teamUsers.splice(teamUser, 1);
                this.saveTeamMembers();
                break;
            }
        }
    },

    saveTeamMembers: function() {
        localStorage.setItem("myTeam", JSON.stringify(this.users));
    },

    isPartOfATeam: function(userToken) {
        for(let user in this.teamUsers) {
            if(this.teamUsers[user].userToken === userToken) {
                return true;
            }
        }
        return false;
    }

};