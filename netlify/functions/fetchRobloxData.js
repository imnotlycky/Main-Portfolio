exports.handler = async(event, context) => {
    const key = process.env.RobloxKey;
    const api = process.env.apiKey;

    const { placeId } = event.queryStringParameters;

    let link = `https://develop.roblox.com/v2/places/${placeId}`;

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
        
        if (response.ok) {
            let link2 = `https://thumbnails.roblox.com/v1/games/icons?universeIds=${result.universeId}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`

            const response2 = await fetch(link2, {
                method: 'GET',
                headers: {
                    'X-API-KEY': `${api}`,
                    'X-CSRF-TOKEN': `${api}`,
                    'Content-Type': "application/json",
                    'Cookie': `.ROBLOSECURITY=${key}`
                }
            })

            const result2 = await response2.json()

            return {
                statusCode: 200,
                body: JSON.stringify({ result: `${result2.data[0].imageUrl}`})
            }
        }
        else {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: `403 ${response.statusText}`})
            }
        }
    } catch(e) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: `404 ${e}`})
        }
    }
}