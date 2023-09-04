require('dotenv').config();

const logger = require('morgan');
const express = require('express');
const cookieSession = require('cookie-session');
// const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

// const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());
// app.use(cookieParser());
// app.use(errorHandler());
app.use(express.static(path.join(__dirname, 'public')));

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');
const UAParser = require('ua-parser-js');

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  });
};

const langs = Object.freeze({
  'en': 'en-gb',
  'pt': 'pt-pt'
})

const langsReversed = Object.freeze({ // Prismic
  'en-gb': 'en',
  'pt-pt': 'pt'
})

const handleLinkResolver = (doc) => {
  const lang = langsReversed[doc.lang]

  if (
    doc.type === 'home' ||
    doc.type === '404'
  ) {
    return `/${lang}/`;
  }

  if (
    doc.type === 'about' ||
    doc.type === 'archives' ||
    doc.type === 'contacts' ||
    doc.type === 'services' ||
    doc.type === 'work'
  ) {
    return `/${lang}/${doc.uid}`;
  }

  if (
    doc.type === 'work_page'
  ) {
    return (doc.data.parent_page.id ? `/${lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${lang}/${doc.uid}/`)
  }

  return `/${lang}/`;
};

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 15 * 60 * 1000, // 15 minutes
}))

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
      rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
      });
      return parsedCookies;
    };

    let connection = getAppCookies(req, res)['connection'];

    res.locals.connection = connection;

    console.log("connect on the server", connection)
  } else {
    res.locals.connection = req.body.connection;
  }
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const handleRequest = async (api, lang, req) => {
  const intro = await api.getSingle('intro', { lang });
  const footer = await api.getSingle('footer', { lang });
  const navigation = await api.getSingle('navigation', { lang });
  const preloader = await api.getSingle('preloader', { lang });

  const assets = [];

  intro.data.gallery.forEach((item) => {
    assets.push(item.image.url);
  });

  return {
    assets,
    intro,
    footer,
    navigation,
    preloader
  };
};

app.get('/offline', async (req, res) => {
  res.sendFile('offline.html', { root: path.join(__dirname) });
})

app.get('/', async (req, res) => {
  res.redirect('/en/')
})


app.get('/:lang/', async (req, res) => {
  let lang = langs[req.params.lang];

  if (!lang) {
    console.log("ERROR ON LANG - 1 _404")
  }

  const api = await initApi(req);
  const defaults = await handleRequest(api, lang);

  const home = await api.getSingle('home', { lang });

  if (home) {
    altLangs = home.alternate_languages
    colors = home.data.colors[0]
    meta = home.data.seo[0]

    const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })

    lang = langsReversed[lang]

    res.render('pages/home', {
      ...defaults,
      altLangs,
      colors,
      home,
      globals,
      lang,
      meta,
    });
  }

  else {
    console.log("_404")
    // res.status(404).render("./error_handlers/_404");
  }

});

app.get('/:lang/:uid/', async (req, res) => {
  let lang = langs[req.params.lang];

  if (!lang) {
    console.log("ERROR ON LANG - 2 _404")
    return
  }

  const uid = req.params.uid;
  const api = await initApi(req);
  const defaults = await handleRequest(api, lang);

  const about = await api.getByUID('about', uid, { lang });
  const archives = await api.getByUID('archives', uid, { lang });
  const contacts = await api.getByUID('contacts', uid, { lang });
  const services = await api.getByUID('services', uid, { lang });
  const work = await api.getByUID('work', uid, { lang });

  lang = langsReversed[lang]

  if (about) {
    altLangs = about.alternate_languages
    colors = about.data.colors[0]
    meta = about.data.seo[0]

    const { results: awards } = await api.query(Prismic.Predicates.at('document.type', 'awards'), { lang: langs[req.params.lang] })

    console.log(about.data.about_intro[0], '----------- about')
    res.render('pages/about', {
      ...defaults,
      about,
      altLangs,
      awards,
      colors,
      lang,
      meta,
    });
  }

  else if (archives) {
    altLangs = archives.alternate_languages
    colors = archives.data.colors[0]
    meta = archives.data.seo[0]

    console.log(colors)

    res.render('pages/archives', {
      ...defaults,
      archives,
      altLangs,
      colors,
      lang,
      meta,
    });
  }

  else if (contacts) {
    altLangs = contacts.alternate_languages
    colors = contacts.data.colors[0]
    meta = contacts.data.seo[0]

    const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang: langs[req.params.lang] })

    res.render('pages/contacts', {
      ...defaults,
      altLangs,
      colors,
      contacts,
      globals,
      lang,
      meta,
    });
  }

  else if (services) {
    altLangs = services.alternate_languages
    colors = services.data.colors[0]
    meta = services.data.seo[0]

    res.render('pages/services', {
      ...defaults,
      altLangs,
      colors,
      lang,
      meta,
      services,
    });
  }

  else if (work) {
    altLangs = work.alternate_languages
    colors = work.data.colors[0]
    meta = work.data.seo[0]
    let publishedItems = work.data.works.filter(item => item.published !== false)

    res.render('pages/work', {
      ...defaults,
      altLangs,
      colors,
      lang,
      meta,
      publishedItems,
      work,
    });
  }

  else {
    console.log("_404")
    // res.status(404).render("./error_handlers/_404");
  }
});


app.get('/:lang/:parent_page/:uid/', async (req, res) => {
  let lang = langs[req.params.lang];

  if (!lang) {
    console.log("ERROR ON LANG - 3 _404")
    return
  }

  const api = await initApi(req);
  const _404 = await api.getSingle('404', { lang });
  const defaults = await handleRequest(api, lang);
  const uid = req.params.uid;
  const work_page = await api.getByUID('work_page', uid, { lang });

  lang = langsReversed[lang]

  if (work_page) {
    altLangs = work_page.alternate_languages
    colors = work_page.data.colors[0]
    meta = work_page.data.seo[0]

    const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang: langs[req.params.lang] })
    const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'work'), { lang: "en-gb" })
    const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'work'), { lang: "pt-pt" })

    // Get Next Project link
    const { results: projects } = await api.query(Prismic.Predicates.at('document.type', 'work'), { lang: langs[req.params.lang] })
    const allProjects = projects[0].data.works.filter(item => item.published !== false)
    const currentProject = work_page.uid;

    let matchedItem
    let matchedItemIndex
    let nextProject

    allProjects.map((item, index) => {
      if (item.work_link.uid === currentProject) {
        matchedItem = item
        matchedItemIndex = index
      } else false
    })

    nextProject = allProjects[matchedItemIndex + 1] || allProjects[0]
    nextProject = nextProject.work_link.uid

    res.render('pages/work_page', {
      ...defaults,
      _404,
      altLangs,
      colors,
      globals,
      lang,
      meta,
      nextProject,
      parent_en,
      parent_pt,
      work_page,
    });
  }

  else {
    console.log("_404")
    res.status(404).render("pages/_404");
  }
});


/***
 * Forms
 * & E-Mails
 */
app.post('/message-sent', (req, res) => {
  const output = `
    <div style="font-family: sans-serif">
      <p>You have a new contact request</p>
      <hr />
      <h3>Project services</h3>
      <p>${req.body.services}</p>
      <hr />
      <h3>Project budget €</h3>
      <p>${req.body.budget}</p>
      <hr />
      <h3>Project Delivery Date</h3>
      <p>${req.body.delivery}</p>
      <hr />
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: <a href="mailto:${req.body.email}">${req.body.email}</a></li>
        <li>Phone: <a href="tel:${req.body.phone}">${req.body.phone}<a/></li>
      </ul>
      <hr />
      <h3>Message</h3>
      <p>${req.body.message.replace(/\n/g, '<br>')}</p>
      <hr />
    </div>
  `;

  // console.log("form sent")


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDINBLUE_USER, // generated ethereal user
      pass: process.env.SENDINBLUE_PASS  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"OSITAKA / Nuno Marques" <info@ositaka.com>', // sender address
    to: `${req.body.email}, info@ositaka.com`, // list of receivers
    bcc: 'ositaka@gmail.com', // list of hidden receivers
    subject: 'New Contact Message', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('pages/email_sent', {
      msg: 'Email has been sent',
      output
    });
  });

});

app.listen(port, () => {
  var ip = require("ip").address();

  console.log(`
  --------------------------------------
  App listening at http://localhost:${port}
  --------------------------------------
  Local IP: http://${ip}:${port}
  --------------------------------------
  `);
});