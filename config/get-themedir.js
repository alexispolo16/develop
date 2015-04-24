var exec = require("execSync").exec,
	out;

process.chdir('config');

out = exec("php ./get-themedir.php");

process.chdir('..');

module.exports = JSON.parse( out.stdout );
