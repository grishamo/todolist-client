define(['jquery','q'],function($, q){

    function ToDoList(){
      console.log('ToDoList::constructor');
        this.data = 'mock_data';
        this.dataByListName = {};

    }

    ToDoList.prototype.getData = function(){
        var $this = this;
        return q.Promise(function(resolve, reject){

            $.get("scripts/mock.json", function(data) {
                $this.data = data;
                resolve(data);
            })
            .fail(function(err) {
                reject(err);
            });

        })
    };


    ToDoList.prototype.addItem = function(item){
      console.log('ToDoList::addItem');
    };


    ToDoList.prototype.render = function(){
        var $this = this;
        return q.Promise(function(resolve, reject) {
            console.log('ToDoList::render');
            $this.renderTodayList();
            $this.renderAllLists();
            resolve();
        });
    };


    ToDoList.prototype.renderAllLists = function() {
        var $this = this;
        var container = $('#allLists');

        this.dataByListName = $this.mapDataByListName();
        container.empty();

        $.each(this.dataByListName, function(key, val){
            var listContainer = 'list-container-' + key;
            var listName = 'list-' + key;
            var listCollapsible = $('<div data-role="collapsible" id="'+ listContainer +'"></div>');
            var listTitle = $('<h4 class="list-title">'+ key +'</h4>');

            listCollapsible.append(listTitle);
            container.append(listCollapsible);

            $this.renderListView('#' + listContainer, listName, val);

            listCollapsible.collapsible();

        });

    };

    ToDoList.prototype.renderTodayList = function(){
        var container = '#mainContent';
        var listName = 'todayList';
        var data = this.getTodayEvents();
        this.renderListView(container, listName, data);
    };

    ToDoList.prototype.mapDataByListName = function(){
        var dataByList = {};

        this.data.map(function (val) {
            if(typeof val.list !== 'undefined' && val.list !== null && val.list.length > 1){

                if(!dataByList.hasOwnProperty(val.list)){
                    dataByList[val.list] = [];
                }
                dataByList[val.list].push(val);
            }
        });

        return dataByList;
    };

    ToDoList.prototype.getTodayEvents = function(){
        var today = new Date();
        var result = [];

        $.each(this.data, function(i, val){
            var valDate = new Date(val.date);
            var isToday = (today.toDateString() === valDate.toDateString());

            if (isToday || isNaN(valDate.getTime())) {
               result.push(val);
            }
        });

        return result;
    };

    ToDoList.prototype.renderListView = function(containerId, listName, data) {
        var container = $( containerId );
        var listId = '#' + listName;
        var listView = $( listId );

        if( !listView.length ){
            listView = $('<ul data-role="listview" id="'+ listName +'"></ul>');
            container.prepend(listView);
            listView.listview();
        }


        $.each(data, function(i, val){
            var valDate = new Date(val.date);
            var valTime = isNaN(valDate.getTime()) ? '' : valDate.toLocaleTimeString();

            var listItem = $('<li class="list-item-content"></li>');
            var itemLink = $('<a href="" class="ui-btn ui-btn-icon-right ui-icon-gear"></a>');
            var itemTitle = $('<h2>' + val.title + '</h2>');
            var itemTime = $('<p>' + valTime + '</p>');

            itemLink.append(itemTitle, itemTime);
            listItem.append(itemLink);

            listView.append(listItem);

        });

        listView.listview('refresh');

    };

    return ToDoList
});