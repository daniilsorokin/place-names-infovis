VIZAPP.databases = function () {
    return [{name:"Ingria area", fileName: "toponyms_Ingria.txt", startPoint: new google.maps.LatLng(59.4, 29.13333), startZoom: 8}];
}();

VIZAPP.dummies = function() {
    return {
        toponymObjects: [{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Zakhonye-1","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43333","longitude":"28.41667","name":"Захонье-1","toponymNo":"46","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Zakhonye-2","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"58.96833","longitude":"29.36917","name":"Захонье-2","toponymNo":"47","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Izvoz","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43333","longitude":"28.3","name":"Извоз","toponymNo":"49","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Kommunar","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.62056","longitude":"30.39","name":"Коммунар","toponymNo":"65","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Alekseyevka","formant":{"formantName":"вка","formantNo":"3"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43","longitude":"28.76","name":"Алексеевка","toponymNo":"3","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Arbolova","formant":{"formantName":"олово","formantNo":"4"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.63","longitude":"28.93","name":"Арболово","toponymNo":"4","type":{"name":"town","nameRus":"город","typeNo":"2"}}, {"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Zakhonye-1","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43333","longitude":"28.41667","name":"Захонье-1","toponymNo":"46","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Zakhonye-2","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"58.96833","longitude":"29.36917","name":"Захонье-2","toponymNo":"47","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Izvoz","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43333","longitude":"28.3","name":"Извоз","toponymNo":"49","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Kommunar","formant":{"formantName":"no formant","formantNo":"1"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.62056","longitude":"30.39","name":"Коммунар","toponymNo":"65","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Alekseyevka","formant":{"formantName":"вка","formantNo":"3"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.43","longitude":"28.76","name":"Алексеевка","toponymNo":"3","type":{"name":"town","nameRus":"город","typeNo":"2"}},{"dataset":{"datasetNo":"1","name":"no dataset"},"englishTransliteration":"Arbolova","formant":{"formantName":"олово","formantNo":"4"},"language":{"languageNo":"1","name":"unknown","nameRus":"неизвестный"},"latitude":"59.63","longitude":"28.93","name":"Арболово","toponymNo":"4","type":{"name":"town","nameRus":"город","typeNo":"2"}}],
        formants: [{"formantName":"no formant","formantNo":"1"},{"formantName":"ая","formantNo":"2"},{"formantName":"вка","formantNo":"3"},{"formantName":"олово","formantNo":"4"},{"formantName":"ино","formantNo":"5"}],
    };
}();

VIZAPP.dataInterface = function () {
    $.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
    var type = "real"; 

    return {
        getAllToponyms: function (doWithToponyms){
            if (type == "dummy") {
                doWithToponyms(VIZAPP.dummies.toponymObjects);
            } else if (type == "real") {
                $.getJSON("request/toponymobject/", {}, function(data) {
                    if (data instanceof Array){
                        doWithToponyms(data);
                    } else {
                        var toponyms = data.toponymObject;
                        if (!(toponyms instanceof Array)){
                            toponyms = [toponyms];
                        }
                        doWithToponyms(toponyms);                    
                    }
                });
            }
        },
        getDatasetToponyms: function (datasetId, doWithToponyms){
            if (type == "dummy") {
                doWithToponyms(VIZAPP.dummies.toponymObjects);
            } else if (type == "real") {
                $.getJSON("request/dataset/" + datasetId + "/toponymobjects", {}, function(data) {
                    if (data instanceof Array){
                        doWithToponyms(data);
                    } else if (data !== null){
                        var toponyms = data.toponymObject;
                        if (!(toponyms instanceof Array)){
                            toponyms = [toponyms];
                        }
                        doWithToponyms(toponyms);                    
                    }
                });
            }
        },        
        getAllFormants: function (doWithFormants) {
            if (type == "dummy") {
                doWithFormants(VIZAPP.dummies.formants);
            } else if (type == "real") {
                $.getJSON("request/formant/", {}, function(data) {
                    if (data instanceof Array){
                        doWithFormants(data);
                    } else {
                        var formants = data.formant;
                        if (!(formants instanceof Array)){
                            formants = [formants];
                        }
                        doWithFormants(formants);                    
                    }
                });
            }
        },
        getDatasetFormants:function (datasetId, doWithFormants) {
            if (type == "dummy") {
                doWithFormants(VIZAPP.dummies.formants);
            } else if (type == "real") {
                $.getJSON("request/dataset/" + datasetId + "/formants", {}, function(data) {
                    if (data instanceof Array){
                        doWithFormants(data);
                    } else if (data !== null) {
                        var formants = data.formant;
                        if (!(formants instanceof Array)){
                            formants = [formants];
                        }
                        doWithFormants(formants);                    
                    }
                });
            }
        },
        getDatasetList: function (doWithResults) {
            $.getJSON("request/dataset/", {}, function(data) {
                if (data instanceof Array){
                    doWithResults(data);
                } else if (data !== null) {
                    var datasets = data.dataset;
                    if (!(datasets instanceof Array)){
                        datasets = [datasets];
                    }
                    doWithResults(datasets);                    
                }
            });
        },
        getToponymsSet: function(ids, doWithResults) {
            $.getJSON("request/toponymobject/set", {id: ids}, function(data) {
                if (data instanceof Array){
                    doWithResults(data);
                } else {
                    var toponyms = data.toponymObject;
                    if (!(toponyms instanceof Array)){
                        toponyms = [toponyms]
                    }
                    doWithResults(toponyms);                    
                }
            });
        },
        getToponym: function(id, doWithResults) {
            $.getJSON("request/toponymobject/"+id, function(data) {
                doWithResults(data);
            });
        },
        getToponymsByFormant: function(id, doWithResults) {
            $.getJSON("request/formant/" + id + "/toponyms", function(data) {
                if (data instanceof Array){
                    doWithResults(data);
                } else {
                    var toponyms = data.toponymObject;
                    if (!(toponyms instanceof Array)){
                        toponyms = [toponyms]
                    }
                    doWithResults(toponyms);                    
                }
            });
        },
        getToponymIdsByFormant: function(id, doWithResults) {
            $.getJSON("request/formant/" + id + "/toponyms/ids", function(data) {
                doWithResults(data);
            });
        }

    };
}();

VIZAPP.myMap = function () {
    var map;
    var mapOptions = { 
        zoom: 4, 
        center: new google.maps.LatLng(59.4, 29.13333),
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        panControl: false,
        zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.RIGHT_BOTTOM},
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();

    var markers = {}
    var polygons = {}

    return {
        init: function() {
            google.maps.visualRefresh = true;
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            map.setCenter(VIZAPP.databases[0].startPoint);
            map.setZoom(VIZAPP.databases[0].startZoom);
        },

        placeMarker: function(toponym, color) {
            if (markers[toponym.toponymNo] === undefined) {
                var opacity = 1.0;
                var radius = 1500; 
                var latlng = new google.maps.LatLng(parseFloat(toponym.latitude), parseFloat(toponym.longitude));
                var circleOptions = {
                    strokeWeight: 0,
                    fillColor: color, //"#0066CC"
                    fillOpacity: opacity,
                    map: map,
                    center: latlng,
                    radius: radius,
                    zIndex: 2
                };
                var marker = new google.maps.Circle(circleOptions);
                markers[toponym.toponymNo] = marker;
                google.maps.event.addListener(marker, 'mouseover', function() {
                    $(map.getDiv()).attr("title", toponym.name);
                });
                google.maps.event.addListener(marker, 'mouseout', function() {
                    $(map.getDiv()).removeAttr("title");
                });
            }
            markers[toponym.toponymNo].setMap(map);
        },

        hideMarker: function (toponym) {
            markers[toponym.toponymNo].setMap(null)
        },

        placePolygon: function (formant, clusters, color){
            if (polygons[formant.formantNo] === undefined) {
                for (var i in clusters) {
                    for (var j in clusters[i]) {
                        clusters[i][j] = new google.maps.LatLng(clusters[i][j][0], clusters[i][j][1]);
                    }
                }
                var polygonOptions = {
                    paths: clusters,
                    clickable: true,
                    strokeColor: color,
                    strokeOpacity: 0.5,
                    strokeWeight: 0,
                    fillColor: color,
                    map: null,
                    fillOpacity: 0.2,
                    zIndex: 1
                };
                var polygon = new google.maps.Polygon(polygonOptions);
                polygons[formant.formantNo] = polygon;
                google.maps.event.addListener(polygon, 'mouseover', function() {
                    $(map.getDiv()).attr("title", formant.formantName);
                });
                google.maps.event.addListener(polygon, 'mouseout', function() {
                    $(map.getDiv()).removeAttr("title");
                });                
            }
            polygons[formant.formantNo].setMap(map);
        },

        hidePolygon:  function (formant) {
            if (formant != undefined && polygons[formant.formantNo] !== undefined)
                polygons[formant.formantNo].setMap(null);
        },
    };
}();

VIZAPP.gui = function () {
    var colorGenerator = new ColorGenerator(2.4,2.4,2.4,0,2,4);
    var kmeans = new KMeans(); kmeans.kmpp = true;
    
    var $activeList = undefined;
    
    var trigger = function($target, callback) {
        if (typeof callback !== 'function') callback = function(){};
        if ($target.hasClass("triggered")){
            $target.removeClass("triggered");
            var angle = 0, start = -180;
        } else {
            $target.addClass("triggered");
            var angle = -180, start = 0;
        }
        $({deg: start}).animate({deg: angle}, {
            duration: 200,
            step: function(now) { $target.css({transform: 'rotate(' + now + 'deg)'});},
            done: function() { callback($target) }
        });

    }
    
    var showInfo = function($element) {
        var $infoWindow = $("#info-panel");
        if ($element.hasClass("triggered")){
            trigger($element);
            $infoWindow.hide("slide", {easing:"easeInExpo", direction: "left", duration: 200,});
        } else {            
            $("td.list-container span.triggered").each(function(){
                trigger($(this), function(x){ x.fadeTo(100, 0, function(){ $(this).css({visibility: 'hidden', opacity: 1}); }); });
            });
            trigger($element);
            $infoWindow.hide("slide", { 
                easing:"easeInExpo",
                direction: "left",
                duration: 200,
                complete: function() {
                    $(".close", $infoWindow).click(function(){
                        $("td.list-container span.triggered").each(function(){
                            trigger($(this), function(x){ x.fadeTo(100, 0, function(){ $(this).css({visibility: 'hidden', opacity: 1}); }); });
                        });
                        $infoWindow.hide("slide", { direction: "left", duration: 200,});
                    });
                    if($element.hasClass("t-info-trigger")){
                        var toponym = $element.parents("li").data("toponym-object");
                        $("h4 .title", $infoWindow).html(toponym.name);
                        $("h4 small", $infoWindow).html(toponym.englishTransliteration);
                        $("dd.latlng", $infoWindow).html(toponym.latitude + ", " + toponym.longitude);
                        $("dd.language", $infoWindow).html(toponym.hasOwnProperty("language") ? toponym.language.name : "unknown");
                        $("dd.type", $infoWindow).html(toponym.hasOwnProperty("type")  ? toponym.type.name : "unknown");
                        if (toponym.hasOwnProperty("formant")){
                            $("dd.group button", $infoWindow).html(toponym.formant.formantName)
                                    .off("click")
                                    .click(function(){
                                        //TODO Refactor as a function
                                $activeList = $("#groups-list");
                                $("#groups-list-container").show('slide',{ direction: "right" });
                                $("#toponyms-list-container").hide('slide', { direction: "left" });
                                $("#groups-list-container .nano").nanoScroller({ scrollTo: $("#groups-list #" + toponym.formant.formantNo) });
                            });
                        }
                        $("h4 small, .latlng, .language, .type, .group", $infoWindow).show();
                        $(".toponym-list, .size", $infoWindow).hide();
                    } else if ($element.hasClass("g-info-trigger")){
                        var formant = $element.parents("li").data("formant-object");
                        $("h4 .title", $infoWindow).html(formant.formantName);
//                        $("h4 small", $infoWindow).html(toponym.englishTransliteration);
                        $("dd.size", $infoWindow).html(formant.toponymIds.length);
                        var toponymIds = formant.toponymIds;
                        var $list = $("dd.toponym-list", $infoWindow).empty();
                        for(var idx in toponymIds) {
                            var toponym = $("#" + toponymIds[idx], $("#toponyms-list")).data("toponym-object");
                            $("<button>").addClass("element-info-btn btn btn-default btn-xs")
                                .text(toponym.name)
                                .appendTo($list);
                        }
                        $("h4 small, .latlng, .language, .type, .group", $infoWindow).hide();
                        $(".toponym-list, .size", $infoWindow).show();

                    }
                    $infoWindow.offset({top: $element.offset().top - ($infoWindow.height()/2) });
                }
            }).show("slide", {easing:"easeOutExpo", direction: "left", duration: 400 });
        }
    }
    
    var convertClusters = function(){
        //TODO
    }
    
    var guessK = function(coordinates){
        var gDistance = google.maps.geometry.spherical.computeDistanceBetween;
        var dists = new Array();
        for (var i in coordinates) {
            var aPoint = new google.maps.LatLng(coordinates[i].x, coordinates[i].y);
            for (var j = i; j < coordinates.length; j++){
                var bPoint = new google.maps.LatLng(coordinates[j].x, coordinates[j].y);
                dists.push(gDistance(aPoint, bPoint));
            }
        }
        var sum = 0;
        for (var d in dists){
            sum += dists[d];
        }
        var avgDist = sum / dists.length;
        var k = ~~(avgDist / 10000);
        k = k === 0 ? 1 : k;
        return k;
    }
    
    var computeClusters = function(coordinates, callback) {
        kmeans.k = guessK(coordinates);
        kmeans.setPoints(coordinates);
        kmeans.initCentroids();
        kmeans.cluster(function(){
            var clusters = new Array();
            for (var i = 0; i < kmeans.points.length; i++) {
                if (kmeans.points[i].items === undefined){
                    var centroid = kmeans.points[i].centroid;
                    if (clusters[centroid] === undefined) {
                        clusters[centroid] = new Array();
                    }
                    clusters[centroid].push(kmeans.points[i]);
                }
            }
            for (var i in clusters) {
                for (var j in clusters[i]) {
                    clusters[i][j] = [clusters[i][j].x, clusters[i][j].y];
                }
            }
            callback(clusters);
        });
    }

    var deselectAllInActiveList = function() {
        $(".ui-selected", $activeList).each(function(){
            $(this).removeClass("ui-selected");
            $(this).trigger("selectableunselected", {unselected: this});
        });
    };

    var selectToponym = function($toponym) {
        var toponym = $toponym.data("toponym-object");
        var color = $("#"+$toponym.data("formant-id"), $("#groups-list")).data("formant-color");
        VIZAPP.myMap.placeMarker(toponym, color);
        $toponym.css({ background: color });
    };

    var selectFormant = function($formant) {
        var color = $formant.data("formant-color");
        $formant.css({ background: color });
        var formant = $formant.data("formant-object");
        var toponymIds = formant.toponymIds instanceof Array ? formant.toponymIds : [formant.toponymIds];
        var coordinates = new Array();
        for(var idx in toponymIds) {
            var $toponym = $("#" + toponymIds[idx], $("#toponyms-list"));
            var toponym =  $toponym.data("toponym-object");
            if (toponym === undefined)
                console.log("Not found " + toponymIds[idx]);
            else if (toponym.latitude !== "0.0")
                coordinates.push({x:parseFloat(toponym.latitude), y:parseFloat(toponym.longitude)});
            selectToponym($toponym);
            $toponym.addClass("ui-selected");
        }
        computeClusters(coordinates, function(data){
            for (var i in data) {
                var dPoints = new Array();
                for (var j in data[i]) {
                    var aPoint = new google.maps.LatLng(data[i][j][0], data[i][j][1]);
                    for(c = 0; c < 360; c += 360 / 6) {
                        var bPoint = google.maps.geometry.spherical.computeOffset(aPoint, 3000, c)
                        dPoints.push([bPoint.lat(), bPoint.lng()]);
                    }
                }
                data[i] = d3.geom.hull(dPoints);
            }        
            VIZAPP.myMap.placePolygon($formant.data("formant-object"), data, color);
        });
    };

    var deselectToponym = function($toponym) {
        $toponym.css({ background: "#FFFFFF" });          
        VIZAPP.myMap.hideMarker($toponym.data("toponym-object"));
    };

    var updateFormantState = function ($toponym) {
        var $formant = $("#"+ $toponym.data("formant-id"), $("#groups-list"));
        $formant.removeClass("ui-selected")
                .css({ background: "#FFFFFF" });
        VIZAPP.myMap.hidePolygon($formant.data("formant-object"));
    }

    var deselectFormant = function($formant) {
        $formant.css({ background: "#FFFFFF" });
        var formant = $formant.data("formant-object");
        VIZAPP.myMap.hidePolygon(formant);
        var toponymIds = formant.toponymIds instanceof Array ? formant.toponymIds : [formant.toponymIds];
        for(var idx in toponymIds) {
            var $toponym = $("#" + toponymIds[idx], $("#toponyms-list"));
            $toponym.removeClass("ui-selected");
            deselectToponym($toponym);
        }
    };
    
    var chooseDataset = function($dataset){
        var datasetId = $dataset.attr('id');
        $("#toponyms-list").empty();
        $("#groups-list").empty();
        VIZAPP.dataInterface.getDatasetToponyms(datasetId, function(loadedToponymObjects){
            displayToponymsInAList(loadedToponymObjects);
            $("div#dataset-work-panel").show("slide", {
                easing:"easeOutExpo", direction: "left", duration: 400,
                complete: function(){$("div#dataset-select-panel").hide();}
            }); 
            VIZAPP.dataInterface.getDatasetFormants(datasetId, function(loadedFormants) {
                displayFormantsInAList(loadedFormants);
            });
        });        
    };
    
    var displayToponymsInAList = function(toponymObjectArray){
        for (var i in toponymObjectArray) {
            var toponym = toponymObjectArray[i];
            var $toponymHtml = $("<span>")
                    .text(toponym.name);
            $("<span>").addClass("glyphicon")
                    .addClass("glyphicon-chevron-right")
                    .addClass("pull-right")
                    .addClass("t-info-trigger")
                    .click(function(){ showInfo($(this)); })
                    .appendTo($toponymHtml)
                    .css('visibility', 'hidden');
            $("<li>").attr("id", toponym.toponymNo)
                    .data("formant-id", (toponym.formant !== undefined ? toponym.formant.formantNo : null) )
                    .data("toponym-object", toponym)
                    .addClass("ui-widget-content")
                    .html($toponymHtml)
                    .hover( function(){$(".t-info-trigger", this).css('visibility', 'visible');},
                            function(){$("span.t-info-trigger:not(.triggered)", this).css('visibility', 'hidden');} )
                    .appendTo("#toponyms-list");
        }
        $("#select-toponyms-btn").prop("disabled", false);
        $(".nano").nanoScroller();
    };
    
    var displayFormantsInAList = function(formantArray){
        for (var i in formantArray) {
            var formant = formantArray[i];
            var color = colorGenerator.generateNextColor();
            var $groupHtml = $("<span>").text(formant.formantName);
            $("<span>").addClass("glyphicon")
                    .addClass("glyphicon-chevron-right")
                    .addClass("pull-right")
                    .addClass("g-info-trigger")
                    .click(function(){ showInfo($(this)); })
                    .appendTo($groupHtml)
                    .css('visibility', 'hidden');
            $("<span>")
                    .addClass("small")
                    .addClass("pull-right")
                    .addClass("group-badge")
                    .text(formant.toponymIds.length)
                    .appendTo($groupHtml);
            $("<li>").attr("id", formant.formantNo)
                    .data("formant-object", formant)
                    .data("formant-color", color)
                    .addClass("ui-widget-content")
                    .html($groupHtml)
                    .hover( function(){$(".g-info-trigger",this).css('visibility', 'visible');},
                            function(){$("span.g-info-trigger:not(.triggered)",this).css('visibility', 'hidden');} )
                    .appendTo("#groups-list");
        }
        $("#select-groups-btn").prop("disabled", false);
        $(".nano").nanoScroller();
    };
    
    var refreshDatasetList = function() {
        $("#dataset-btn-list").empty();
        VIZAPP.dataInterface.getDatasetList(function(datasetList){
            for (var i in datasetList) {
                var dataset = datasetList[i];
                $("<button>")
                        .text(dataset.name)
                        .attr("id", dataset.datasetNo)
                        .addClass("btn btn-default dataset-btn center-block")
                        .button()
                        .click(function(){ chooseDataset($(this)); })
                        .appendTo("#dataset-btn-list");
            }
        });
    };

    return {
        init: function () {
            VIZAPP.myMap.init();

            var $toponymsList = $("#toponyms-list");
            var $groupsList = $("#groups-list");
            $(".list").selectable({filter:"li", cancel:".t-info-trigger,.g-info-trigger"});
            
            $("#toponyms-list-container").show();
            $("#groups-list-container").hide();
            $activeList = $toponymsList;
            $("#deselect-button").button().click(deselectAllInActiveList);
            $("#deselect-button").prop("disabled", false);

            $("#select-toponyms-btn").click(function (){
                $activeList = $toponymsList;
                $("#toponyms-list-container").show('slide',{ direction: "left" });
                $("#groups-list-container").hide('slide', { direction: "right" });
                $(".nano").nanoScroller();
            });
            $("#select-groups-btn").click(function (){
                $activeList = $groupsList;
                $("#groups-list-container").show('slide',{ direction: "right" });
                $("#toponyms-list-container").hide('slide', { direction: "left" });
                $(".nano").nanoScroller();
            });
            
            $("#info-window-container .panel").hide();
            
            refreshDatasetList();
            
            $("#upload-dataset-btn").button().click(function(){
                $("#dataset-file").click();
            });   
            
            $("#dataset-file").change(function(){
                var selectedFile = $("#dataset-file")[0].files[0];
                var fileType = "text/plain";
                var datasetName = "test name";
                $.ajax({
                    url: "request/dataset/upload/" + datasetName,
                    type: 'POST',
//                    xhr: function() {  // custom xhr
//                        var myXhr = $.ajaxSettings.xhr();
//                        if(myXhr.upload){ // check if upload property exists
//                            myXhr.upload.addEventListener('progress',uploadProgressHandler, false); // for handling the progress of the upload
//                        }
//                        return myXhr;
//                    },
                    success: refreshDatasetList,
//                    error: onError,
                    data: selectedFile,
                    contentType: fileType,
                    processData: false,
                    cache:false
                });
            });
            
            $("div#dataset-work-panel").hide();
            $("div#dataset-select-panel").hide()
                    .show("slide", {easing:"easeOutExpo", direction: "left", duration: 400 });
            
            $("button#back-to-dataset").button().click(function(){
                    $("div#dataset-select-panel").show();
                    $("div#dataset-work-panel").hide("slide", {
                        easing:"easeInExpo", direction: "left", duration: 200
                    });
            });


            $toponymsList.on( "selectablestop", function( event, ui ) {
                $("li.ui-selected" , this).each(function() { 
                    selectToponym($(this));
                });
            });

            $groupsList.on( "selectablestop", function( event, ui ) {
                $("li.ui-selected" , this).each(function() {
                    selectFormant($(this));
                });        
            });            

            $toponymsList.on( "selectableunselected", function( event, ui ) {
                deselectToponym($(ui.unselected));
                updateFormantState($(ui.unselected));
            } );

            $groupsList.on( "selectableunselected", function( event, ui ) {
                deselectFormant($(ui.unselected));
            });                        
        }
    };
}();


(function( $ ) {
    /**
     * 
     * @returns {Boolean}
     */
    $.fn.isHidden = function(){
        return this.css('display') == 'none';
    };
})(jQuery);