const webhookUrl = process.env.DISCORD_WEBHOOK_URL

exports.handler = async(event, context) => {
    if (!webhookUrl) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing Discord_Webhook_Url"})
        }
    }

    try {
        const { message } = JSON.parse(event.body)

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message content is required"})
            }
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        })

        if (!response.ok) {
            throw new Error(`Discord API Erro: ${response.statusText}`)
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Message Successfully Sent!"})
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        }
    }
}