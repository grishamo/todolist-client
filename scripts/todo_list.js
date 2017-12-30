define(['jquery'],function($){

    function ToDoList(){
      console.log('ToDoList::constructor');
        this.data = 'mock_data'

    }


    ToDoList.prototype.addItem = function(item){
      console.log('ToDoList::addItem');
    }

    ToDoList.prototype.render = function(){
        console.log('ToDoList::render');
    }

    return ToDoList
});