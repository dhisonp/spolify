from flask import jsonify, Blueprint
import spotipy
from check_auth import check_auth

recommend_bp = Blueprint('recommend', __name__)

# TODO Takes parameter from the client
# Parameters: seed_tracks, is_popular, is_acoustic, etc.


@ recommend_bp.route("/recommend")
def recommend():
    sp = check_auth()

    # NOTE Temporary hardcode for playlist size
    size = 10
    # NOTE Temporary plain defintion for parameters
    seed_tracks, seed_artists, seed_genres = [], [], []
    # NOTE Temporary hard code for sub-attributes
    is_indie = False
    is_acoustic = False
    # NOTE Temporary hardcode for seed_tracks
    # 1 SZA - Good Days
    # 2 ASTN - Happier Than Ever
    # 3 SZA - Snooze
    seed_tracks.append(
        'https://open.spotify.com/track/3YJJjQPAbDT7mGpX3WtQ9A?si=3869a3f1df9346ae')
    seed_tracks.append(
        'https://open.spotify.com/track/7es56D0QedGMsK39wl2yFX?si=e965e0f056f44954')
    seed_tracks.append(
        'https://open.spotify.com/track/4iZ4pt7kvcaH6Yo8UoZ4s2?si=da2e57f816af4e2c')
    # NOTE Temporary hardcode for genres
    seed_genres.append('r-n-b')
    # Recommendation API
    # Define sub attributes
    min_acousticness = 0.6 if is_acoustic else 0.0
    max_popularity = 40 if is_indie else 100
    results = sp.recommendations(
        limit=size,
        seed_tracks=seed_tracks,
        min_acousticness=min_acousticness,
        max_popularity=max_popularity
        # TODO figure out how to seed_genres/_tracks, considering maximum of 5 seeds
        # seed_genres=seed_genres,
    )
    table = []
    for idx, track in enumerate((results['tracks'])):
        obj = {
            "index": idx + 1,
            "id": track['id'],
            "url": track['external_urls']['spotify'],
            "artist": track['artists'][0]['name'],
            "track_name": track['name']
        }
        table.append(obj)
    return jsonify(table)
