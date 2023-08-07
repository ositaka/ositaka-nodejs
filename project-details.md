---
title: Project Details & Important Info
last update: 2022-04-21
---

## To Do

1 - make images (for 3g) of the videos on the "FULL SCREEN" Slices on each "Work Page".

1.1 - viva sara done

2 - On "Work" page added a video that plays when the cursor is hover the image

3 - change cookie on page.change()

4 - Add parallax on about page ??

5 - Add extra-element on IMAGES to show the background color, if they are still loading

---

## Prismic Helpful Commands & Tricks

---

### Remove "auto-compress"

to remove "auto-compress" from Prismic, add the following on the image src: `.replace('auto=compress,format', '')`

```pug
img.about**media**image(alt=about.data.image.alt data-src=about.data.image.url.replace('auto=compress,format', ''))
```

#### Example for **responsive `video`**

```pug
if isPhone
  video(poster=`${about.data.video[0].poster.url},format&w=700` preload="auto" playsinline loop muted disablepictureinpicture)
  source(src=`${about.data.video[0].phone.url}` type="video/mp4")
else
  video(poster=`${about.data.video[0].poster.url}` preload="auto" playsinline loop muted disablepictureinpicture)
  source(src=`${about.data.video[0].desktop.url}` type="video/mp4")
```

---

## Code Examples

---

Here is shown a few precious pieces of code, to help in the near future, when no one knows what this all is about.

### 1 — Internet Connection Examples (`4g` + `3g`/`slow-2g`)

On this chapter, we can find a few examples of code, thought to take the most advantage of the user's internet connection type. These connection types can vary from `4g`, `3g`, `2g` and `slow-2g`. For the sake of simplicity, we are going to ignore the `2g` one and use `slow-2g` instead, as it is the slowest internet connection (GPRS).

Have in mind that, by default, Prismic already serves all the images with a reasonable quality/compression ratio. As a plus, it serves already all the images with a `.webp` and it converts `.gif` files to animated `.webp` files. The images end-up by having a good final file size served from Prismic.

We use the [PugJS](https://pugjs.org/api/getting-started.html) as template engine to make use of it's magic on serving dynamic data, with NodeJS. To achieve this, we set a JavaScript cookie on the `base.pug` file, after checking the user's connection type at the very beginning of the request. This "internet connection check-test" it runs every type the user navigates between pages.

As a good example for this use case scenario is, for instance, on an indoor market, where the internet connection is not so good, and it's changing quite frequently between `3g` and `slow-2g`. With this approach, we can quickly serve more compressed images, that will take less time to be loaded. This will give a better experience to the user and will keep the user motivated to wait a bit more, but not give it up. We show a background color on all images, based on its main color, picked by hand, to keep the branding aspect in mind.

#### 1.1 — Check user's internet connection type with JavaScript & server the appropriated media files with ExpressJS

The following JavaScript code is executed on the `<head>` HTML element, right after the SEO metatags. This code snippet it will add to check the user's internet connection with the help of `navigator.connection?.effectiveType`.

Browser compatibility: **Chrome based browsers** and **Opera** only. [No support for Safari, Firefox and IE](https://caniuse.com/?search=effectiveType). In case the browser doesn't support `navigator.connection.effectiveType` we will just serve the `4g` assets.

```pug
//- Check Internet Connection
//- on initial page load
script.
  document.cookie = `connection=; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `connection=${navigator.connection?.effectiveType}`;

  if (!window.location.hash) {
    // redirects the user,
    window.location = window.location + '#loaded';
    window.location.reload();
  } else {
    history.pushState("", document.title, window.location.pathname)
  }
```

Now let's get use of this cookie `connection` from the client-side and serve the appropriated media (using ExpressJS as a server).

This is the reference code of our `app.js` file:

```pug
const cookieSession = require('cookie-session');

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 15 * 60 * 1000, // 15 minutes
  })
);

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent']);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === 'mobile';
  res.locals.isTablet = ua.device.type === 'tablet';

  res.locals.Link = handleLinkResolver;

  res.locals.PrismicDOM = PrismicDOM;

  if (res.locals.connection == undefined && req.headers.cookie) {
    // returns an object with the cookies' name as keys
    const getAppCookies = (req) => {
      // We extract the raw cookies from the request headers
      const rawCookies = req.headers.cookie.split('; ');

      const parsedCookies = {};
      rawCookies.forEach((rawCookie) => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
      });
      return parsedCookies;
    };

    let connection = getAppCookies(req, res)['connection'];

    res.locals.connection = connection;

    console.log('connect on the server', connection);
  } else {
    res.locals.connection = req.body.connection;
  }
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

#### 1.2 — Video example (with Image fallback)

The desired element on this media object is the HTML element `<video>` and is only served when the **user** is on a `4g` connection. In case the user is on a bad connection type, for instance `3g` or `slow-2g`, an `<img>` HTML element will be served.

##### Notes

1. In order to get even a better performance, and page load speed, we are using `.replace('?auto=compress,format', '?q=30&auto=compress,format')` to request a 70% optimized image, from the image processor of Prismic: [`imgix`](https://prismic.io/blog/prismic-image-optimization-imgix 'See official post on Prismic.io').

2. For desktop devices, it is better to set a maximum size of 1200px wide, by using `&w=1200` at the end of the quality parameter from the previous point.

3. For mobile devices, the default `width` of all the images are **480px**, because is higher than the default 360px screen phone's width. This is helpful, because it serves a better image for high DPI screens, without the need for using a `@2x` image. In our case, the most important is the overall [Performance of the website](https://design-code.tips/tags/performance/).

##### Example code — Video on `4g` only

```pug
figure.home__hero__media
  picture(height=`${home.data.video[0].video_preview.dimensions.height}` width=`${home.data.video[0].video_preview.dimensions.width}` style=`background-color: ${home.data.video[0].background_color}`)
    if (connection === '4g' || connection === 'undefined')
      video(preload="auto" playsinline loop muted disablepictureinpicture
        srcset=`
          ${home.data.video[0].video_mobile.url} 768w,
          ${home.data.video[0].video_desktop.url} 769w
        `)
    else
      if (typeof(home.data.video[0].video_preview.phone) !== 'undefined')
        source(media='(max-width: 768px)' srcset=`${home.data.video[0].video_preview.phone.url.replace('?auto=compress,format', '?q=30&auto=compress,format')}`)
        source(media='(min-width: 769px)' srcset=`${home.data.video[0].video_preview.url.replace('?auto=compress,format', '?q=30&w=1200&auto=compress,format')}`)
      img(alt=home.data.video[0].video_preview.alt data-src=home.data.video[0].video_preview.url height=`${home.data.video[0].video_preview.dimensions.height}` width=`${home.data.video[0].video_preview.dimensions.width}`)
```

##### Example code — Media can be a `<video>` element or a `<img>` element. Then, check the user's internet connection to serve video or image

```pug

figure.work_page__full-screen__media
  picture(height=`${section.primary.image.dimensions.height}` width=`${section.primary.image.dimensions.width}` style=`background-color: ${section.primary.background_color}`)
    //- is video && is on 4g
    if (section.primary.is_video === true && (connection === '4g' || connection === 'undefined'))
      video(preload="auto" playsinline loop muted disablepictureinpicture
        srcset=`
          ${section.primary.video_mobile.url} 768w,
          ${section.primary.video_desktop.url} 769w
        ` style=`background-color: ${section.primary.background_color}`)

    //- is video && is not on 4g: show image
    else if (section.primary.is_video === true && connection !== '4g' && typeof(section.primary.image.phone) !== 'undefined')
      source(media='(max-width: 768px)' srcset=`${section.primary.image.phone.url.replace('?auto=compress,format', '?q=30&auto=compress,format')}`)
      source(media='(min-width: 769px)' srcset=`${section.primary.image.url.replace('?auto=compress,format', '?q=30&w=1200&auto=compress,format')}`)
      img(alt=section.primary.image.alt data-src=section.primary.image.url height=`${section.primary.image.dimensions.height}` width=`${section.primary.image.dimensions.width}`)

    //- is image
    else
      if (typeof(section.primary.image.phone) !== 'undefined')
        source(media='(max-width: 768px)' srcset=`${connection === '4g' || connection === 'undefined' ? section.primary.image.phone.url : section.primary.image.phone.url.replace('?auto=compress,format', '?q=30&auto=compress,format')}`)
        source(media='(min-width: 769px)' srcset=`${connection === '4g' || connection === 'undefined' ? section.primary.image.url.replace('?auto=compress,format', '') : section.primary.image.url.replace('?auto=compress,format', '?q=30&w=1200&auto=compress,format')}`)
      img(alt=section.primary.image.alt data-src=section.primary.image.url.replace('?auto=compress,format', '') height=`${section.primary.image.dimensions.height}` width=`${section.primary.image.dimensions.width}`)
```

#### 1.3 — Image example (`4g` vs `3g`/`slow-2g`)

Ideally, with `4g`, we serve a more sharped image (without any compression) and we use `.replace('?auto=compress,format', '')` to replace the default auto-compressed file from Prismic's CDN (with [`imgix`](https://prismic.io/blog/prismic-image-optimization-imgix 'See official post on Prismic.io')).

If the user is on a bad connection (`3g` or `slow-2g`), we serve a 70% optimized image from the request to the Prismic CDN (with [`imgix`](https://prismic.io/blog/prismic-image-optimization-imgix 'See official post on Prismic.io')).

##### Example code — Sharper images on `4g`

```pug
figure.home__projects__item__media
  picture(height=`${project.project_image.dimensions.height}` width=`${project.project_image.dimensions.width}` style=`background-color: ${project.background_color}`)
    if (typeof(project.project_image.phone) !== 'undefined')
      source(media='(max-width: 768px)' srcset=`${connection === '4g' || connection === 'undefined' ? project.project_image.phone.url : project.project_image.phone.url.replace('?auto=compress,format', '?q=30&auto=compress,format')}`)
      source(media='(min-width: 769px)' srcset=`${connection === '4g' || connection === 'undefined' ? project.project_image.url.replace('?auto=compress,format', '') : project.project_image.url.replace('?auto=compress,format', '?q=30&w=1200&auto=compress,format')}`)
    img.home__projects__item__media__image(alt=project.project_image.alt data-src=project.project_image.url.replace('?auto=compress,format', '') height=`${project.project_image.dimensions.height}` width=`${project.project_image.dimensions.width}`)

```

#### 1.4 — Simple Image Example (desktop & phone)

Here is a simple image example, but still, we make sure we serve the right format size for mobile devices as well as for desktops. We double-check the internet connection type; if it is `4g`, we serve a more sharp/detailed image.

```pug
figure.services__projects__item__media
  picture(height=`${project.project_image.dimensions.height}` width=`${project.project_image.dimensions.width}` style=`background-color: ${project.background_color}`)
    img.services__projects__item__media__image(
      alt=project.project_image.alt
      data-src=`
        ${connection === '4g' || connection === 'undefined' ?
          project.project_image.url.replace('?auto=compress,format', isPhone ? '?w=480' : '?w=900' )
        :
          project.project_image.url.replace('?auto=compress,format', isPhone ? '?q=30&w=360&auto=compress,format' : '?q=30&w=600&auto=compress,format')}`
        height=`${project.project_image.dimensions.height}`
        width=`${project.project_image.dimensions.width}`)
```

### 2 — Responsive Video with JavaScript

On this chapter will take a quick look on how to be able to mimic the **responsive image** aspect, but on video. We can achieve this by using a `<video>` HTML element with a `data-src` data-attribute.

#### 2.1 — Responsive Video Code — JavaScript

```js
// responsive video
function responsiveVideo(window, undefined) {
  function videoSourceSet(options, elements) {
    options = Object.assign({}, { resize: false, resizeDelay: 50 }, options);
    if (elements === undefined) {
      elements = document.getElementsByTagName('video');
    }
    var regex = /^\s*(.+)\s+(\d+)([wh])?\s*$/;
    function getSourceSets(def) {
      var sources = [];
      var parts = def.split(',');
      for (var i in parts) {
        var result;
        if ((result = parts[i].match(regex))) {
          sources.push({ width: parseInt(result[2]), src: result[1] });
        }
      }
      return sources;
    }

    function selectSource(srcsrt, screenWidth) {
      var sources = getSourceSets(srcsrt);
      var selectedDiff = null;
      var source = null;

      for (var i in sources) {
        var candidate = sources[i];
        var candidateDiff = candidate.width - screenWidth;
        if (
          source === null ||
          (selectedDiff < 0 && candidateDiff >= 0) ||
          (candidateDiff < 0 && candidateDiff > selectedDiff) ||
          (candidateDiff >= 0 && candidateDiff < selectedDiff)
        ) {
          selectedDiff = candidateDiff;
          source = candidate.src;
        }
      }
      return source;
    }

    function init(elements) {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.tagName == 'VIDEO' && element.hasAttribute('srcset')) {
          var srcset = element.getAttribute('srcset');
          if (srcset) {
            var selectedSource = selectSource(srcset, window.innerWidth);
            if (selectedSource !== element.src) {
              element.src = selectedSource;

              // fix intersecObserver
              var playPromise = element.play();

              if (playPromise !== undefined) {
                playPromise
                  .then((_) => {
                    element.pause();
                  })
                  .catch((error) => {
                    error = null;
                  });
              }
            }
          }
        }
      }
    }
    init(elements);

    if (options.resize) {
      var resizeDelayTimeout = null;
      window.addEventListener('resize', function () {
        if (resizeDelayTimeout !== null) {
          clearTimeout(resizeDelayTimeout);
        }
        resizeDelayTimeout = setTimeout(function () {
          init(elements);
        }, options.resizeDelay);
      });
    }
  }
  window.videoSourceSet = videoSourceSet;
}

responsiveVideo(window);
videoSourceSet({ resize: true, resizeDelay: 1000 });
```

#### 2.2 — Responsive Video Code — PugJS & HTML

In order to be able to use the magic from the above code, we have to use the code below. Please note that the `src` attribute on the `<video>` element will be added automatically with the JavaScript code.

1 - PugJS version

```pug
video(preload="auto" playsinline loop muted disablepictureinpicture
  srcset=`
    ${section.primary.video_mobile.url} 768w,
    ${section.primary.video_desktop.url} 769w
  `)
```

2 - HTML version

```html
<video
  preload="auto"
  playsinline
  loop
  muted
  disablepictureinpicture
  srcset="
    https://media-creators.cdn.prismic.io/media-creators/85ff18ed-2238-4095-bdd6-ae19a6a5d502_pierre-sports__shop-product__mobile.mp4 768w, 
    https://media-creators.cdn.prismic.io/media-creators/6cdb67a6-3fe0-4429-98b7-237c7c6aa84c_pierre-sports__shop-product%401920_lighter.mp4 769w
  "
></video>
```

#### 2.3 — Use an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to `play()` the `<video>`when it is _only_ visible on the screen

Here you can see the core concept idea using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to check if the `<video>` is currently visible on the user's screen.

##### 2.3.1 — Code Example — Video plays only when is visible

```js
// Video.js
import Animation from 'classes/Animation';

export default class extends Animation {
  constructor({ element }) {
    super({
      element,
    });
  }

  animateIn() {
    this.element?.play();
  }

  animateOut() {
    this.element?.pause();
  }
}
```

##### 2.3.2 — Code Example — Animation JS `class` using the `window.IntersectionObserver` to make all the magic

Pay special attention to the `createObserver()` function and see how it works.

```js
// Animation.js
import AutoBind from 'auto-bind';

export default class {
  constructor({ element, elements }) {
    AutoBind(this);

    const { animationDelay, animationTarget } = element.dataset;

    this.delay = animationDelay;
    this.element = element;
    this.elements = elements;
    this.target = animationTarget ? element.closest(animationTarget) : element;
    this.isVisible = false;

    if ('IntersectionObserver' in window) {
      this.createObserver();
      this.animateOut();
    } else {
      this.animateIn();
    }
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!this.isVisible && entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    }).observe(this.target);
  }

  animateIn() {
    this.isVisible = true;
  }

  animateOut() {
    this.isVisible = false;
  }
}
```

### 3 — Web Animations (with CSS & JavaScript)

Web animations can be one of the hardest topics in performance. You can simply use CSS transitions and animations or mimic the same effect with JavaScript, but you will be able to take more advantage (performance-wise) and control when you combine these two technologies.

JavaScript is great to detect when the animated elements are visible on the screen and to set `data-attributes` in these elements, to be able to control the animation state (show, hide or move elements). To achieve this goal, we must use an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to check when the element is visible on the screen. Then, with CSS we can animate the desired elements.

With the above approach, the browser will be able to generate much smoother animations, keeping the performance always in mind. When using CSS to animate the elements, instead of JavaScript, the browser gives a much higher FPS (Frames Per Second), comparing to the FPS obtained with JavaScript.

We can also set different animations types or behavious for desktops, tablets or phones. Sometimes, the older phone models can have a very slow FPS; in this case, we can simply ignore specific animations with CSS and just let them run on "high-performance" devices. Please see point number **4** to see how this is possible.

Now, let's take a look how we managed our animations at [www.mediacreators.studio](https://www.mediacreators.studio) website

#### 3.1 — CSS Base Animations

By using animated CSS `transform`, we can mimic the JavaScript behavior, but for that we have to add an extra class `.in-view`. You can see how in the point **3.2**.

```scss
// animations.scss
* {
  span span {
    transform: translateY(200%) rotateY(-20deg) rotateZ(20deg) skewX(30deg);
    transition: none;
    will-change: transform;
  }

  &.in-view span span {
    transform: translateY(0%) rotateY(0deg) rotateZ(0deg) skewX(0deg);
    transition: transform 1.4s $ease-mc;
  }
}

[data-animation='link'] {
  display: inline-block;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  width: max-content;
}

[data-animation='link'] span {
  display: inline-block;
  transform-origin: center center 0.5em;
  vertical-align: middle;
}

[data-animation='label'],
[data-animation='paragraph'],
[data-animation='title'],
[data-animation='chain'] {
  span {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
  }
}
```

#### 3.2 — JavaScript exemplo of our `Title.js` animation

The `Title` animations are called via an HTML data-attribute: `data-animation="title"`. This is how the animation is called via JS and CSS.

Please pay attention to the `animateIn()` and `animateOut()` functions. You will see the following line: `classList.add('in-view')` and `classList.remove('in-view')`. Here is where the magic happens with the CSS animation.

```js
import Animation from 'classes/Animation';
import { calculate, split } from 'utils/text';

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    // divides the title into words, so we can animate each word individually
    split({ element: this.element, append: true });
    split({ element: this.element, append: true });

    this.elementLinesSpans = this.element.querySelectorAll('span span');
  }

  animateIn() {
    this.element.classList.add('in-view');

    this.element.querySelectorAll('span span').forEach((element, index) => {
      element.style.transitionDelay = `${index + index + index + index}0ms`;
    });
  }

  animateOut() {
    this.element.classList.remove('in-view');
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans);
  }
}
```

### 4 — Checking the Performance on all Devices (`low-performance` vs `high-performance`)

Performance is not just a matter in measuring the internet connection speed and serve the appropriated files or assets. To get a great performance on the overall experience, you must check if the user is on a `high-performance` or `low-performance` device. Then, according to the obtained result, we can show less animations, for example, or even don't show animations at all.

#### 4.1 — Highjacking the scroll-bar

This performance check is very helpfull in case you are _hijacking_ the scroll-bar with JavaScript.

"Highjacking the scroll-bar with JavaScript" means that the website is not really scrolling, but instead, is the JavaScript that is moving the content shown on the screen, according to the user's scroll via the mouse input.

#### 4.1.1 — Why Highjacking the scroll-bar?

Although hijacking the scroll-bar is considering a "nightmare" in user experience field, if you are like Nuno, who had used Windows computers for more than 15 years, you would also feel _extremely amazed_ when you would open a website with a _smooth scroll-bar_ behavior. Doesn't it feel _so good_ when you would scroll your mouse wheel and the page would, somehow by magic, _smoothly slide_ or _float_ to a new section? This is certainly an ignored point for those users who were lucky enough to have Macintosh computers with those elite _Magic Mouses_, which would do this "scrolling magic" by default. _(For the record: Nuno has been using a Mac computer for the last 3 years and he really knows what he's talking about.)_

With all this in mind, is time now to avoid bad performance issues because of the "smooth scroll-bar" use. To achieve this, we will show bellow how we managed our performance test check. We will run a quick performance check to see if the user's device **has at least 4 CPU-Cores** and a class is added on the `html` element.

```js
checkPerformance() {
  // Check Device's Performance
  navigator.hardwareConcurrency <= 4 && navigator.userAgent.indexOf('Win') > 0 ?
    document.documentElement.classList.add('low-performance') :
    document.documentElement.classList.add('high-performance')
}
```

After this check we can decide where to add a smooth scroll-bar behavior and where to avoid it.

**All touch screens, special phone devices, have this smooth scroll-bar feature disabled**, because of performance issues. The native scroll on touch devices is much better than any attempt made by JavaScript smooth scroll-bars.

#### 4.1.2 — Controlling the scroll with the Keyboard

If we are "highjacking" the scroll-bar, we have to be able to let the user use his usual input methods to controll the scrolling of any web page.

These input methods are:

- **Space bar**: moves the page **down**, according to the height of the screen (for instance, 1080px);
- **Shift + Space bar**: moves the page **up**, according to the height of the screen (for instance, 1080px);
- **Arrow key Down**: moves the page **down**, but just a tiny bit;
- **Arrow key Up**: moves the page **up**, but just a tiny bit;

The last two methods, as they don't really have a default value defined. In our case, we devide the screen's height by 3, to be able to move just a "tiny bit" the page down/up, but still it's a higher value than the default's behavior. Here's the code line for that: `this.scroll.target = this.scroll.target + window.innerHeight / 3;`

```js
if (this.elements.wrapper) {
  /** Check for Key Presses */
  // check if keypress is outside of any input/textarea element first
  document.body.onkeydown = (event) => {
    // scroll down
    if (
      event.target.matches('input') || event.target.matches('textarea')
        ? false
        : event.key === ' ' && !event.shiftKey
    ) {
      this.scroll.target = this.scroll.target + window.innerHeight;
    }
    // scroll up
    if (
      event.target.matches('input') || event.target.matches('textarea')
        ? false
        : event.key === ' ' && event.shiftKey
    ) {
      this.scroll.target = this.scroll.target - window.innerHeight;
    }
    if (
      event.target.matches('input') || event.target.matches('textarea')
        ? false
        : event.key === 'ArrowDown'
    ) {
      this.scroll.target = this.scroll.target + window.innerHeight / 3;
    }
    if (
      event.target.matches('input') || event.target.matches('textarea')
        ? false
        : event.key === 'ArrowUp'
    ) {
      this.scroll.target = this.scroll.target - window.innerHeight / 3;
    }
  };

  this.elements.wrapper.style[
    this.transformPrefix
  ] = `translate3d(0, -${Math.floor(this.scroll.current)}px, 0)`;
  this.elements.wrapper.style.willChange = `transform`;
}
```

Please note that we are using the CSS `translate3d()` method to force the page to be move via the GPU instead of the CPU. This is a much better benefit for the user, because the scroll is handled by the GPU, while the CPU is already busy handling all the necessary JavaScript to run the page.
