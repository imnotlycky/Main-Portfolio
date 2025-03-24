const webhookUrl = process.env.DISCORD_WEBHOOK_URL

exports.handler = async(event, context) => {
    if (!webhookUrl) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing Discord_Webhook_Url"})
        }
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message content is required"})
            }
        }

        let data = JSON.parse(event.body)

        console.log(data)

        const params = {
            username: 'JobApp',
            avatar_url: '',
            embeds: [
                {
                    "type": "rich",
                    "title": data.title,
                    "description": `**Subject:**\n${data.subject}\n\n**Client Name:**\n${data.name}\n\n**Client Email:**\n${data.email}\n\n**Message:**\n${data.message}`,
                    "color": data.color,
                    "fields": [
                        {
                            "name": "Job Id",
                            "value": data.value,
                            "inline": false
                        }
                    ],
                    "attachments": [],
                    "webhook_id": "1353794416988655719",
                    "components": []
                }
            ]
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
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