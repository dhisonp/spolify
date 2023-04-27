from flask import jsonify, Blueprint, request
import spotipy

auto_recommend_bp = Blueprint('auto_recommend', __name__)


@ auto_recommend_bp.route("/auto_recommend")
def auto_recommend():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    sp = spotipy.Spotify(auth=auth_token)

    seed_tracks, seed_artists, seed_genres = [], [], []
    size = 15
    # Get user top tracks
    top_tracks = sp.current_user_top_tracks(5, 0, "medium_term")['items']
    # Append seeds to seed list
    for track in top_tracks:
        seed_tracks.append(track['id'])
        # TODO seed_genres.append()
        # seed_artists.append(track['artists'][0]['id'])
    # Recommendation API
    # NOTE Maximum of 5 seeds COMBINED (Genres + Tracks + Artists)
    # TODO Attributes like popularity, etc.
    results = sp.recommendations(
        limit=size,
        seed_tracks=seed_tracks,
    )
    table = []
    for idx, track in enumerate(results['tracks']):
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
