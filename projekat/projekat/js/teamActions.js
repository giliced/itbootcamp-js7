$(document).ready(function() {

    teams.init();
    users.init();

    let teamUsers = teams.getTeam();

    let holder = $("<section></section>").addClass("d-flex justify-content-lg-center align-items-start flex-wrap col-8");

    teamUsers.forEach(function(teamUser, index) {

        let user = users.getUserWithToken(teamUser.userToken);

        let article = $("<article></article>")
            .addClass("card col-lg-3 col-12 m-1");

        let div = $("<div></div>")
            .addClass("card-body");

        let userName = $("<h5></h5>")
            .addClass("cart-title")
            .text(user.name);

        let fromDate = new Date(teamUser.from);
        let toDate = new Date(teamUser.to);

        let from = $("<p></p>")
            .addClass('cart-text')
            .text(fromDate.toDateString()+" - "+toDate.toDateString());

        let deleteButton = $("<button></button>")
            .text("Remove")
            .attr('data-user-token', teamUser.userToken)
            .addClass("btn btn-primary removeTeamMember");

        div.append(userName);
        div.append(from);
        div.append(deleteButton);
        article.append(div);

        holder.append(article);
    });

    if(teamUsers.length >= 1) {
        $("#teamMembers").html(holder);
    }

    $(document).on('click', '.removeTeamMember', function() {
        let userToken = $(this).attr('data-user-id');
        teams.removeUserFromTeam(userToken);
        $(this).parent().parent().remove();
    });

});