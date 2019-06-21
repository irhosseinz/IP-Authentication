var SECRET='6atQcnTqZzJVyEpu5eHHaGxLF'//change this to something random
	,PORT=1034;//port to be used 

var http = require('https'),
	express = require('express');

var RULES_FILE='/etc/csf/csf.allow';
function getRules(json){
	var rules="#USER"+json.user+"#\n"+json.ip+"\n";
	rules+="#END"
	return rules;
}

console.log("SERVER STARTED AT:"+(new Date()));

var app = express();

app.post('/api/'+SECRET+'/:method', function(req, res) {
	var body = [];
	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		try{
			body = Buffer.concat(body).toString();
			var json=JSON.parse(body);
			
			switch(req.params.method){
				case "set_ip":
					var rules=getRules(json);
					var fs = require('fs');
					fs.readFile(RULES_FILE, 'utf8', function(err, data) { 
						if(data.indexOf('#USER'+json.user+'#')>0){
							data=data.replace(new RegExp("#USER"+json.user+"#[^#]+#END"),rules);
						}else{
							data+="\n"+rules;
						}
						fs.writeFile(RULES_FILE, data,function(){
							var exec = require('child_process').exec;
							exec('/usr/sbin/csf -r',function(err, stdout, stderr) {
								if (err) {
									console.log('error on reset csf:'+err+":"+stderr);
									return;
								}
								console.log("ip "+json.ip+" for user "+json.user+" has been set:\n"+rules+"\n\n");
							});
						});
						res.end(JSON.stringify({ok:true}));
					});
					break;
				default:
					break;
			}
		}catch(e){
			console.log(e);
			res.end(JSON.stringify({ok:false,error_code:2,error:"An error Occured!"}));
		}
	});
});



app.listen(PORT);

