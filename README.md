# Monstercat OBS Connector

Add the name of the currently playing track from [Monstercat.com](https://monstercat.com) to a ticker in your OBS stream.

This connector uses [Tampermonkey](https://www.tampermonkey.net/) to inject some JavaScript in the Monstercat.com player, and send the name of the currently playing track to OBS, so you can display in in your stream.

## To Use 

* Install the [OBS WebSocket plugin](https://github.com/Palakis/obs-websocket)
* Configure the password in OBS "Tools > WebSockets Server Plugin".

![](img/websocket-server-settings.png)
* Install the [Tampermonkey](https://www.tampermonkey.net/) plugin to your browser.
* Create a new Tampermonkey script 
