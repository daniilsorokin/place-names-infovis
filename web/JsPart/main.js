/** Main map. */
var myMap; 

var $toponymsList;

var toponymIdToMarker = {};
var groupNameToColor = {};
var toponymIdToGroupName = {};

var colorGeneratorInstance;

var DataSources = [{name:"Ingria area", fileName: "toponyms_Ingria.txt", startPoint: new google.maps.LatLng(59.4, 29.13333), startZoom: 8}];

/**
 * Main function which should be called after the loading of the page.
 */
function initialize()
{	
    var myOptions = { 
        zoom:4, 
        center: new google.maps.LatLng(59.4, 29.13333),
        streetViewControl: false,
        scaleControl: true,
        overviewMapControl: true,					
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    $.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
    
    myMap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    myMap.setCenter(DataSources[0].startPoint);
    myMap.setZoom(DataSources[0].startZoom);
    
    colorGeneratorInstance = new colorGenerator();
    
    $toponymsList = $("#toponyms-list");
    $groupsList = $("#groups-list");
    $groupsList.hide();
    $(".list").selectable();
    
    $toponymsList.on( "selectablestop", function( event, ui ) {
        var ids = new Array();
        $(".ui-selected" , this).each(function() {
            ids.push($(this).attr('id'));
        });  
        $.getJSON("getToponyms", {id: ids}, function(toponymsList) {
            for(var toponymIdx in toponymsList){
                var toponym = toponymsList[toponymIdx];
                var groupName = toponym.groupName;
                if (groupNameToColor[groupName] == null)
                    groupNameToColor[groupName] = colorGeneratorInstance.generateNextColor();
                $("#"+toponym.id, $toponymsList).css({ background: groupNameToColor[groupName] });
                placeNewMarker(toponym.id, {lat: toponym.latitude, lng: toponym.longitude}, 
                                groupNameToColor[groupName], toponym.name);
            }
        });
    });
    $toponymsList.on( "selectableunselected", function( event, ui ) {
        $(".ui-selected", $groupsList).removeClass("ui-selected")
                                      .css({ background: "#FFFFFF" });
        $(ui.unselected).css({ background: "#FFFFFF" });
        if (toponymIdToMarker[ui.unselected.id] != null) toponymIdToMarker[ui.unselected.id].setMap(null);
        toponymIdToMarker[ui.unselected.id] = null;
    } );
    
    $groupsList.on( "selectablestop", function( event, ui ) {
        //$(".ui-selected", $toponymsList).removeClass("ui-selected");
        $(".ui-selected" , this).each(function() {
            var groupName = $(this).attr("id");
            if (groupNameToColor[groupName] == null)
                groupNameToColor[groupName] = colorGeneratorInstance.generateNextColor();
            $(this).css({ background: groupNameToColor[groupName] });
            
            $.ajax({url: "getToponyms", contentType: "application/x-www-form-urlencoded", dataType: "json", type: "POST",
                data: {group_name: groupName},
                success: function(toponymsList) {
                    for(var toponymIdx in toponymsList){
                        var toponym = toponymsList[toponymIdx];
                        placeNewMarker(toponym.id, {lat: toponym.latitude, lng: toponym.longitude}, 
                                        groupNameToColor[groupName], toponym.name);
                        $("#"+toponym.id, $toponymsList).addClass("ui-selected")
                                                        .css({ background: groupNameToColor[groupName] });
                    }
                }
            });
        });        
    });
    $groupsList.on( "selectableunselected", function( event, ui ) {
        $(ui.unselected).css({ background: "#FFFFFF" });
        $.ajax({url: "getToponyms", contentType: "application/x-www-form-urlencoded", dataType: "json", type: "POST",
                data: {group_name: ui.unselected.id},
                success: function(toponymsList) {
                    for(var toponymIdx in toponymsList){
                        var toponym = toponymsList[toponymIdx];
                        toponymIdToMarker[toponym.id].setMap(null);
                        toponymIdToMarker[toponym.id] = null;
                        $("#"+toponym.id, $toponymsList).removeClass("ui-selected");
                    }
                }
            });
    });
   
    $.getJSON("get-toponyms-names", {} ,function(namesList) {
        for (nameIdx in namesList) {
            var nameObj = namesList[nameIdx];
            $toponymsList.append("<li id =\"" + nameObj.first + "\" class=\"ui-widget-content\">" + nameObj.second + "</li>");
        }
        $("#list-toponyms").button("enable");
    });
    
    $.getJSON("get-groups-names", {} ,function(groupsList) {
        for (nameIdx in groupsList) {
            var groupName = groupsList[nameIdx];
            $groupsList.append("<li id =\"" + groupName + "\" class=\"ui-widget-content\">" + groupName + "</li>");
        }
        $("#list-groups").button("enable");
    });

    $("#list-selector").buttonset();
    $("#list-selector span.ui-button-text").addClass("list-selector-button-text");
    $("#list-toponyms").button("disable").click(function (){
        $groupsList.hide('slide', { direction: "right" });
        $toponymsList.show('slide',{ direction: "left" });
    });
    $("#list-groups").button("disable").click(function (){
        $toponymsList.hide('slide', { direction: "left" });
        $groupsList.show('slide',{ direction: "right" });
    });
}

function placeNewMarker(id, coordinates){
    if (toponymIdToMarker[id] == null){
        var latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: myMap
        });
        //To Do: Maybe another way to store markers. I am not sure about Javascript handles the memory.
        toponymIdToMarker[id] = marker;
    }
}

function placeNewMarker(id, coordinates, title){
    if (toponymIdToMarker[id] == null){
        var latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: myMap,
            title: title
        });
        //To Do: Maybe another way to store markers. I am not sure about Javascript handles the memory.
        toponymIdToMarker[id] = marker;
    }
}

/**
 * Places a marker on the mapa nd stores it for later reference.
 * 
 * @param {int} id marker's id.
 * @param {lat: latitude, lng: longitude} coordinates
 * @param {type} color
 * @param {string} title
 */
function placeNewMarker (id, coordinates, color, title){
    if (toponymIdToMarker[id] == null){
        var opacity = 1.0;
        var radius = 1000; 
        var latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
        var circleOptions = {
            strokeWeight: 0,
            fillColor: color,
            fillOpacity: opacity,
            map: myMap,
            center: latlng,
            title: title,
            radius: radius
        };
        circle = new google.maps.Circle(circleOptions);
        toponymIdToMarker[id] = circle;
    }  
}


(function( $ ) {
    $.fn.fillWith = function(data){
        for (idx in data)
        {
            this.append("<li id =\"" + idx + "\" class=\"ui-widget-content\">" + data[idx] + "</li>");
        }
    };
})(jQuery);
