const http = require("http");
const fs = require("fs");
const path = require("path");

const pathBase = "./week05/templates/";

const fetchTemplateHandler = (fileName, params, res) => {
  const filePath = path.resolve(pathBase + fileName + ".txt");

  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      serverErrorHandler(res);
      return;
    }

    const resultData = Object.keys(params).reduce((acc, paramKey) => {
    //   return acc.replaceAll(`{{${paramKey}}}`, params[paramKey] || "");
      const paramRegEx = new RegExp(`{{${paramKey}}}`, "g");
      return acc.replace(paramRegEx, params[paramKey] || "");
    }, data);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(resultData);
    res.end();
  });
};

const extractUrlAndParams = (url,req) => {
  if (!url) {
    return { path: "", queryParams: {} };
  }

  const splitLogicRes = url.split("?");
  const path = splitLogicRes[0];
  let body = "";
  let queryParams = {};
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    queryParams = JSON.parse(body);
  }).then((path, queryParams) => {
    return { path, queryParams };
  });
  

};

const handlePostRequest = (req, res) => {
  const { path, queryParams } = extractUrlAndParams(req.url, req);

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
  POST: handlePostRequest,
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
