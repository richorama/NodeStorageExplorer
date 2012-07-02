var azure = require('azure')
var app = require('express').createServer();

var azureAccount = "two10ra";
var azureKey = "dmIMUY1mg/qPeOgGmCkO333L26cNcnUA1uMcSSOFMB3cB8LkdDkh02RaYTPLBL8qMqnqazqd6uMxI2bJJEnj0g==";



app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/tables', function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	tableService.queryTables(function(error, queryTableResult, response){
		res.json(queryTableResult);	
	});
});

app.get('/tables/:table/:query?', function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	var query = azure.TableQuery.select().from(req.params.table)
	if (req.params.query){
		query = query.where(req.params.query);
	}
	tableService.queryEntities(query, function(error, queryTableResult, response){
		res.json(queryTableResult);	
	});
});

app.get('/containers', function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.listContainers(function(errors, containers, nextMarker, response){
		res.json(containers);	
	});
});

app.get('/containers/:blob', function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.listBlobs(req.params.blob, function(errors, blobs, nextMarker, response){
		res.json(blobs);	
	});
});

app.get('/queues', function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.listQueues(function(errors, queues, nextMarker, response){
		res.json(queues);	
	});
});

app.get('/queues/:queue', function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.getQueueMetadata(req.params.queue, function(errors, queueResult, response){
		res.json(queueResult);	
	});
});

app.post('/queues/:queue',function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.createQueueIfNotExists(req.params.queue, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.log(error);
	    	res.json({result:error});
	    }
	});
});

app.listen(process.env.port || 210);