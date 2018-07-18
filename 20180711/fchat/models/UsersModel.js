module.exports = {
    fields:{
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        createdat: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        },
        email: "text",
        fullname: "text",
        dept: "text",
        designation: "text",
        gcm_id: "text",
        img: "text",
        is_active: {
          type: "int",
          default: 1
        },
        is_delete: {
          type: "int",
          default: 0
        },
        is_busy: {
          type: "int",
          default: 0
        },
        password: "text"
    },
    key:["id"],
    indexes: ["fullname", "gcm_id"]
}
