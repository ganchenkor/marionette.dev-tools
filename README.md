## DevTools

DevTools is a collection of utility methods that will help develop and test Marionette apps.

## Status

This is very new. The next steps are to add some tests, a descent build process, npm and bower support, and a nice logo. I'd love all the help I can get!


### regionInspector

Region Inspector returns your view tree starting with app's regions. It's a great way to quickly see the shape of your app. The inspector is also nice for getting a view UI element or model attribute. ProTip, the regionInspector can be an awesome sidekick for integration testing. I use it to get UI elements to click on and get dom values to assert against.


```js
DevTools.regionInspector();
DevTools.regionInspector('Layout.Page')
DevTools.regionInspector('Layout.Page')._region
DevTools.regionInspector('Layout.Page.Body.List')._view.ui.item
```

![](http://f.cl.ly/items/3x1J2V0l3e2j1O1u2X1t/Image%202014-06-26%20at%202.27.16%20PM.png)


### radioInspector

Radio Inspector returns a list of your Radio's channels and their events, commands, and requests. The inspector makes it easy to see which objects are subscribed to an event or command and the callback that would be triggered when the event is fired. ProTip: you can trigger Channel events from the inspector.

```js
DevTools.radioInspector();
DevTools.radioInspector().app.commands
DevTools.radioInspector().app.commands.navigate.callback
```

![](http://f.cl.ly/items/0Z1S1I0A432U10223619/Image%202014-06-25%20at%202.30.37%20PM.png)


### breakOn

BreakOn wraps a function so that any invokaction will first set the debugger and then procede. This is useful when you have an object reference and you want to break on some call. This can be used in conjunction with regionInpsector to break on all renders of a view for example.

```js
DevTools.breakOn(listView, 'render');
```
