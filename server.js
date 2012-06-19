var azure = require('azure')
var app = require('express').createServer();

var azureAccount = "two10ra";
var azureKey = "dmIMUY1mg/qPeOgGmCkO333L26cNcnUA1uMcSSOFMB3cB8LkdDkh02RaYTPLBL8qMqnqazqd6uMxI2bJJEnj0g==";



app.get('/', function(req, res){
	res.sendfile('index.html');
});


app.get('/hello', function(req, res){
	res.json({greeting : 'hello world'});
});

app.get('/tables', function(req, res){
	var tableService = azure.createTableService(azureAccount, azureKey);
	tableService.queryTables(function(error, queryTableResult, response){
		res.json(queryTableResult);	
	});
});

app.get('/tables/:table', function(req, res){
	var tableService = azure.createTableService(azureAccount, azureKey);
	var query = azure.TableQuery.select().from(req.params.table)
	tableService.queryEntities(query, function(error, queryTableResult, response){
		res.json(queryTableResult);	
	});
});


app.listen(3000);