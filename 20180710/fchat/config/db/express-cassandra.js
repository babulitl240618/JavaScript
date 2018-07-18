var cassandraDriver = require('cassandra-driver');
var models = require('express-cassandra');
var path = require('path');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory(path.join( __dirname, './../../models')).bind(
    {
        clientOptions: {
            contactPoints: [process.env.CASSANDRA_URL],
            protocolOptions: { port: process.env.CASSANDRA_PORT },
            keyspace: process.env.DB,
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err) throw err;

        // You'll now have a `person` table in cassandra created against the model
        // schema you've defined earlier and you can now access the model instance
        // in `models.instance.Person` object containing supported orm operations.
    }
);

module.exports = {models};
