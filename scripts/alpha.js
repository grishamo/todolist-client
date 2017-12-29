define(['jquery', 'todo_list'], function($, todo_list) { // do NOT add jquerymobile in deps array.
    $(document).on("pageinit", "#home", function() { // #home => the id attr of div[data-role="page"]
        $('body').css('opacity',1);
        console.log("HomePage loaded");


        todo_list.render();
    });
});
