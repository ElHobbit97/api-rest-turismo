const app = require('./server');
require('./database');

async function main(){

    //Start the server
    await app.listen(app.listen(app.get('port')));
    console.log(`Server on port: ${app.get('port')}`);

}

main();