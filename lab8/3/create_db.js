const fs = require('fs');
const conn = require('./database');

const createTableSql = `
CREATE TABLE IF NOT EXISTS albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    song VARCHAR(255),
    artist VARCHAR(255),
    album VARCHAR(255),
    year INT,
    genre VARCHAR(100),
    album_cover TEXT
)`;

conn.query(createTableSql, (err) => {
    if (err) {
        console.error("Database Error:", err.message);
        return;
    }
    console.log("Table 'albums' is ready.");

    try {
        const data = fs.readFileSync('albums.csv', 'utf8');
        const lines = data.split('\n');
        
        console.log("Starting data import...");

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === "") continue;

            const parts = line.split(',');
            
            const song = parts[0];
            const artist = parts[1];
            
            const album_cover = parts[parts.length - 1];
            const genre = parts[parts.length - 2];
            const year = parts[parts.length - 3];
            
            const album = parts.slice(2, parts.length - 3).join(',');

            const insertSql = "INSERT INTO albums (song, artist, album, year, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)";
            
            conn.query(insertSql, [song, artist, album, year, genre, album_cover], (err) => {
                if (err) {
                    console.error(`Row ${i} Error:`, err.message);
                }
            });
        }
        
        console.log("Success: Data import triggered. Please wait a few seconds for MySQL to finish.");
        
        setTimeout(() => {
            console.log("Done! You can now run 'node index.js'");
            process.exit();
        }, 2000);

    } catch (err) {
        console.error("File Error: Could not read 'albums.csv'.", err.message);
    }
});