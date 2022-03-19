module.exports = {
    names: ["hello", "안녕"],
    description: "디지봇에게 인사를 해요!",
    args: "",
    execute: async (client, message, args) => {
        message.channel.send("안녀엉!")
    }
}
