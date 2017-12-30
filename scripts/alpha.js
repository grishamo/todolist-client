define(['jquery', 'todo_list'], function($, todo_list) { // do NOT add jquerymobile in deps array.

    var todoList = new todo_list();

    $(document).on("pageinit", "#home", function() { // #home => the id attr of div[data-role="page"]
      $('body').css('opacity', 1);
      console.log("HomePage loaded");

      todoList.render();

      // todoList.getData()
      //   .then(function () {
      //     return todo_list.render();
      //   })
      //   .then(function () {
      //       console.log('todoList initiated');
      //   })
      //   .catch(function(err){
      //       console.error(err);
      //   })

    });
});
