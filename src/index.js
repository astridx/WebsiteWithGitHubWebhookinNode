import 'dotenv/config';
import http from 'http';
import crypto from 'crypto';
import { exec } from 'child_process';
const SECRET = process.env.MY_SECRET;
http
  .createServer((req, res) => {
    req.on('data', chunk => {
      const signature = `sha1=${crypto
        .createHmac('sha1', SECRET)
        .update(chunk)
        .digest('hex')}`;
      const isAllowed = req.headers['x-hub-signature'] === signature;
      const body = JSON.parse(chunk);
      const isMaster = body?.ref === 'refs/heads/master';
      if (isAllowed && isMaster) {
        // do something
      }
    });
    res.end();
  })
  .listen(8080);
