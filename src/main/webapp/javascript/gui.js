VIZAPP.databases = function () {
    return [{name:"Ingria area", fileName: "toponyms_Ingria.txt", startPoint: new google.maps.LatLng(59.4, 29.13333), startZoom: 8}];
}();


VIZAPP.gui = function () {
    var mapOptions = { 
        zoom:4, 
        center: new google.maps.LatLng(59.4, 29.13333),
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: true,
        overviewMapControl: true,					
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    
    return {
        init: function () {
            google.maps.visualRefresh = true;
            this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            this.map.setCenter(VIZAPP.databases[0].startPoint);
            this.map.setZoom(VIZAPP.databases[0].startZoom);
            
            var $toponymsList = $("#toponyms-list");
            var $groupsList = $("#groups-list");
            
            $(".list").selectable();
            $toponymsList.show();
            $groupsList.hide();
            
            $("#list-toponyms").click(function (){
                $groupsList.hide('slide', { direction: "right" });
                $toponymsList.show('slide',{ direction: "left" });
            });
            $("#list-groups").click(function (){
                $toponymsList.hide('slide', { direction: "left" });
                $groupsList.show('slide',{ direction: "right" });
            });
            
            $toponymsList.on( "selectablestop", function( event, ui ) {
                var ids = new Array();
                $(".ui-selected" , this).each(function() { ids.push($(this).attr('id')); });  
                $.getJSON("visualization/toponymobject/set", {id: ids}, function(data) {
                    var toponyms = data.toponymObject;
                    if (!(toponyms instanceof Array)){
                        toponyms = [toponyms]
                    }
                    for(var toponymIdx in toponyms){
                        var toponym = toponyms[toponymIdx];
                        var groupName = toponym.formant.formantName;
                        if (toponymIdToGroupName[groupName] == null)
                            toponymIdToGroupName[toponym.toponymNo] = groupName;
                        if (groupNameToColor[groupName] == null)
                            groupNameToColor[groupName] = colorGeneratorInstance.generateNextColor();
                        $("#"+toponym.toponymNo, $toponymsList).css({ background: groupNameToColor[groupName] });
                        placeNewMarker(toponym.toponymNo, {lat: toponym.latitude, lng: toponym.longitude}, 
                                       groupNameToColor[groupName], toponym.name);
                    }
                });
            });

        }
    }
}();