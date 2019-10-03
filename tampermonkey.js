// ==UserScript==
// @name         Monstercat OBS Connector
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Update a ticker in your OBS stream with the currently playing track from Monstercat.com
// @author       Josh Wulf <josh@magikcraft.io>
// @match        https://www.monstercat.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require       https://raw.github.com/jwulf/MonkeyConfig/master/monkeyconfig.js
// @require       https://raw.githubusercontent.com/jwulf/monstercat-obs-connector/master/OBSWebsocket.min.js
// ==/UserScript==

// Massive shout-out to Brendan Hagan for the OBS web socket!

(async function() {
  "use strict";

  var cfg = new MonkeyConfig({
    title: "Monstercat OBS Connector Configuration",
    menuCommand: true,
    params: {
      OBSWebSocketPluginAddress: {
        type: "text",
        default: "localhost:4444"
      },
      OBSWebSocketPluginPassword: {
        type: "text",
        default: ""
      },
      tickerBase: {
        type: "text",
        default: "        twitter: @sitapati         github.com/jwulf       "
      },
      OBSSourceName: {
        type: "text",
        default: "Tagline"
      }
    }
  });

  const tickerBase = cfg.get("tickerBase");
  const OBSWebSocketPluginPassword = cfg.get("OBSWebSocketPluginPassword");
  const OBSWebSocketPluginAddress = cfg.get("OBSWebSocketPluginAddress");
  const sourceName = cfg.get("OBSSourceName");

  const obs = new OBSWebSocket();

  var currentTrack;
  var previousTrack;
  await obs.connect({
    address: OBSWebSocketPluginAddress,
    password: OBSWebSocketPluginPassword
  });
  console.log(`Now connected to OBS`);
  setInterval(() => {
    currentTrack = document.querySelector(".scroll-title").innerText;
    if (currentTrack !== previousTrack) {
      console.log(`Changing track in OBS to ${currentTrack}`);
      obs.send("SetSourceSettings", {
        sourceName,
        sourceSettings: {
          text: currentTrack
            ? `${tickerBase} - Now Playing: "${currentTrack}" on Monstercat.com`
            : tickerBase
        }
      });
      previousTrack = currentTrack;
    }
  }, 1000);
})();
