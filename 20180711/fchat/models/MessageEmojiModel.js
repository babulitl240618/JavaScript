module.exports = {
    fields:{
        msg_id: { type: "timeuuid" },
        user_id: {type: "uuid"},
        user_fullname: "text",
        emoji_name: "text",
        created_at: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key:["msg_id", "user_id"],
    indexes: ["emoji_name"]
}