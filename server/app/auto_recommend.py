from flask import jsonify, Blueprint
import spotipy
from check_auth import check_auth

auto_recommend_bp = Blueprint('auto_recommend', __name__)

@ auto_recommend_bp.route("/auto_recommend")
def auto_recommend():
    sp = check_auth()

    seed_tracks, seed_artists, seed_genres = [], [], []
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
        limit=10,
        seed_tracks=seed_tracks,
    )
    table = []
    for idx, track in enumerate(results['tracks']):
        # NOTE 'clean' format for dev
        # obj = {
        #     "index": idx + 1,
        #     "id": track['id'],
        #     "artist": track['artists'][0]['name'],
        #     "track_name": track['name']
        # }
        table.append(track['id'])
    return jsonify(table)