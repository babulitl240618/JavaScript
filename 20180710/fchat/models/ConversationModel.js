module.exports = {
    fields:{
        conversation_id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        created_by: {type: "uuid"},
        participants_admin: {type: "set", typeDef:"<text>", default: null},
        participants_guest: {type: "set", typeDef:"<text>", default: null},
        participants: {type: "set", typeDef:"<text>"},
        title: "text",
        single: {type: "text", default: "yes"},
        group: {type: "text", default: "no"},
        group_keyspace: {type: "text", default: "na"},
        privacy: {type: "text", default: "public"},
        archive: {type: "text", default: "no"},
        guests: {type: "text", default: "no"},
        created_at: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key:["conversation_id"],
    indexes: ["created_by", "single", "group", "archive", "guests"]
}
