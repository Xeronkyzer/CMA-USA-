const fs = require('fs');
try {
    const content = fs.readFileSync('src/data/topics/p1-s3.json', 'utf8');
    JSON.parse(content);
    console.log("JSON is valid");
} catch (e) {
    console.error("JSON Error:", e.message);
    // console.error("Position:", e.at); // if available
}
