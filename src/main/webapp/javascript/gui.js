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
            if (markers[toponym.toponymNo] !== undefined) {
                markers[toponym.toponymNo].setMap(null);
            }
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

VIZAPP.objects = function () {
    return {
        cycleAnimator: function($element, property, min, max){
            $element.css(property, min);
            this.t = setInterval(function(){
                var state = parseInt($element.css(property));
                if (state < max) {
                    state+=2;
                    $element.css(property, state);
                } else {
                    state = min;
                    $element.css(property, min);
                }
            }, 20);
            this.stop = function(){clearInterval(this.t)};
        }
    };
}();

VIZAPP.model = function () {
    var colorGenerator = new ColorGenerator(2.4,2.4,2.4,0,2,4);
    
    var Toponym = function(data) {
        this.name = data.name;
        this.toponymNo = data.toponymNo;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.language = data.language;
        this.type = data.type !== undefined ? data.type.name : null;
        this.formantName = data.formant !== undefined ? data.formant.formantName : null;
        this.formantNo = data.formant !== undefined ? data.formant.formantNo : null;
        this.othernames = data.englishTransliteration;
        /* default color */
        this.color = "#0066CC";
        this.infotriggered = ko.observable(false);
        this.selected = ko.observable(false);
    };

    var Formant = function(data, vm) {
        var self = this;
        self.name = data.formantName;
        self.formantNo = data.formantNo;
        self.size = data.toponymIds.length;
        self.toponymIds = data.toponymIds instanceof Array ? data.toponymIds : [data.toponymIds];
        self.toponyms = vm.getToponymsByIds(self.toponymIds);
        self.infotriggered = ko.observable(false);
        self.color = colorGenerator.generateNextColor();
        $.each(self.toponyms, function(index, toponym){
            toponym.color = self.color;
        });


        self.selectedTops = ko.computed(function(){
            return $.grep( this.toponyms, function(item){return item.selected();} ).length;
        }, self);
        self.selected = ko.observable(false);
        self.selected.subscribe(function(newValue, self){
            $.each(this.toponyms, function(index, toponym){ toponym.selected(newValue); });
        }, self);
        self.polygonData = [];
    };
    
    var Dataset = function(data, vm){
        this.name = data.name;
        this.id = data.datasetNo;
        this.toponyms = data.toponyms;
        
        this.goTo = function(dataset) {
            VIZAPP.dataInterface.getDatasetToponyms(dataset.id, function(loadedToponymObjects){
                vm.toponyms($.map(loadedToponymObjects, function(item){ return new Toponym(item)}));
                $("#dataset-work-panel").show("slide", {
                    easing:"easeOutExpo", direction: "left", duration: 400,
                    complete: function(){$("#dataset-select-panel").hide();}
                });
                VIZAPP.dataInterface.getDatasetFormants(dataset.id, function(loadedFormants) {
                    vm.formants($.map(loadedFormants, function(item){ return new Formant(item,vm)}));
                    $(".nano").nanoScroller();
                });
            }); 
        };
    };
    
    
    var ViewModel = function(){
        ko.bindingHandlers.selectableList = {
            init: function(element, valueAccessor){
                $(element).selectable({filter:"li", cancel:".info-trigger"});
                $(element).on( "selectableselected", function( event, ui ) {
                    var item = ko.dataFor(ui.selected);
                    item.selected(true);
                });
                $(element).on( "selectableunselected", function( event, ui ) {
                    var item = ko.dataFor(ui.unselected);
                    item.selected(false);
//                    valueAccessor().offFunc(item, event);
                });
            }
        };
        ko.bindingHandlers.showTriggerOnHover = {
            init: function(element, valueAccessor){
                $(element).hover( function(){$(".info-trigger", this).css('visibility', 'visible');},
                                  function(){$(".info-trigger:not(.triggered)", this).css('visibility', 'hidden');} );
            }
        };
        ko.bindingHandlers.turnHalfCircle = {
            init: function(element, valueAccessor){
                $(element).css({visibility: 'hidden', opacity: 1});
            },
            update: function(element, valueAccessor) {
                var isTriggered = valueAccessor();
                var angle = isTriggered ? -180 : 0;
                var start = isTriggered ? 0 : -180;
                $({deg: start}).animate({deg: angle}, {
                    duration: 200,
                    step: function(now) { $(element).css({transform: 'rotate(' + now + 'deg)'});},
                    done: function(){ 
                        if(!isTriggered) 
                            $(element).fadeTo(200, 0, function(){ $(this).css({visibility: 'hidden', opacity: 1}); }); 
                    }
                });
            }
        };
        ko.bindingHandlers.showGroupOnMap = {
            init: function(element, valueAccessor){
                var item = ko.dataFor(element);
                var coordinates = $.map(self.getToponymsByIds(item.toponymIds), function(toponym){
                    if (toponym.latitude !== "0.0")
                        return {x:parseFloat(toponym.latitude), y:parseFloat(toponym.longitude)};  
                    else return {};
                });
                VIZAPP.gui.computeClusters(coordinates, function(data){
                    // this should be put somewhere else
                    for (var i in data) {
                        var dPoints = new Array();
                        for (var j in data[i]) {
                            var aPoint = new google.maps.LatLng(data[i][j][0], data[i][j][1]);
                            for(var c = 0; c < 360; c += 360 / 6) {
                                var bPoint = google.maps.geometry.spherical.computeOffset(aPoint, 3000, c)
                                dPoints.push([bPoint.lat(), bPoint.lng()]);
                            }
                        }
                        data[i] = d3.geom.hull(dPoints);
                    }        
                    item.polygonData = data;
                });
            },
            update: function(element, valueAccessor) {
                var item = ko.dataFor(element);
                if(valueAccessor()){
                    VIZAPP.myMap.placePolygon(item, item.polygonData, item.color);
                } else {
                    VIZAPP.myMap.hidePolygon(item);
                }
            }
        };
        ko.bindingHandlers.showToponymOnMap = {
            update: function(element, valueAccessor) {
                var item = ko.dataFor(element);
                if(valueAccessor()){
                    VIZAPP.myMap.placeMarker(item, item.color);
                } else {
                    VIZAPP.myMap.hideMarker(item);
                }
            }
        };
        
        
        var self = this;
        self.datasets = ko.observableArray([]);
        self.toponyms = ko.observableArray([]);
        self.getToponymsByIds = function(ids){
            var rarray = [];
            for(var i in self.toponyms()){
                if ($.inArray(self.toponyms()[i].toponymNo, ids) > -1)
                    rarray.push(self.toponyms()[i]);
            }
            return rarray;
        };
        
        self.formants = ko.observableArray([]);
        self.getFormantById = function(id){
            for(var i in self.formants())
                if (self.formants()[i].formantNo === id)
                    return self.formants()[i];
            return {};
        };
        
        self.infoTriggeredElement = null;
        self.sideInfoWindow = {
            name: ko.observable(),
            othernames: ko.observable(),
            
            latlng: ko.observable(),
            language: ko.observable(),
            type: ko.observable(),
            group: ko.observable(),
            
            size: ko.observable(),
            toponymlist: ko.observableArray([]),
            
            close: function(){
                if(self.infoTriggeredElement) self.infoTriggeredElement.infotriggered(false);
                self.infoTriggeredElement = null;
                $("#info-panel").hide("slide", { direction: "left", duration: 200});                
            }
            
        };
        
        self.showSideInfoWindow = function(infoItem, e) {
            if (self.infoTriggeredElement === infoItem) {
                self.sideInfoWindow.close();
                return;
            }            
            if(self.infoTriggeredElement) self.infoTriggeredElement.infotriggered(false);
            infoItem.infotriggered(true);
            self.infoTriggeredElement = infoItem;
            
            $("#info-panel").hide("slide", { 
                easing:"easeInExpo", direction: "left", duration: 200,
                complete: function() {
                    self.sideInfoWindow.name(infoItem.name);
                    self.sideInfoWindow.othernames(infoItem.othernames);
                    self.sideInfoWindow.language(infoItem.language);
                    self.sideInfoWindow.type(infoItem.type);
                    self.sideInfoWindow.group(infoItem.formantName);
                    self.sideInfoWindow.size(infoItem.size);
                    if(infoItem instanceof Toponym){
                        self.sideInfoWindow.latlng(infoItem.latitude + ", " + infoItem.longitude);
                        self.sideInfoWindow.toponymlist([]);
                    } else if (infoItem instanceof Formant){
                        self.sideInfoWindow.latlng(null);
                        var toponymsNames = $.map(self.getToponymsByIds(infoItem.toponymIds), function(item){ return item.name;});
                        self.sideInfoWindow.toponymlist(toponymsNames);
                    }
                    $(this).offset({ top: $(e.target).offset().top - ($(this).height()/2) });
                }
            }).show("slide", {easing:"easeOutExpo", direction: "left", duration: 400 });
        };
        
        VIZAPP.dataInterface.getDatasetList(function(datasetList){
            self.datasets($.map(datasetList, function(item){ return new Dataset(item, self)}));
        });
    };
    
    return {
        createViewModel: function(){
            return new ViewModel();
        }
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
            done: function() { callback($target); }
        });

    };
    
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
        var template = $("#toponym-list-template");
        for (var i in toponymObjectArray) {
            var toponym = toponymObjectArray[i];
            var $toponym = template.clone();
            $toponym.children(".name").text(toponym.name);
            $toponym.attr("id", toponym.toponymNo)
                    .data("formant-id", (toponym.formant !== undefined ? toponym.formant.formantNo : null) )
                    .data("toponym-object", toponym)
                    .appendTo("#toponyms-list");
        }
        $("#toponyms-list .t-info-trigger").click(function(){ showInfo($(this)); });
        $("#toponyms-list .dynamic-button")
                .hover( function(){$(".t-info-trigger", this).css('visibility', 'visible');},
                        function(){$("span.t-info-trigger:not(.triggered)", this).css('visibility', 'hidden');} );
        $("#select-toponyms-btn").prop("disabled", false);
//        new List("dataset-work-panel", {valueNames: ['name']});
        $(".nano").nanoScroller();
    };
    
    var displayFormantsInAList = function(formantArray){
        var template = $("#formant-list-template");
        for (var i in formantArray) {
            var formant = formantArray[i];
            var color = colorGenerator.generateNextColor();
            var $formant = template.clone();
            $formant.children(".name").text(formant.formantName);
            $formant.children(".size").text(formant.toponymIds.length);
            $formant.attr("id", formant.formantNo)
                    .data("formant-object", formant)
                    .data("formant-color", color)
                    .appendTo("#groups-list");
        }
        $("#groups-list .g-info-trigger").click(function(){ showInfo($(this)); });
        $("#groups-list .dynamic-button")
                .hover( function(){$(".g-info-trigger", this).css('visibility', 'visible');},
                        function(){$("span.g-info-trigger:not(.triggered)", this).css('visibility', 'hidden');} );
        $("#select-groups-btn").prop("disabled", false);
        $(".nano").nanoScroller();
    };
    
    var refreshDatasetList = function() {
        $("#dataset-btn-list").empty();
        $("#load-progress").hide();
        VIZAPP.dataInterface.getDatasetList(function(datasetList){
            for (var i in datasetList) {
                var dataset = datasetList[i];
                $("<button>")
                        .text(dataset.name)
                        .attr("id", dataset.datasetNo)
                        .addClass("simple-button dataset-btn center-block")
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
            $(".list").selectable({filter:"li", cancel:".info-trigger,.t-info-trigger,.g-info-trigger"});
            
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
            
//            refreshDatasetList();
            
            $("button#back-to-dataset").button().click(function(){
                $("#select-toponyms-btn").trigger("click");
                deselectAllInActiveList();
                $("div#dataset-select-panel").show();
                $("div#dataset-work-panel").hide("slide", {
                    easing:"easeInExpo", direction: "left", duration: 200
                });
            });


            $("#delete-dataset-btn").click(function(){
                if ($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                    $("#upload-dataset-btn").removeAttr("disabled");
                    $("#confirm-delete-btn").hide("drop", {easing:"easeInExpo", direction: "down", duration: 200});
                    $("#dataset-btn-list button")
                            .removeClass("selected")
                            .off("click")
                            .click(function(){
                                chooseDataset($(this));
                            });
                } else {
                    $(this).addClass("selected");
                    $("#upload-dataset-btn").attr("disabled", "disabled");
                    $("#confirm-delete-btn").show("drop", {easing:"easeOutExpo", direction: "down", duration: 400 });
                    $("#dataset-btn-list button")
                            .off("click")
                            .click(function(){
                                $(this).toggleClass("selected"); 
                            });
                }
            }); 
            
            $("#confirm-delete-btn").click(function(){
                if ($("#delete-dataset-btn").hasClass("selected")){
                    var datasetIdsToDelete = "";
                    $("#dataset-btn-list button.selected").each(function(){
                        datasetIdsToDelete += this.id + ",";
                    });
                    $.ajax({
                        url: "request/dataset/delete/",
                        type: 'POST',
                        success: function(){
                            $("#dataset-btn-list button.selected")
                                    .hide("slide", {easing:"easeInExpo", direction: "left", duration: 400});
                        },
                        error: function(){
                            $("#dataset-btn-list button.selected")
                                    .removeClass("selected")
                                    .addClass("alert-grad");
                        },
                        complete: function(){
                            $("#upload-dataset-btn").removeAttr("disabled");
                        },
                        data: datasetIdsToDelete,
                        contentType: "text/plain",
                        processData: false,
                        cache:false
                    });
                }
            });

            
            $("#upload-dataset-btn").click(function(){
                $("#load-file-modal").show("drop", {easing:"easeOutExpo", direction: "up", duration: 400 });
            }); 
            
            $("#cancel-button").click(function(){
                $("#load-file-modal").hide("drop", {easing:"easeInExpo", direction: "up", duration: 200 });
            });
            
            $("#load-file-modal").hide();
            $("#load-progress").hide();
            $("#confirm-delete-btn").hide();
           
            $("#select-dataset-file").click(function(){
                $("#dataset-file").click();
            });
            
            $("#load-button").click(function(){
                var selectedFile = $("#dataset-file")[0].files[0];
                var fileType = "text/plain";
                if (selectedFile === undefined){
                    $("#select-dataset-file").focus();
                } else if ($("#name-dataset").val() === "") {
                    $("#name-dataset").focus();
                } else {
                    var datasetName = $("#name-dataset").val();
                    var dataType = $("#data-type-options button.selected").text();
                    $("#load-progress").show("slide", {easing:"easeOutExpo", direction: "left", duration: 400});
                    $("#load-progress > .stl-progress")
                            .css("width", "0%")
                            .text("0")
                            .removeClass("alert-grad");
                    var animation;
                    $.ajax({
                        url: "request/dataset/upload/" + datasetName + "/" + dataType,
                        type: 'POST',
                        xhr: function() { 
                            var myXhr = $.ajaxSettings.xhr();
                            if(myXhr.upload){
                                myXhr.upload.addEventListener('progress',function(e){
                                    if (e.lengthComputable) {
                                        var val = Math.round((e.loaded / e.total) * 100);
                                        if (val < 100){
                                            $("#load-progress > .stl-progress")
                                                    .css("width", val + "%")
                                                    .text(val + "%");
                                        } else {
                                            $("#load-progress > .stl-progress")
                                                    .css("width", "30%")
                                                    .text("");
                                            animation = new VIZAPP.objects.cycleAnimator($("#load-progress .stl-progress"), "margin-left", 
                                                -$("#load-progress .stl-progress").outerWidth(), 
                                                $("#load-progress").innerWidth()
                                            );
                                        }
                                    }
                                }, false);
                            }
                            return myXhr;
                        },
                        success: refreshDatasetList,
                        error: function(){
                            $("#load-progress > .stl-progress")
                                    .addClass("alert-grad")
                                    .css({width: "100%", margin: 0})
                                    .text("failed");
                            setTimeout(function(){
                                    $("#load-progress").hide("slide", {easing:"easeInExpo", direction: "left", duration: 400});
                                }, 2000);
                        },
                        complete: function() {
                            animation.stop();
                            $("#upload-dataset-btn").removeAttr("disabled");
                        },
                        data: selectedFile,
                        contentType: fileType,
                        processData: false,
                        cache:false
                    });
                    $("#load-file-modal").hide("drop", {easing:"easeInExpo", direction: "up", duration: 200 });
                    $("#upload-dataset-btn").attr("disabled", "disabled");
                }
            });
            
            
            $("#dataset-file").change(function(){
                var selectedFile = $("#dataset-file")[0].files[0];
                $("#select-dataset-file > span").text(selectedFile.name);
            });
            
            $("#load-file-modal > .simple-block-justified button").click(function(){
                if(!$(this).hasClass("selected")){
                    $("#load-file-modal > .simple-block-justified button").removeClass("selected");
                    $(this).addClass("selected");
                } 
            });
            
            $("div#dataset-work-panel").hide();
            $("div#dataset-select-panel").hide()
                    .show("slide", {easing:"easeOutExpo", direction: "left", duration: 400 });
                        
//            $toponymsList.on( "selectablestop", function( event, ui ) {
//                $("li.ui-selected" , this).each(function() { 
//                    selectToponym($(this));
//                });
//            });
//
//            $groupsList.on( "selectablestop", function( event, ui ) {
//                $("li.ui-selected" , this).each(function() {
//                    selectFormant($(this));
//                });        
//            });            
//
//            $toponymsList.on( "selectableunselected", function( event, ui ) {
//                deselectToponym($(ui.unselected));
//                updateFormantState($(ui.unselected));
//            } );
//
//            $groupsList.on( "selectableunselected", function( event, ui ) {
//                deselectFormant($(ui.unselected));
//            });  
            
            $("#dataset-select-panel .footer").hide();
            $.ajax({
                url: "request/storage/get-user/",
                type: 'GET',
                success: function(answer){
                    $("#dataset-select-panel .footer").show();
                    if(answer) {
                        $("#login-info").html(answer);
                        $("#delete-dataset-btn").removeAttr("disabled");
                        $("#upload-dataset-btn").removeAttr("disabled");
                    } else {
                        $("#login-info a").attr("href", "/request/storage/login");
                    }
                }
            });
            
            ko.applyBindings(VIZAPP.model.createViewModel());
        },
        computeClusters: function(coordinates, callback) {
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
    };
}();