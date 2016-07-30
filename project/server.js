var http  = require('http');
var url   = require('url');
var fs    = require('fs');
var qs = require('querystring');

var httpServer;
var wsServer;
var port = 8080;

function contentType(path) {
  if (path.match('.js$')) {
    return 'text/javascript';
  } else if (path.match('.css$')) {
    return 'text/css';
  } else if (path.match('.manifest$')) {
    return 'text/cache-manifest';
  } else {
    return 'text/html';
  }
}

var processWorkOrder = function(request) {
	var body = "";
	
	request.on('data', function (data) {
		body += data.toString();
	});
	
	request.on('end', function() {
		var workorder = qs.parse(body);
		console.log("------------Start of work order------------");
		console.log("nameOfPerson: " + workorder.nameOfPerson);
		console.log("workDesc: " + workorder.workDesc);
		console.log("dateOfCreation: " + workorder.dateOfCreation);
		console.log("severity: " + workorder.severity);
		console.log("fromlocation: " + workorder.fromlocation);
		console.log("------------End of work order------------");
	});
}


httpServer = http.createServer(function(request, response) {
	var path = url.parse(request.url).pathname;
	
    if (path === '/') {
      path = '/index.html';
    }
	
	if(path === "/workorder") {
		processWorkOrder(request);
		path = '/index.html';
	}
	
	//console.log('serving ' + path);
  	fs.readFile(__dirname + path, function(err, data) {
    	if (err) {
      	  	response.writeHead(404);
      		response.end();
    	} else {
			response.writeHead(200, {'Content-Type': contentType(path)});
      		response.write(data, 'utf8');
      		response.end();
    }
  });
});

httpServer.listen(port);
console.log('Server is listening to http://localhost/ on port 8080…');