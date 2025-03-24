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


            //let link2 = `https://thumbnails.roproxy.com/v1/assets?assetIds=${universeId}&returnPolicy=PlaceHolder&size=700x700&format=Png&isCircular=false`
            /*let universeId = result.universeId
            let link2 = `https://thumbnails.roproxy.com/v1/assets?assetIds=${universeId}&returnPolicy=PlaceHolder&size=700x700&format=Png&isCircular=false`;

            const response2 = await fetch(link2, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                }
            })

            const result2 = await response2.json()

            console.log(result2)

            if (response2.ok) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ result: `${result2.data[0].imageUrl}`})
                }
            }
            else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: `${response2.statusText}`})
                }
            }*/
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