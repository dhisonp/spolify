import spotipy
from spotipy.exceptions import SpotifyException
from flask import Blueprint, json, request, jsonify
from check_auth import check_auth
from auto_recommend import auto_recommend
import os
import requests

create_playlist_custom_bp = Blueprint('create_playlist_custom', __name__)

# TODO Takes parameters from the results of recommend() and auto_recommend()
# instead of coded into the function.
# NOTE `seed` is currently hard-coded into auto_recommend()


@ create_playlist_custom_bp.route("/create_playlist_custom", methods=['POST'])
def create_playlist():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    sp = spotipy.Spotify(auth=auth_token)

    user_id = sp.me()['id']
    data = request.get_json()
    playlist_name = data['title']
    seeds = data['seeds']
    # NOTE Playlist access params
    is_public = True
    is_collaborative = False

    created, result = None, None

    # Send a POST request to /recommend
    # server_url = os.environ.get('SERVER_URL')
    # seeds = requests.post(server_url + '/recommend',
    #                       json=data, headers={"Authorization": "Bearer " + auth_token})
    # seeds = seeds.json()
    seeds = [item['id'] for item in seeds]

    # TODO Fix -> description = 'Playlist created with Spolify.'
    try:  # Create a new playlist
        created = sp.user_playlist_create(user_id,
                                          playlist_name,
                                          public=is_public,
                                          collaborative=is_collaborative,
                                          description="Created with SpoLify.")
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
