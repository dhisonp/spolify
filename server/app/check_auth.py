import spotipy
from flask import session, redirect


def check_auth(auth_header):
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    return spotipy.Spotify(auth=auth_token)
