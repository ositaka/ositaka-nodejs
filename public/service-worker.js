/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-37481be9'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": ".DS_Store",
    "revision": "53d2c9c9917cdc0b284fe9b833d4bd20"
  }, {
    "url": "a8f42ecbed05b438435ab1d9bd6be9f1.png",
    "revision": "b54699f0b90f5705130bb0e86f40186c"
  }, {
    "url": "android-chrome-192x192.png",
    "revision": "dd512c1aae7acaef6a0baba62b3551b5"
  }, {
    "url": "android-chrome-512x512.png",
    "revision": "167c087564fd4fa53123ac2b473736a5"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "3cd14eb23e04ca6b8b6a3d141fdc3026"
  }, {
    "url": "favicon-16x16.png",
    "revision": "6bce3b44355f68fccd32a05d3507e71f"
  }, {
    "url": "favicon-32x32.png",
    "revision": "52b0116cc7b8b3708e9edf3cb0f9e7b4"
  }, {
    "url": "favicon.ico",
    "revision": "27939c3ef65e01745e1c7f0601c688f1"
  }, {
    "url": "icon.png",
    "revision": "c49723f0858df4c9249fe14b28ad0826"
  }, {
    "url": "intro.png",
    "revision": "b54699f0b90f5705130bb0e86f40186c"
  }, {
    "url": "logo.svg",
    "revision": "68fe178972c1012ec668ffc27716d316"
  }, {
    "url": "logo/a.svg",
    "revision": "ffc1979ba6ad21e2cd835adfd671832f"
  }, {
    "url": "logo/a2.svg",
    "revision": "da6f9842486fc8de940f73127404b29e"
  }, {
    "url": "logo/i.svg",
    "revision": "bdad474cf9098d1c33277619af676dfb"
  }, {
    "url": "logo/k.svg",
    "revision": "76b052e4abf22ffb0b20640cf380f3a6"
  }, {
    "url": "logo/o.svg",
    "revision": "dbd16f183d9ec2845fc09462bfecd994"
  }, {
    "url": "logo/s.svg",
    "revision": "6bd59097be87e3a26430f047b6c8bc39"
  }, {
    "url": "logo/t.svg",
    "revision": "27364a2dc18a866e7b2b5ef2b5ded870"
  }, {
    "url": "main.css",
    "revision": "1bc28de126e4449d98cf2b8835026e9d"
  }, {
    "url": "menu-icon-close.svg",
    "revision": "9dc5c8b386feea586c9bd50f29182131"
  }, {
    "url": "menu-icon.svg",
    "revision": "b84c7c38a20d2d1f8e2a6e80fcd08278"
  }, {
    "url": "mstile-144x144.png",
    "revision": "5deb917e66f185378b05f3ca9f769849"
  }, {
    "url": "og-card.jpg",
    "revision": "fc24544d009b34bff3e576a1404139d5"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "871e212e89880972c83368855e0c51b9"
  }, {
    "url": "site.webmanifest",
    "revision": "5ba4f5aee89b45c75ec0c5a77c7ba90a"
  }, {
    "url": "tile-wide.png",
    "revision": "3cddbf2b5989e1b99d294ff33440c2c6"
  }, {
    "url": "tile.png",
    "revision": "35c5dae4bed4c1724e90014d8d1a6b22"
  }], {});

}));
//# sourceMappingURL=service-worker.js.map
