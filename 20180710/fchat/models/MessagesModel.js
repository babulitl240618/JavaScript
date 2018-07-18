module.exports = {
    fields:{
        msg_id: {
            type: "timeuuid",
            default: {"$db_function": "now()"}
        },
        conversation_id: {type: "uuid"},
        sender: {type: "uuid"},
        sender_name: "text",
        sender_img: "text",
        msg_body: "text",
        has_flagged: { type: "set", typeDef: "<text>"},
        msg_type: { type: "text", default: "text" },
        msg_status: { type: "int", default: 1 },
        created_at: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        },
        has_delete: { type: "set", typeDef: "<text>" },
        has_emoji: { type: "map", typeDef: "<text, int>", default: {"grinning": 0,
                                                                  "joy": 0, 
                                                                  "open_mouth": 0, 
                                                                  "disappointed_relieved": 0, 
                                                                  "rage": 0, 
                                                                  "thumbsup": 0, 
                                                                  "thumbsdown": 0, 
                                                                  "heart": 0}},
        has_tag_text: { type: "set", typeDef: "<text>" }
    },
    key:["msg_id"],
    indexes: ["conversation_id", "sender", "msg_status"]
}