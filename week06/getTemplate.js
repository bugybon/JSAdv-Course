const http = require("http");
const fs = require("fs");
const path = require("path");
const Transform = require('stream').Transform;

const pathBase = "./week06/templates/";

const fetchTemplateHandler = (fileName, params, res) => {
  const filePath = path.resolve(pathBase + fileName + ".txt");
  const readableStream = fs.createReadStream(
    filePath,
    {
      encoding: 'utf-8',
      //highWaterMark: 5
    }
  );

  const transform = new Transform({
    encoding: 'utf-8',
    transform: (chunk, _, done) => {
      const chunkString = chunk.toString();
      const resultData = Object.keys(params).reduce((acc, paramKey) => {
      //   return acc.replaceAll(`{{${paramKey}}}`, params[paramKey] || "");
        const paramRegEx = new RegExp(`{{${paramKey}}}`, "g");
        return acc.replace(paramRegEx, params[paramKey] || "");
      }, chunkString);
      done(null, resultData);
    }
  });
  
  transform.buffer = '';
  readableStream
    .pipe(transform)
    .pipe(res);
  // fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
  //   if (err) {
  //     serverErrorHandler(res);
  //     return;
  //   }

  //   const resultData = Object.keys(params).reduce((acc, paramKey) => {
  //   //   return acc.replaceAll(`{{${paramKey}}}`, params[paramKey] || "");
  //     const paramRegEx = new RegExp(`{{${paramKey}}}`, "g");
  //     return acc.replace(paramRegEx, params[paramKey] || "");
  //   }, data);

  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write(resultData);
  //   res.end();
  // });
};

const extractUrlAndParams = (url) => {
  if (!url) {
    return { path: "", queryParams: {} };
  }

  const splitLogicRes = url.split("?");
  const path = splitLogicRes[0];
  const queryParamsString = splitLogicRes[1] || "";
  const queryParams = queryParamsString.split("&").reduce((acc, current) => {
    const splitRes = current.split("=");
    const key = splitRes[0];
    const value = splitRes[1];
    if (!key || !value) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  return { path, queryParams };
};

const handleGetRequest = (req, res) => {
  const { path, queryParams } = extractUrlAndParams(req.url);

  const isFetchTemplateRequest = path.includes("/fetch-template/");
  if (isFetchTemplateRequest) {
    const fileName = path.split("/fetch-template/")[1];
    fetchTemplateHandler(fileName, queryParams, res);
    return;
  }
  notFoundHandler(req, res);
};

const notFoundHandler = (req, res) => {
  res.writeHead(404);
  res.write("Not found!");
  res.end();
};
const serverErrorHandler = (res) => {
  res.writeHead(500);
  res.write("Server error!");
  res.end();
};

const methodHandlers = {
  GET: handleGetRequest,
};

const server = http.createServer((req, res) => {
  const requestMethod = req.method.toUpperCase();

  const handler = methodHandlers[requestMethod] || notFoundHandler;
  handler(req, res);
});

const port = 8081;
server.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server is listening on: http://localhost:" + port);
});
