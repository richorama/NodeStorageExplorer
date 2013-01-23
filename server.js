var azure = require('azure')
var app = require('express')();

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/tables', function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	tableService.queryTables(function(error, queryTableResult, response){
		if (error){
			console.error(error);
		}		
		res.json(queryTableResult);	
	});
});

app.post('/tables/:table',function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	tableService.createTableIfNotExists(req.params.table, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.get('/tables/:table/:query?', function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	var query = azure.TableQuery.select().from(req.params.table)
	if (req.params.query){
		query = query.where(req.params.query);
	}
	tableService.queryEntities(query, function(error, queryTableResult, response){
		if (error){
			console.error(error);
		}		
		res.json(queryTableResult);	
	});
});

app.get('/containers', function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.listContainers(function(error, containers, nextMarker, response){
		if (error){
			console.error(error);
		}		
		res.json(containers);	
	});
});

app.get('/containers/:blob', function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.listBlobs(req.params.blob, function(error, blobs, nextMarker, response){
		if (error){
			console.error(error);
		}		
		res.json(blobs);	
	});
});

app.get('/queues', function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.listQueues(function(error, queues, nextMarker, response){
		if (error){
			console.error(error);
		}
		res.json(queues);	
	});
});

app.get('/queues/:queue', function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.getQueueMetadata(req.params.queue, function(error, queueResult, response){
		if (error){
			console.error(error);
		}
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
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.delete('/queues/:queue',function(req, res){
	var queueService = azure.createQueueService(req.headers.account, req.headers.key);
	queueService.deleteQueue(req.params.queue, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.delete('/entities/:table/:pk/:rk',function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	tableService.deleteEntity(req.params.table, {PartitionKey: req.params.pk, RowKey: req.params.rk}, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.delete('/tables/:table',function(req, res){
	var tableService = azure.createTableService(req.headers.account, req.headers.key);
	tableService.deleteTable(req.params.table, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.delete('/containers/:container',function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.deleteContainer(req.params.container, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.post('/containers/:container',function(req, res){
	var blobService = azure.createBlobService(req.headers.account, req.headers.key);
	blobService.createContainerIfNotExists(req.params.container, function(error){
	    if(!error){
	        res.json({result:"ok"});
	    }
	    else{
	    	console.error(error);
	    	res.json({result:error});
	    }
	});
});

app.listen(process.env.port || 210);