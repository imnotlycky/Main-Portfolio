//require("dotenv").config();

const api = process.env.apiKey;

exports.handler = async(event, context) => {
    const { placeId } = event.queryStringParameters;

    let link = `https://thumbnails.roproxy.com/v1/assets?assetIds=${placeId}&returnPolicy=PlaceHolder&size=700x700&format=Png&isCircular=false`

    try { 
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
        })

        const result = await response.json()

        if (response.ok) {
            return { 
                statusCode: 200,
                body: JSON.stringify({ result: `${result.data[0].imageUrl}`})
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