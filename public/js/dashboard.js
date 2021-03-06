$(document).ready(function () {
    // Create a new application.
    $("#save-app").on("click", function(event) {
        event.preventDefault();
        var compName = $("#compName").val().trim();
        var roleName = $("#roleName").val().trim();
        var jobLink = $("#jobsitelink").val().trim();
        var recruiterName = $("#recruiterName").val().trim();
        var recruiterContact;
        if($("#recruiterEmail").val().trim().length === 0){
            recruiterContact = "n@a.com";
        } else { recruiterContact = $("#recruiterEmail").val().trim()};
        var user = window.location.href.split("/").slice(-1)[0];
        var noteBody = $("#noteBody").val().trim();

        var newApp = {
            company: compName,
            role: roleName,
            jobsitelink: jobLink,
            status: "Applied",
            recruiterName: recruiterName,
            recruiterContact: recruiterContact,
            UserId: user,
            noteBody: noteBody
        }

        $.ajax("/api/newapp", {
            type: "POST",
            data: newApp
        }).then(function(result) {
            location.reload();
        });     
    });

    // Go to selected application's page.
    $(document.body).on("click", ".application", function (event) {
        event.preventDefault();
        var appId = event.target.getAttribute("data-id");
        var user;
        user = window.location.href.split("/").slice(-1)[0];
        window.location.pathname = (`/dashboard/${user}/${appId}`);
    });

    $(document.body).on("click", "#refresh", function (event) {
        event.preventDefault();
        var user;
        user = window.location.href.split("/").slice(-1)[0];
        window.location.pathname = (`/dashboard/${user}`);
    });

    // Search for applications by company name.
    $(document.body).on("click", "#btn-search", event => {
        event.preventDefault();
        $('#applications').empty();
        var userID = $('#btn-search').attr('data-id');
        var company = $('#company-search').val().trim();
        var inputData = {};
        inputData.company = company;
        $.get(`/api/applications/company/${userID}`, inputData, data => {
            for (var i = 0; i < data.length; i++) {
                var appBlock = `
                <div class="row mt-2 application color-background hover-dark imitate-btn rounded-border" data-id="${data[i].id}">
                <div class="col-2 py-2" data-id="${data[i].id}">
                    <!-- Need to figure out how to format the 'createdAt' date -->
                    <p class="text-center m-0 light" data-id="${data[i].id}">${dayjs(data[i].createdAt).format('MMM DD YYYY')}</p>
                </div>
                <div class="col-4 py-2" data-id="${data[i].id}">
                    <p class="text-center m-0 light" data-id="${data[i].id}">${data[i].company}</p>
                </div>
                <div class="col-4 py-2" data-id="${data[i].id}">
                    <p class="text-center m-0 light" data-id="${data[i].id}">${data[i].role}</p>
                </div>
                <div class="col-2 py-2" data-id="${data[i].id}">
                    <!-- Need a 'source' column on the application table -->
                    <p class="text-center m-0 light" data-id="${data[i].id}">${data[i].jobsitelink}</p>
                </div>
                </div>`
                $('#applications').append(appBlock)
            }
        });
    });
});
