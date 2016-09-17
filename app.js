var express 	= require('express');
	app			= express();
	mongojs		= require('mongojs');
	db			= mongojs('contact',['contactlist']);
	bodyParser  = require('body-parser');

//inisialisasi app
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.put('/contact/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.update(
		{_id:mongojs.ObjectId(id)},
			{
				$set:{
					name:req.body.name,
					email:req.body.email,
					number:req.body.number
				}
			},
		function(err,record){
			if (err) throw err;
			res.json(record);
	})
})

app.get('/contact/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,record){
		if(err) throw err;
		res.json(record);
	})
})

app.delete('/contact/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,record){
		if(err) throw err;
		res.json(record);
	});
})

app.post('/contact',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,record){
		if(err) throw err;
		res.json(record);
	});
});

app.get('/contact',function(req,res){
	//console.log('I received a GET request');

	db.contactlist.find(function(err,record){
		if(err) throw err;
		res.json(record);
	});
	/*persons =
			[
				{
					name : 'Harmain',
					email : 'ahmad.hamain@ymail.com',
					number : '08766666666'
				},
				{
					name : 'Ahmad Harmain',
					email : 'mail.ahmad.hamain@gmail.com',
					number : '08755555555'			
				},
			];
	res.json(persons);
	*/
})
/*app.get('/',function(req,res){
	res.send('Hello mas bro');
});*/


//create sever
app.listen(2016,function(){
	console.log('Server is running on port 2016');
});

/* 
    inisialisasi pembuatan server dan penentuan port.
    dalam kasus ini port diset 2016 jika terpakai maka sistem otomatis 
    akan menggenerate port yang baru atau yg tidak terpakai di sistem

	express().set('port',process.env.PORT || 2070);
	var server = express().listen(express().get('port'),function(){
	    console.log("Server is running on "+server.address().port);
	});
*/
