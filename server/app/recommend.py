from flask import jsonify, Blueprint
import spotipy
from check_auth import check_auth

recommend_bp = Blueprint('recommend', __name__)

# TODO Takes parameter from the client
# Parameters: seed_tracks, is_popular, is_acoustic, etc.


@ recommend_bp.route("/recommend")
def recommend():
    sp = check_auth()

    # NOTE Temporary plain defintion for parameters
    seed_tracks, seed_artists, seed_genres = [], [], []
    # NOTE Temporary hard code for sub-attributes
    is_popular = is_acoustic = True
    # NOTE Temporary hardcode for seed_tracks
    # 1 SZA - Good Days
    # 2 Mac Ayres - Easy
    # 3 J. Passion & J. Barrera - Constant
    # 4 Ella Mai - A Mess
    # 5 DaniLeigh & Chris Brown - Easy
    seed_tracks.append(
        'https://open.spotify.com/track/3YJJjQPAbDT7mGpX3WtQ9A?si=3869a3f1df9346ae')
    seed_tracks.append(
        'https://open.spotify.com/track/58dSdjfEYNSxte1aNVxuNf?si=03d77f85c4174206')
    seed_tracks.append(
        'https://open.spotify.com/track/12ZYXSzFJUSrFyO1u3Ylqx?si=1741e807b99a46bc')
    seed_tracks.append(
        'https://open.spotify.com/track/3HgJ1aYlEgy8Yj1NMAe1pm?si=4113d925da8b4c99')
    seed_tracks.append(
        'https://open.spotify.com/track/4CMrdHWqic0usIZfTrKoI3?si=2a14fa6152344d8c')
    # NOTE Temporary hardcode for genres
    seed_genres.append('r-n-b')
    # Recommendation API
    # Define sub attributes
    min_acousticness = 0.6 if is_acoustic else 0.0
    max_popularity = 40 if (is_popular is None) else 100
    results = sp.recommendations(
        limit=10,
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
