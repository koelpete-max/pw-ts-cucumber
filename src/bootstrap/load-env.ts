import * as path from 'node:path';
import * as dotenv from 'dotenv';

// ENV comes from your npm script: cross-env ENV=prod ...
const envName = process.env.ENV || 'dev';

// Example path you mentioned earlier:
const envPath = path.resolve(process.cwd(), `rc/helper/env/.env.${envName}`);

dotenv.config({ path: envPath });

// Optional debug:
console.log(`[env] loaded ${envPath}`);
console.log(`[env] BASEURL = ${process.env.BASEURL ?? '(undefined)'}`);