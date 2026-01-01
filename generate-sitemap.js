require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Prismic = require('@prismicio/client');

const initApi = (req) => {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req
    });
};

const handleLinkResolver = (doc) => {
    // Home page (single document)
    if (doc.type === 'home') {
        return '/';
    }

    // About page
    if (doc.type === 'about') {
        return '/about/';
    }

    // Work/Projects listing page
    if (doc.type === 'work') {
        return '/projects/';
    }

    // Individual project pages (nested under projects)
    if (doc.type === 'work_page') {
        if (doc.data.parent_page && doc.data.parent_page.uid) {
            return `/projects/${doc.uid}/`;
        }
        return `/projects/${doc.uid}/`;
    }

    // Archives page
    if (doc.type === 'archives') {
        return '/archives/';
    }

    // Contact page
    if (doc.type === 'contacts') {
        return '/contact/';
    }

    // Services page
    if (doc.type === 'services') {
        return '/services/';
    }

    // Skip navigation, footer, preloader, intro, 404 and other non-page documents
    if (['navigation', 'footer', 'preloader', 'intro', '404', 'globals', 'awards'].includes(doc.type)) {
        return null;
    }

    // For any other document type with a UID
    if (doc.uid) {
        return `/${doc.uid}/`;
    }

    return null;
};

const getPriority = (doc) => {
    // Home page has highest priority
    if (doc.type === 'home') return '1.00';

    // Main navigation pages
    if (['about', 'work', 'contacts', 'services'].includes(doc.type)) return '0.90';

    // Secondary pages
    if (doc.type === 'archives') return '0.80';

    // Individual project pages
    if (doc.type === 'work_page') return '0.70';

    // Default for other pages
    return '0.60';
};

const generateSitemap = (docs) => {
    const domain = 'https://ositaka.com';
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Generate URL entries for each document
    docs.forEach(doc => {
        const url = handleLinkResolver(doc);
        if (url) {
            const lastmod = doc.last_publication_date
                ? doc.last_publication_date.split('T')[0]
                : today;

            xml += `
    <url>
        <loc>${domain}${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${getPriority(doc)}</priority>
    </url>`;
        }
    });

    xml += `
</urlset>`;

    return xml;
};

const run = async () => {
    try {
        console.log('🚀 Starting sitemap generation...');

        // 1. Initialize Prismic API
        const api = await initApi();

        // 2. Query all content from Prismic (English only)
        console.log('📚 Fetching content from Prismic...');
        const { results: docs } = await api.query("", {
            lang: "en-gb",
            pageSize: 100
        });

        console.log(`📄 Found ${docs.length} documents in Prismic`);

        // 3. Generate sitemap XML
        const sitemapXml = generateSitemap(docs);

        // 4. Count valid URLs
        const validUrls = docs.filter(doc => handleLinkResolver(doc)).length;
        console.log(`🔗 Generated ${validUrls} valid URLs for sitemap`);

        // 5. Write to shared folder
        const sharedSitemapPath = path.join(__dirname, 'shared', 'sitemap.xml');
        fs.writeFileSync(sharedSitemapPath, sitemapXml);
        console.log(`✅ Sitemap saved to: ${sharedSitemapPath}`);

        // 6. Also write to public folder if it exists
        const publicDir = path.join(__dirname, 'public');
        if (fs.existsSync(publicDir)) {
            const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
            fs.writeFileSync(publicSitemapPath, sitemapXml);
            console.log(`✅ Also copied to: ${publicSitemapPath}`);
        }

        // 7. Log document types for debugging
        const docTypes = [...new Set(docs.map(doc => doc.type))];
        console.log('\n📊 Document types found:', docTypes);

        console.log('\n✨ Sitemap generation completed successfully!');

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
};

// Run the sitemap generator
run();