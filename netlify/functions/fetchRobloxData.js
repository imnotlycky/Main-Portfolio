exports.handler = async(event, context) => {
    const key = process.env.RobloxKey;
    const api = process.env.apiKey;
    const secret = process.env.secretKey;

    const { placeId, secretKey } = event.queryStringParameters;

    let link = `https://develop.roblox.com/v2/places/${placeId}`;

    if (secretKey != secret) {
        return {
            statusCode: 401,
            body: JSON.stringify({ result: "Invalid Key"})
        }
    }

    try { 
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'X-API-KEY': `${api}`,
                'X-CSRF-TOKEN': `${api}`,
                'Content-Type': "application/json",
                'Cookie': `.ROBLOSECURITY=${key}`
            }
        })

        const result = await response.json()
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch(e) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: `${e}`})
        }
    }
}