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

    ToDoList.prototype.addItem = function(item) {
        var newItem = item;
        newItem.date = new Date(item.date).toUTCString();
        this.data.push(newItem);
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

    ToDoList.prototype.setControllers = function(){
        this.editWindowSubmit();
        this.editWindowCancel();
        this.editItemEvent();
    };

    ToDoList.prototype.editWindowCancel = function(){
        $("#submit-cancel").click( this.closePopup );
    };

    ToDoList.prototype.editItemEvent = function(){
        $('.listItem').click(function(ev){
            var listItem = $(ev.currentTarget);
            var title = $(listItem.children('h2')).html();
            var itemData = this.getItemBy('title', title);

            var myForm = $('#edit-task-form')[0];

            myForm.elements['title'].value = itemData.title;
            $("#add-new").popup("open");

        }.bind(this));
    };

    ToDoList.prototype.renderEditWindow = function(){
        this.renderSelectList();
    };

    ToDoList.prototype.editWindowSubmit = function(){
        $('#submit-btn').click(function(){

            var myForm = $('#edit-task-form')[0];

            var formData = {
                title: myForm.elements['title'].value,
                date: myForm.elements['datetime'].value,
                list: myForm.elements['newList'].value || myForm.elements['select-list'].value
            };

            console.log(formData);
            var validate = this.validateEditWindow(formData);

            if( validate.error ) {
                var err = $('#errormsg');
                err.html(validate.error);
                err.css({'display':'block','color':'#ff0000'});
            }
            else {
                this.addItem(formData);
                this.closePopup();
                this.render();
                this.editItemEvent();
            }
        }.bind(this))
    };

    ToDoList.prototype.renderSelectList = function(){
      var selectList = $("#select-list");
      selectList.empty();

      $.each(this.dataByListName, function(key, value) {
        selectList.append( $('<option value="'+ key +'">'+ key +'</option>') );
      });

      selectList.selectmenu();
    };

    ToDoList.prototype.closePopup = function(){
        var myForm = $('#edit-task-form')[0];
        myForm.elements['title'].value = '';
        myForm.elements['datetime'].value = '';
        myForm.elements['newList'].value = '';
        myForm.elements['select-list'].value = '';
        $('#errormsg').css({'display':'none'});

        $('#add-new').popup('close');
    };

    ToDoList.prototype.renderListByDate = function() {
        var $this = this;
        var container = $('#listByDate');
        container.empty();

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
        var container = '#todayList-container';
        var listName = 'todayList';
        var data = this.getTodayEvents();
        $(container).empty();

        if(data.length > 0) {
            this.renderListView(container, listName, data);
            $('#' + listName).prepend(
                $('<li data-role="list-divider" class="divider-header">Today</li>')
            ).listview('refresh');
        }
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

    ToDoList.prototype.getItemBy = function(key, value) {
       return this.data.find(function(element){
           return element[key] === value
        })
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
            var itemLink = $('<a href="#add-new" class="ui-btn ui-btn-icon-right ui-icon-gear listItem"></a>');
            var itemTitle = $('<h2>' + val.title + '</h2>');
            var itemTime = $('<p>' + valTime + '</p>');

            itemLink.append(itemTitle, itemTime);
            listItem.append(itemLink);

            listView.append(listItem);

        });

        listView.listview('refresh');

    };

    ToDoList.prototype.validateEditWindow = function(data){
        if (typeof data.title === 'undefined' || data.title === null || data.title.length === 0) {
            return {error: 'Missing Title'};
        }

        if(typeof data.list === 'undefined' || data.list === null || data.list.length === 0 ) {
            return {error : 'Missing List name'};
        }

        if(typeof data.date === 'undefined' || data.date === null || data.date.length === 0) {
            return {error: 'Missing Date'};
        }

        var isExist = this.data.some(function(element){
            return element.title === data.title;
        });

        if(isExist) {
           return {error: 'Title already exist'};
        }

        return true;

    };

    return ToDoList
});