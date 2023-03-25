from flask import Blueprint, jsonify
import spotipy
from check_auth import check_auth

top_tracks_bp = Blueprint('top_tracks', __name__)

@ top_tracks_bp.route("/top_tracks")
def top_tracks():
    sp = check_auth()
    results = sp.current_user_top_tracks(12, 0, "medium_term")
    # NOTE Cleaner Data:
    table = []
    for idx, track in enumerate(results['items']):
        obj = {
            "index": idx + 1,
            "id": track['id'],
            "artist": track['artists'][0]['name'],
            "track_name": track['name'],
            # "genre": track['genre']
        }
        table.append(obj)
    return jsonify(table)
