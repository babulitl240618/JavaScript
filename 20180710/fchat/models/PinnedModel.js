module.exports = {
    fields:{
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        user_id: {type: "uuid"},
        serial_number: {
            type: "int",
            default: 1
          },
        block_id: {type: "uuid"}
    },
    key:["id"],
    indexes: ["user_id", "serial_number","block_id"]
}
