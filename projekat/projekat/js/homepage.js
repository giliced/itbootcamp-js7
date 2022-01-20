$(document).ready(function() {

    teams.init();
    users.init();

    let storageUsers = users.getAllUsers();
    let holder = $("<section></section>").addClass("d-flex justify-content-lg-center align-items-start flex-wrap col-8");

    for(let user in storageUsers) {

        let article = $("<article></article>")
            .addClass("card col-lg-3 col-12 m-1");

        let image = $("<img />")
            .addClass("card-img-top")
            .attr('src', storageUsers[user].profileImage);

        let div = $("<div></div>")
            .addClass("card-body");

        let productName = $("<h5></h5>").addClass("cart-title")
            .text(storageUsers[user].name);

        let productText = $("<p></p>").addClass("card-text")
            .text(storageUsers[user].description);

        let buttonHolder = $("<div></div>")
            .addClass("w-100 d-flex justify-content-lg-start justify-content-evenly flex-wrap m-2 m-lg-0");

        let adminButtonHolder = $("<div></div>")
            .addClass("w-100 d-flex justify-content-lg-start justify-content-evenly flex-wrap m-2 m-lg-0");

        let deleteButton = $("<button>Delete user</button>")
            .attr('data-user-id', storageUsers[user].token)
            .addClass("btn btn-primary deleteDeveloper m-lg-1");

        let editButton = $("<a href='new_user.html?tokenId="+storageUsers[user].token+"'>Edit user</a>")
            .attr('data-user-id', storageUsers[user].token)
            .addClass("btn btn-secondary m-lg-1");


        let hireButton = $("<button>Hire</button>")
            .attr('data-user-id', storageUsers[user].token)
            .addClass("btn btn-danger m-lg-1 hireDeveloper");

        let addToTeamButton = $("<button>Add to team</button>")
            .attr('data-user-id', storageUsers[user].token)
            .addClass("btn btn-danger m-lg-1 addToTeamAction");

        adminButtonHolder.append(editButton);
        adminButtonHolder.append(deleteButton);
        buttonHolder.append(hireButton);
        buttonHolder.append(addToTeamButton);

        div.append(productName);
        div.append(productText);
        div.append(buttonHolder);
        div.append(adminButtonHolder);


        article.append(image);
        article.append(div);

        $(holder).append(article);
    }


    if(storageUsers.length === 0) {
        let button = $("<a href='new_user.html'>Create new developer</a>").addClass('btn btn-primary');
        let paragraph = $("<p>There are no developers. Please add them.</p>");

        let div = $("<div></div>")
            .addClass('d-flex justify-content-center flex-column mt-5')
            .append(paragraph, button);

        div.append();
        $("#users").append(div);
        $("#users").addClass("container d-flex justify-content-center align-items-center min-vh-100");
    } else {
        $("#users").addClass("min-vh-100 justify-content-evenly d-flex flex-wrap");
        $("#users").append(holder);
    }

    $(document).on('click','.deleteDeveloper', function() {
        let elementToken = $(this).attr('data-user-id');
        for(let user in storageUsers) {
            let token = storageUsers[user].token;
            if(elementToken === token) {
                $(this).parent().parent().parent().remove();
                users.deleteUser(user);
                alert("User deleted!");
                break;
            }
        }
    })

    $(document).on('click', '.hireDeveloper', function() {
        $("#hireModal").modal("show");
        $(".developerCTA").attr('id', 'hireDev');
        $(".developerCTA").attr('data-user-id', $(this).attr('data-user-id'));
    });

    $(document).on('click', '.addToTeamAction', function() {
         $(".developerCTA").attr('id', 'addToTeam');
         $(".developerCTA").attr('data-user-id', $(this).attr('data-user-id'));

         if(teams.isPartOfATeam($(this).attr('data-user-id'))) {
             alert("This developer is already part of a team!");
             return false;
         }

         $("#hireModal").modal("show");
    });

    $(document).on('click', "#addToTeam", function() {

        resetDateFieldErrors();

        let from = $("#hire_from").val();
        let to = $("#hire_to").val();
        let token = $(this).attr('data-user-id');

        if(dateFieldsValid(from, to)) {
            from = new Date(from);
            to = new Date(to);
            teams.addToTeam(token, from, to);
        }

    });

    $(document).on('click', "#hireDev", function() {

        resetDateFieldErrors();

        let from = $("#hire_from").val();
        let to = $("#hire_to").val();
        let token = $(this).attr('data-user-id');

        if(dateFieldsValid(from, to)) {
            from = new Date(from);
            to = new Date(to);
            users.hireUser(token, from, to);
        }
    });

    function resetDateFieldErrors() {
        $("#field_error_hire_from").html("");
        $("#field_error_hire_to").html("");
    }

    function dateFieldsValid(from, to) {
        if(from === "") {
            $("#field_error_hire_from").html("This field is required");
            return false;
        }
        if(to === "") {
            $("#field_error_hire_to").html("This field is required");
            return false;
        }

        let dateFrom = new Date(from);
        let dateTo = new Date(to);

        if(isDateInPast(dateFrom)) {
            $("#field_error_hire_from").html("Date cannot be in past!");
            return false;
        }
        if(isDateInPast(dateTo)) {
            $("#field_error_hire_to").html("Date cannot be in past!");
            return false;
        }

        if (dateTo < dateFrom) {
            $("#field_error_hire_to").html("This date cannot be lower than from date!");
            return false;
        }
        return true;
    }

    function isDateInPast (firstDate) {
        let today = new Date();
        if (firstDate <= today) {
            return true;
        }
        return false;
    }
});