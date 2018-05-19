import fs from 'fs';

let load = (name, req, res, next) => {
  fs.readFile('./.dist/' + name, 'utf-8', function (err, data) {
    if (err) {
      res.send(100, {
        msg: "There was an error in handling your request"
      });
      err.next();
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(res.statusCode);
      res.write(data);
      res.end();
      next();
    }
  });
}

module.exports.load = load;
