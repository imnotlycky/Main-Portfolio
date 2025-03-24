exports.handler = async(event, context) => {
    try {
        const { placeId } = event.queryStringParameters;

        if (!placeId) {
            return {statusCode: 400, body: JSON.stringify({error: "Missing placeId"})}
        }

        const placeDetailsUrl = `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`;
        const placeResponse = await fetch(placeDetailsUrl)
        const placeData = await placeResponse.json();

        if (!placeData || !placeData.data || placeData.data.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: "Place not found" }) };
        }

        const universeId = placeData.data[0].universeId;

        const thumbnailUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`;
        const thumbnailResponse = await fetch(thumbnailUrl);
        const thumbnailData = await thumbnailResponse.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                placeData: placeData.data[0],
                thumbnailData: thumbnailData.data[0] || null,
            }),
            headers: { "Content-Type": "application/json" }
        };
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
    }
}