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
    "url": "7799ebb55302407e53cab60b961b681f.woff",
    "revision": "a12bd42fa3f8b1239b60744027730893"
  }, {
    "url": "android-chrome-192x192.png",
    "revision": "6bcca02d2de8b1458004f17be9ba96ff"
  }, {
    "url": "android-chrome-512x512.png",
    "revision": "f91679b4a3bfea285d4f2ab760b77ba8"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "e32923b5984853e1605b74f7eaed6bd4"
  }, {
    "url": "bubble.json",
    "revision": "d8e26ccb3c6e9adf050be8bb7481e47a"
  }, {
    "url": "favicon-16x16.png",
    "revision": "37117f7905ba766997bf756fa8143a7c"
  }, {
    "url": "favicon-32x32.png",
    "revision": "b97f229af86fbc1ad443a81b192088c3"
  }, {
    "url": "logo.svg",
    "revision": "68fe178972c1012ec668ffc27716d316"
  }, {
    "url": "main.css",
    "revision": "0ecae47d8be0ed7a2d9338153ececf1d"
  }, {
    "url": "menu-icon-close.svg",
    "revision": "9dc5c8b386feea586c9bd50f29182131"
  }, {
    "url": "menu-icon.svg",
    "revision": "b84c7c38a20d2d1f8e2a6e80fcd08278"
  }, {
    "url": "mstile-144x144.png",
    "revision": "e3ef1a8bde2462427c9f52e55bef490b"
  }, {
    "url": "og-card.jpg",
    "revision": "56e6087f708ad92af95b66469ddffd2f"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "871e212e89880972c83368855e0c51b9"
  }, {
    "url": "site.webmanifest",
    "revision": "5ba4f5aee89b45c75ec0c5a77c7ba90a"
  }], {});

}));
//# sourceMappingURL=service-worker.js.map
