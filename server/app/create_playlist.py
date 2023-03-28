import spotipy
from spotipy.exceptions import SpotifyException
from flask import Blueprint, json
from check_auth import check_auth
from auto_recommend import auto_recommend

create_playlist_bp = Blueprint('create_playlist', __name__)


@ create_playlist_bp.route("/create_playlist")
def create_playlist():
    sp = check_auth()
    user_id = sp.me()['id']
    playlist_name = 'Spolify placeholder'
    is_public = True
    is_collaborative = False
    created, result = None, None
    # TODO Fix -> description = 'Playlist created with Spolify.'
    try:
        created = sp.user_playlist_create(user_id, playlist_name,
                                          public=is_public, collaborative=is_collaborative)
    except SpotifyException as err:
        error(err)
    try:
        # TODO Pass the playlist JSON as a function parameter
        # auto_recommend() returns a Flask object. Use get_data(as_text=True) to get the JSON
        # in string format for processing.
        recommendation = json.loads(auto_recommend().get_data(as_text=True))
        recommendation = [item['id'] for item in recommendation]
        playlist_id = created['id']
        result = sp.playlist_add_items(
            playlist_id, recommendation, position=None)
    except SpotifyException as err:
        error(err)
    return "URL: " + created['external_urls']['spotify']


def error(err):
    print("An error occured:", err.msg)
    return err.msg


"""
Methodology works: cover your bases. Make sure the legs work before you run. 
Saves up time and identifies problem quickly.

In this module, you were dealing with 'recommendation' being a JSON data type, 
since you did 'jsonify()' on the auto_recommend() function. 
You found the error while ensuring that the result is the appropriate data type 
to be parsed into playlist_add_items. Good job!
"""
