define(['jquery', 'todo_list'], function($, todo_list) { // do NOT add jquerymobile in deps array.

    var todoList = new todo_list();

    $(document).on("pageinit", "#home", function() { // #home => the id attr of div[data-role="page"]
        console.log("HomePage loaded");



        todoList.getData()
            .then(function () {
                return todoList.render();
            })
            .then(function () {
                todoList.setControllers();

                console.log('data rendered');
                $('body').css('opacity', 1);
            })
            .catch(function (err) {
                console.error(err);
            })

    });



});
