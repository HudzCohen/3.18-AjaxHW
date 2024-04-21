$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    function refreshTable() {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(function (person) {
                $("tbody").append(`
                <tr>
                    <td>${person.firstName}</td>
                    <td>${person.lastName}</td>
                    <td>${person.age}</td>
                    <td>
                        <button class='btn btn-warning edit' data-person-id='${person.id}'>Edit</button>
                        <button class='btn btn-danger delete ml-3' data-person-id='${person.id}'>Delete</button>
                    </td>
                </tr>`)

            });
        });
    }

    refreshTable();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $(".modal-title").text('Add Person');
        $("#save-person").show();
        $("#update-person").hide();
        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            refreshTable(() => {
                modal.hide();
            });

        });
    });

    $("table").on('click', '.delete', function () {
        const btn = $(this);
        const id = btn.data('person-id');
        $.post('/home/deletePerson', { id }, function () {
            refreshTable();
        })
    });

    $("table").on('click', '.edit', function () {
        const btn = $(this);
        const id = btn.data('person-id');
        $.get('/home/getpersonbyid', { id }, function ({ firstName, lastName, age }) {
            $("#firstName").val(`${firstName}`);
            $("#lastName").val(`${lastName}`);
            $("#age").val(`${age}`);
            $(".modal-title").text(`Edit ${firstName} ${lastName}`);
            $("#save-person").hide();
            $("#update-person").show();
            $("#update-person").data('id', id);
            modal.show();
        });
    })

    $("#update-person").on('click', function () {

        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        const id = $(this).data('id');
        $.post('/home/editperson', { id, firstName, lastName, age }, function () {
            modal.hide();
            refreshTable();
        });
    })
});