from flask import Blueprint, jsonify
import spotipy
from check_auth import check_auth

saved_bp = Blueprint('saved', __name__)

@ saved_bp.route("/saved")
def saved():
    sp = check_auth()
    results = sp.current_user_saved_tracks()
    table = []
    for idx, item in enumerate(results['items']):
        track = item['track']
        obj = {
            "index": idx + 1,
            "artist": track['artists'][0]['name'],
            "track_name": track['name']
        }
        table.append(obj)
    return jsonify(table)