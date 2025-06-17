const fs = require('fs');
const path = require('path');
const filepath = path.resolve('.env');

function extercDotenv() {
  const plainData = fs.readFileSync(filepath, 'utf-8');
  const lines = plainData.split(/\r?\n/);

  for (const line of lines) {
    // Skip empty or comment lines
    if (!line || line.startsWith("#")) continue;

    const [rawKey, ...rest] = line.split("="); // handle '=' in value

    if (!rawKey || rest.length === 0) continue;

    const key = rawKey.trim();
    let value = rest.join("=").trim();

    // Remove quotes if present
    value = value.replace(/^["']|["']$/g, "");

    // Don't override existing env
    if (!(key in process.env)) {

      process.env[key] = value;
    }else{

      console.log( "Duplicate key " + key + " use first one");
    }
  }
}
