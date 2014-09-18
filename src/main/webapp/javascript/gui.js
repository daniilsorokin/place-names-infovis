
VIZAPP.dataInterface = function () {
    $.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});

    return {
        getAllToponyms: function (doWithToponyms){
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
        },
        getDatasetToponyms: function (datasetId, doWithToponyms){
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
        },        
        getAllFormants: function (doWithFormants) {
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
        },
        getDatasetFormants:function (datasetId, doWithFormants) {
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
        zoom: 8, 
        center: new google.maps.LatLng(59.4, 29.13333),
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        panControl: false,
        zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.RIGHT_BOTTOM},
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();

    var markers = {};
    var polygons = {};

    return {
        init: function() {
            google.maps.visualRefresh = true;
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//            map.setCenter(VIZAPP.databases[0].startPoint);
//            map.setZoom(VIZAPP.databases[0].startZoom);
        },

        placeMarker: function(toponym, color) {
            if (markers[toponym.toponymNo] === undefined) {
                var opacity = 1.0;
                var radius = 1500; 
                var latlng = new google.maps.LatLng(parseFloat(toponym.latitude), parseFloat(toponym.longitude));
                var circleOptions = {
                    strokeWeight: 0,
                    fillColor: color,
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
            if (markers[toponym.toponymNo]) {
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
            if (formant && polygons[formant.formantNo])
                polygons[formant.formantNo].setMap(null);
        },
    };
}();

VIZAPP.objects = function () {
    var circleWaitIcon = function($element){
//            $element.addClass("wait-circle");
            var deg = 0;
            this.t = setInterval(function(){
                deg = deg < 340 ? deg + 20 : 0;
                $element.css({transform: 'rotate(' + deg + 'deg)'});
            }, 100);
            this.stop = function(){clearInterval(this.t)};
        }
    
    
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
        },
        createCircleWaitIcon:  function($element) {
            return new circleWaitIcon($element);
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
        self.toponymIds = data.toponymIds instanceof Array ? data.toponymIds : [data.toponymIds];
        self.toponyms = vm.getToponymsByFormant(self.formantNo);
        self.size = self.toponyms.length;
        self.infotriggered = ko.observable(false);
        self.color = colorGenerator.generateNextColor();
        $.each(self.toponyms, function(index, toponym){
            toponym.color = self.color;
        });

        self.selectedTops = ko.computed(function(){
            return $.grep( this.toponyms, function(item){return item.selected();} ).length;
        }, self);
        self.selected = ko.observable(false);
        self.selected.extend({ notify: 'always' });
        self.selected.subscribe(function(newValue, self){
            $.each(this.toponyms, function(index, toponym){ toponym.selected(newValue); });
        }, self);
        self.polygonData = [];
    };
    
    var Dataset = function(data){
        this.name = data.name;
        this.id = data.datasetNo;
        this.toponyms = data.toponyms;
    };
    
    
    var ViewModel = function(){
        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;
        
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
                var coordinates = $.map(item.toponyms, function(toponym){
                    if (toponym.latitude && toponym.latitude !== "0.0")
                        return {x:parseFloat(toponym.latitude), y:parseFloat(toponym.longitude)};  
                    else return;
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
        self.getToponymsByFormant = function(formantId){
            var rarray = [];
            for(var i in self.toponyms()){
                if (self.toponyms()[i].formantNo === formantId)
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
        self.tFilter = ko.observable('');
        self.fFilter = ko.observable('');

        
        self.matchFilter = function(filter, value){
            if ( !filter ) return true;
            return value.slice(0, filter.length).toLowerCase() === filter.toLowerCase();
        }
        
        self.deselectEverything = function(){
            $.each(this.formants(), function(index, formant){ formant.selected(false); });
            $.each(this.toponyms(), function(index, toponym){ toponym.selected(false); });
        };
        
        self.tsortHeaders = [{titleasc:"a-z", titledes:"z-a", key:"name", asc:ko.observable(true)}];
        self.fsortHeaders = [{titleasc:"a-z", titledes:"z-a", key:"name", asc:ko.observable(true)}, // formants
                            {titleasc:"0-9", titledes:"9-0", key:"size", asc:ko.observable(true)}];
        self.tactiveSort = ko.observable(self.tsortHeaders[0]);
        self.factiveSort = ko.observable(self.fsortHeaders[0]);
        self.sortListBy = function(list, header, setActiveSort){
            var value = header.asc() ? -1 : 1;
            list.sort(function(left, right) { 
                return left[header.key] === right[header.key] ? 0 : (left[header.key] < right[header.key] ? value : -value) ;
            });
            setActiveSort(header);
            header.asc(!header.asc());
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
                        var toponymsNames = $.map(infoItem.toponyms, function(item){ return item.name;});
                        self.sideInfoWindow.toponymlist(toponymsNames);
                    }
                    $(this).offset({ top: $(e.target).offset().top - ($(this).height()/2) });
                }
            }).show("slide", {easing:"easeOutExpo", direction: "left", duration: 400 });
        };
        
        self.refreshDatasetList = function(){
            VIZAPP.dataInterface.getDatasetList(function(datasetList){
                self.datasets($.map(datasetList, function(item){ return new Dataset(item, self)}));
            });
        };
        
        self.clickDataset = function(dataset, e){
            if($("#delete-dataset-btn").hasClass("selected")){
                $(e.target).toggleClass("selected"); 
            } else {
                self.goTo(dataset);
            }
        };
        
        self.goTo = function(dataset) {
            VIZAPP.dataInterface.getDatasetToponyms(dataset.id, function(loadedToponymObjects){
                self.toponyms($.map(loadedToponymObjects, function(item){ return new Toponym(item)}));
                $("#dataset-work-panel").show("slide", {
                    easing:"easeOutExpo", direction: "left", duration: 400,
                    complete: function(){$("#dataset-select-panel").hide();}
                });
                self.sortListBy(self.toponyms, self.tsortHeaders[0], self.tactiveSort);
                VIZAPP.dataInterface.getDatasetFormants(dataset.id, function(loadedFormants) {
                    self.formants($.map(loadedFormants, function(item){ return new Formant(item,self)}));
                    self.sortListBy(self.formants, self.fsortHeaders[0], self.factiveSort);
                    $(".nano").nanoScroller();
                });
            }); 
        };
        
        self.goBack = function (){
            $("#select-toponyms-btn").trigger("click");
            self.deselectEverything();
            $("#dataset-select-panel").show();
            $("#dataset-work-panel").hide("slide", { easing:"easeInExpo", direction: "left", duration: 200 });
        };
        
    };
    
    new ViewModel();
    return {
        getViewModel: function(){
            return ViewModel();
        }
    };
}();

VIZAPP.gui = function () {
    var kmeans = new KMeans(); kmeans.kmpp = true;
    
    var $activeList = undefined;
    
    var convertClusters = function(){
        //TODO
    };
    
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
    };

    return {
        init: function () {
            VIZAPP.myMap.init();

            $("#toponyms-list-container").show();
            $("#groups-list-container").hide();

            $("#select-toponyms-btn").click(function (){
                $("#select-toponyms-btn").addClass("selected");
                $("#select-groups-btn").removeClass("selected");
                $("#toponyms-list-container").show('slide',{ direction: "left" });
                $("#groups-list-container").hide('slide', { direction: "right" });
                $(".nano").nanoScroller();
            });
            $("#select-groups-btn").click(function (){
                $("#select-toponyms-btn").removeClass("selected");
                $("#select-groups-btn").addClass("selected");
                $("#groups-list-container").show('slide',{ direction: "right" });
                $("#toponyms-list-container").hide('slide', { direction: "left" });
                $(".nano").nanoScroller();
            });
            
            $("#info-window-container .panel").hide();
            VIZAPP.objects.createCircleWaitIcon($(".rotating-circle"));

            $("#delete-dataset-btn").click(function(){
                if ($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                    $("#upload-dataset-btn").removeAttr("disabled");
                    $("#confirm-delete-btn").hide("drop", {easing:"easeInExpo", direction: "down", duration: 200});
                    $("#dataset-btn-list button").removeClass("selected");
                } else {
                    $(this).addClass("selected");
                    $("#upload-dataset-btn").attr("disabled", "disabled");
                    $("#confirm-delete-btn").show("drop", {easing:"easeOutExpo", direction: "down", duration: 400 });
                }
            }); 
            
            $("#confirm-delete-btn").click(function(){
                if ($("#delete-dataset-btn").hasClass("selected")){
                    var datasetIdsToDelete = "";
                    $("#dataset-btn-list button.selected").each(function(){
                        var item = ko.dataFor(this);
                        datasetIdsToDelete += item.id + ",";
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
                        success: VIZAPP.model.getViewModel().refreshDatasetList,
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
                            $("#load-progress").hide("slide", {easing:"easeInExpo", direction: "left", duration: 400});
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
                        
            if(VIZAPP.isLoginRequired){
                $.ajax({
                    url: "request/storage/get-user/",
                    type: 'GET',
                    success: function(answer){
                        $("#dataset-select-panel .footer").show();
                        if(answer) {
                            $("#login-info").hide();
                            $("#dataset-select-panel .footer h4").html(answer);
                            $("#delete-dataset-btn").removeAttr("disabled");
                            $("#upload-dataset-btn").removeAttr("disabled");
                        } else {
                            $("#login-info").show();
                            $("#login-info a").attr("href", "/request/storage/login");
                        }
                    }
                });
            }
            
            ko.applyBindings(VIZAPP.model.getViewModel());
            VIZAPP.model.getViewModel().refreshDatasetList();
        },
        computeClusters: function(coordinates, callback) {
            kmeans.k = guessK(coordinates);
            kmeans.setPoints(coordinates);
            kmeans.initCentroids();
            kmeans.cluster(function(){
                var clusters = {};
                for (var i = 0; i < kmeans.points.length; i++) {
                    if (kmeans.points[i].items === undefined){
                        var centroid = kmeans.points[i].centroid;
                        if (clusters[centroid] === undefined) {
                            clusters[centroid] = new Array();
                        }
                        clusters[centroid].push(kmeans.points[i]);
                    }
                }
                var clustersArray = [];
                for (var i in clusters) {
                    for (var j in clusters[i]) {
                        clusters[i][j] = [clusters[i][j].x, clusters[i][j].y];
                    }
                    clustersArray.push(clusters[i]);
                }
                callback(clustersArray);
            });
        }
    };
}();