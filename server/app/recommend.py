from flask import jsonify, Blueprint, request
import spotipy

recommend_bp = Blueprint('recommend', __name__)


@ recommend_bp.route("/recommend", methods=['POST'])
def recommend():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    sp = spotipy.Spotify(auth=auth_token)

    data = request.get_json()
    title = data['title']
    is_acoustic = data['isAcoustic']
    is_indie = data['isIndie']
    is_live = data['isLive']
    valence = data['valence']

    size = data['size']
    seeds = []
    for _, seed in data['uris'].items():
        if len(seed) == 0:
            continue
        # Check if string is an uri or a search string
        if not seed.startswith("https://"):
            search = sp.search(seed, limit=5, offset=0, type="track")
            seed = search['tracks']['items'][0]['id']
        seeds.append(seed)

    # Recommendation API
    # Define sub attributes
    min_acousticness = 0.5 if is_acoustic else 0.0
    max_popularity = 40 if is_indie else 100
    min_liveness = 0.5 if is_live else 0

    # Set params dictionary to dynamically adjust the parameters on recommendations()
    params = {
        "limit": size,
        "seed_tracks": seeds,
        "min_acousticness": min_acousticness,
        "max_popularity": max_popularity,
        "min_liveness": min_liveness,
    }
    # Conditional params
    if valence > 0:
        params["min_valence"]: valence

    results = sp.recommendations(**params)
    table = []
    for idx, track in enumerate((results['tracks'])):
        obj = {
            "index": idx + 1,
            "id": track['id'],
            "url": track['external_urls']['spotify'],
            "artist": track['artists'][0]['name'],
            "track_name": track['name'],
            "album_name": track['album']['name'],
            "album_cover_url": track['album']['images'][0]['url']
        }
        table.append(obj)
    return jsonify(table)
