const fs = require('fs');
try {
    const data = fs.readFileSync('p2-s3.json', 'utf8');
    JSON.parse(data);
    console.log('JSON is valid');
} catch (e) {
    console.error(e.message);
}
