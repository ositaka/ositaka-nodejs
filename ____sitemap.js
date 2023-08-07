require('dotenv').config();

const Prismic = require('@prismicio/client');


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

    if (doc.uid !== undefined) {
        if (doc.type === 'home') {
            doc.alternate_languages.map((item) => {
                return item
            })
            return `/${lang}/`;
        }

        if (doc.type === 'the_media') {
            return `/${lang}/${doc.uid}`;
        }

        if (doc.type === 'media_page') {
            return (doc.data.parent_page.id ? `/${lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${lang}/${doc.uid}/`)
        }

        if (doc.type === 'approach') {
            return `/${lang}/${doc.uid}/`;
        }

        if (doc.type === 'work') {
            return `/${lang}/${doc.uid}/`;
        }

        if (doc.type === 'work_page') {
            return (doc.data.parent_page.id ? `/${lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${lang}/${doc.uid}/`)
        }

        if (doc.type === 'the_creators') {
            return `/${lang}/${doc.uid}/`;
        }

        if (doc.type === 'contacts') {
            return `/${lang}/${doc.uid}/`;
        }

        if (doc.type === 'price_packs') {
            return `/${lang}/${doc.uid}/`;
        }

        if (doc.type === 'pack') {
            return (doc.data.parent_page.id ? `/${lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${lang}/${doc.uid}/`)
        }

    }
};


const run = async (req) => {
    // 1. Init Prismic
    const api = await initApi(req);

    // 2. Query content in Prismic
    const { results: docs } = await api.query("", { lang: "en-gb", pageSize: 100 });

    // 3. Resolving link
    const urls = docs.map(handleLinkResolver)

    // Logging
    console.log(urls)

}

run();