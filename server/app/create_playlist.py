import spotipy
from spotipy.exceptions import SpotifyException
from flask import Blueprint, json, request, jsonify
from check_auth import check_auth
from auto_recommend import auto_recommend

create_playlist_bp = Blueprint('create_playlist', __name__)

# TODO Takes parameters from the results of recommend() and auto_recommend()
# instead of coded into the function.
# NOTE `seed` is currently hard-coded into auto_recommend()


@ create_playlist_bp.route("/create_playlist", methods=['GET', 'POST'])
def create_playlist():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    sp = spotipy.Spotify(auth=auth_token)

    user_id = sp.me()['id']
    playlist_name = "Reclify - " + sp.me()['display_name']
    is_public = True
    is_collaborative = False
    created, result = None, None

    # NOTE Set seeds automatically from auto_recommend()
    # auto_recommend() returns a Flask object. Use get_data(as_text=True) to get the JSON
    # in string format for processing.
    seeds = json.loads(auto_recommend().get_data(as_text=True))
    seeds = [item['id'] for item in seeds]

    # TODO Fix -> description = 'Playlist created with Reclify.'
    try:  # Create a new playlist
        created = sp.user_playlist_create(user_id, playlist_name,
                                          public=is_public, collaborative=is_collaborative)
    except SpotifyException as err:
        error(err)
    try:
        # TODO Pass the playlist JSON as a function parameter
        playlist_id = created['id']
        result = sp.playlist_add_items(
            playlist_id, seeds, position=None)
    except SpotifyException as err:
        error(err)
    return created['external_urls']['spotify']


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
