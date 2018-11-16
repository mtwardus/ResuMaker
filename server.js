/* Import Modules */
var express     = require('express');
var http        = require('http');
var path        = require('path');
var bodyParser  = require('body-parser');
var sleep       = require('sleep');
var fs          = require("fs");
var sqlite3     = require("sqlite3").verbose();
var PythonShell = require('python-shell');
var router      = express();
var server      = http.createServer(router);
var jsonParser  = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());
router.use(express.static(path.resolve(__dirname, 'client')));

/* Global Settings */
var python_bin = '';
const { exec } = require('child_process');
exec('which python', (err, stdout, stderr) => {
    if (err) { return; }
    python_bin = `${stdout}`.replace('\n', '');
    console.log('Python_Path: ' + python_bin);
});
var users_db = 'client/db/users.db'
console.log('users_db: ',users_db);

/* function to remove all nulls */
function check(value) {
    if (value == undefined) {
        return '';
    } else {
        return value;
    }
}

router.post('/create', urlencodedParser, function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var encrypted_password = '';
    
    console.log('In POST /create');
    fs.exists(users_db, function exists() {
        if (exists) {
            var db = new sqlite3.Database(users_db);

            /* Python Section  */               // We encrypt the password first, before sendingthen send it to the database...
            var options = {
                mode: 'text',
                pythonPath: python_bin,
                pythonOptions: ['-u'],
                scriptPath: __dirname+'/client/scripts',
                args: [password]
            };
	    console.log('options = ',options);
            PythonShell.PythonShell.run('encrypt_password.py', options, function (err, results) {
                if (err) throw err;
		console.log('Runing Python...');
		encrypted_password = results[0];
                console.log('encrypted_password: %j', encrypted_password);

		/* SQlite Section  */
		var stmt = "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";            
		db.serialize(function() {       // Placing the database function call within the PythonShell.run() function call
                    db.run(stmt, [name, email, encrypted_password], function() {  // ensures that python will be called first, then db stuff.
			console.log('Sending to Database...');
			res.json('success...');
		    });
		});
		db.close();
		/* SQlite Section  */
            });            
            /* Python Section  */
	} 
    });     
});

router.post('/login', urlencodedParser, function(req, res) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var encrypted_password = '';
    
    console.log('In POST /login');
    fs.exists(users_db, function exists() {
        if (exists) {
            var db = new sqlite3.Database(users_db);

            /* Python Section  */
            var options = {
                mode: 'text',
                pythonPath: python_bin,
                pythonOptions: ['-u'],
                scriptPath: __dirname+'/client/scripts',
                args: [password]
            };
	    console.log('options = ',options);
            PythonShell.PythonShell.run('encrypt_password.py', options, function (err, results) {
                if (err) throw err;
		console.log('Runing Python...');
		encrypted_password = results[0];
                console.log('encrypted_password: %j', encrypted_password);

		/* SQlite Section  */
		var stmt = "SELECT name, password FROM users WHERE email = ? LIMIT 1";     
		db.serialize(function() {
                    db.get(stmt, [email], function(err, row) {
			console.log('Checking password from database...');
			console.log('user submitted  : ' + password);
			console.log('user encrypted  : ' + encrypted_password);
			console.log('actual password : ' + row.password);

			if (encrypted_password === row.password) {
			    res.json(row.name);
			} else {
			    res.json('fail...');
			}
		    });
		});
		db.close();
		/* SQlite Section  */
            });            
            /* Python Section  */
	} 
    });     
});


router.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname+'/client/test.html'));
});



server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
    console.log('');
    console.log('Directory:   ' + __dirname);
    console.log("Web_Server: ", addr.address + ":" + addr.port);
});
