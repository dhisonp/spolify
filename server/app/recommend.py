from flask import jsonify, Blueprint, request
import spotipy

recommend_bp = Blueprint('recommend', __name__)


@ recommend_bp.route("/recommend", methods=['POST'])
def recommend():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing or invalid.'}), 401
    auth_token = auth_header.split(" ")[1]
    sp = spotipy.Spotify(auth=auth_token)

    data = request.get_json()
    title = data['title']
    is_acoustic = data['isAcoustic']
    is_indie = data['isIndie']
    size = data['size']
    seeds = []
    for _, seed in data['uris'].items():
        if len(seed) > 0:
            seeds.append(seed)

    # Recommendation API
    # Define sub attributes
    min_acousticness = 0.6 if is_acoustic else 0.0
    max_popularity = 40 if is_indie else 100

    results = sp.recommendations(
        limit=size,
        seed_tracks=seeds,
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

''' # # NOTE Temporary hardcode for playlist size
    # size = 10
    # # NOTE Temporary plain defintion for parameters
    # seed_tracks, seed_artists, seed_genres = [], [], []
    # # NOTE Temporary hard code for sub-attributes
    # is_indie = False
    # is_acoustic = False
    # # NOTE Temporary hardcode for seed_tracks
    # # 1 SZA - Good Days
    # # 2 ASTN - Happier Than Ever
    # # 3 Luke Chiang
    # # 4 keshi
    # seed_tracks.append(
    #     'https://open.spotify.com/track/3YJJjQPAbDT7mGpX3WtQ9A?si=3869a3f1df9346ae')
    # seed_tracks.append(
    #     'https://open.spotify.com/track/7es56D0QedGMsK39wl2yFX?si=e965e0f056f44954')
    # seed_tracks.append(
    #     '1dPSMH55yhvjYIwqCP4iDj')
    # seed_tracks.append('3pc0bOVB5whxmD50W79wwO')
    # # NOTE Temporary hardcode for genres
    # seed_genres.append('r-n-b')'''
