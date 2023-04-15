from flask import Blueprint, jsonify, request
import spotipy
from check_auth import check_auth

saved_bp = Blueprint('saved', __name__)

@saved_bp.route("/saved")
def saved():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
        sp = spotipy.Spotify(auth=auth_token)
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
    else:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
