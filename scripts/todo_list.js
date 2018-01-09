define(['jquery','q'],function($, q){
    'use strict';

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
            $this.renderListByDate();
            $this.renderEditWindow();
            resolve();
        });
    };

    ToDoList.prototype.renderEditWindow = function(){
        this.renderSelectList();
        this.editWindowSubmit();
    };

    ToDoList.prototype.editWindowSubmit = function(){
        $('#submit-btn').click(function(){

            var myForm = $('#edit-task-form')[0];

            var formData = {
                title: myForm.elements['title'].value,
                date: myForm.elements['datetime'].value,
                list: myForm.elements['select-list'].value,
                newList: myForm.elements['newList'].value
            };

            console.log(formData);

            console.log('submit button clicked');
        })
    };

    ToDoList.prototype.renderSelectList = function(){
      var selectList = $("#select-list");
      selectList.empty();

      $.each(this.dataByListName, function(key, value) {
        selectList.append( $('<option value="'+ key +'">'+ key +'</option>') );
      });

      selectList.selectmenu('refresh');
    }

    ToDoList.prototype.renderListByDate = function() {
        var $this = this;
        var container = $('#listByDate');
        this.dataByDate = $this.mapDataBy('date');

        $.each(this.dataByDate, function(key, val){

            var listContainer = 'list-container-' + key.replace(/ /g, "-");
            var listName = 'list-' + key;
            var listCollapsible = $('<div data-role="collapsible" id="'+ listContainer +'"></div>');
            var listTitle = $('<h4 class="list-title">'+ key +'</h4>');

            listCollapsible.append(listTitle);
            container.append(listCollapsible);

            $this.renderListView('#' + listContainer, listName, val);

            listCollapsible.collapsible();

        });
    };

    ToDoList.prototype.renderAllLists = function() {
        var $this = this;
        var container = $('#allLists');

        this.dataByListName = $this.mapDataBy('list');
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

    ToDoList.prototype.mapDataBy = function(key){
        var mapedData = {};
        var data = this.data;
        var field = key;

        data.map(function (val) {
            if(typeof val[field] !== 'undefined' && val[field] !== null && val[field].length > 1){

                if(field === 'date'){
                    val[field] = new Date(val[field]).toDateString();
                }

                if(!mapedData.hasOwnProperty (val[field] )){
                    mapedData[ val[field] ] = [];
                }
                mapedData[ val[field] ].push(val);
            }
        });

        return mapedData;
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