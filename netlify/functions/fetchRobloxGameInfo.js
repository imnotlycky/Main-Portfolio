//require("dotenv").config();

const api = process.env.apiKey;

exports.handler = async(event, context) => {
    const { placeId } = event.queryStringParameters;

    let link = `https://apis.roproxy.com/universes/v1/places/${placeId}/universe`

    try { 
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
        })

        const result = await response.json()

        if (response.ok) {
            let link2 = `https://games.roproxy.com/v1/games?universeIds=${result.universeId}`

            const response2 = await fetch(link2, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })

            const result2 = await response2.json()

            if (response2.ok) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ result: `${result2.data[0].visits}`})
                }
            }
            else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: `${response2.statusText}`})
                }
            }
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: `${response.statusText}`})
            }
        }
    } catch(e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `${e.message}`})
        }
    }
}