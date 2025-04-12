const ghpages = require('gh-pages');

ghpages.publish('build', {
    repo: `https://${process.env.GH_TOKEN}@github.com/30Leena/WeatherDevops.git`,
    silent: true
}, function (err) {
    if (err) {
        console.error('Deploy failed:', err);
        process.exit(1);
    } else {
        console.log('Deploy successful!');
    }
});