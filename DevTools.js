var objectPath = function (obj, path, defaultValue){
   if (_.isEmpty(path)) {
     return obj;
   }
   if (_.isEmpty(obj)) {
     return defaultValue;
   }
   if (_.isString(path)) {
     return objectPath(obj, path.split('.'), defaultValue);
   }
   var currentPath = path.shift();

   if (path.length === 0) {
     if (obj[currentPath] === void 0) {
       return defaultValue;
     }
     return obj[currentPath];
   }

   return objectPath(obj[currentPath], path, defaultValue);
 };

var regionInspector = function(path) {
    var regions = _regionInspector(app);
    if (_.isUndefined(path)) {
        return regions;
    } else {
        return objectPath(regions, path, {});
    }
};

var _regionInspector = function(obj) {
    if (!obj) {
        return {};
    }

    if (obj._regionManager) { // app
        var subViews = _subViews(obj);
        return subViews;
    } else if (obj.regionManager) { // layout
        var subViews = _subViews(obj);
        subViews._view = obj;
        return subViews;
    } else if (obj.children) { // collection view
        return _.map(obj.children._views, _regionInspector);
    } else { // simple view
        return {
            _view: obj
        };
    }
};

var _subViews = function(obj) {
    var subViews = {};
    var regions = (obj._regionManager || obj.regionManager)._regions;
    _.each(regions, function(region, regionName) {
        var subRegions = _regionInspector(region.currentView);
        subRegions._region = region;
        subViews[regionName] = subRegions;
    });
    return subViews;
};


var radioInspector = function() {
    return _.object(_.map(Radio._channels, function(channel, channelName) {
        return [channelName, {
            vent: channel.vent._events,
            reqres: channel.reqres._wreqrHandlers,
            commands: channel.commands._wreqrHandlers,
            channel: channel
        }];
    }));
};

var breakOn = function(object, method) {
    var originalMethod = object[method];
    if (!originalMethod) {
        throw new Error('Couldnt find method ' + method + ' to break on.');
    }

    object[method] = function stopExecution() {
        debugger;
        return originalMethod.apply(this, arguments);
    }

    return object[method];
};


DevTools = {
    breakOn: breakOn,
    regionInspector: regionInspector,
    radioInspector: radioInspector
};
