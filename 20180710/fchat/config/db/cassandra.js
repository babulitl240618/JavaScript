const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: [process.env.CASSANDRA_URL] });
client.connect((err, result) =>{
  if(err){
    throw new Error;
  }
  console.log('cassandra connected');
});

module.exports = {client};
