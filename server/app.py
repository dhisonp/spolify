from flask import Flask, jsonify, session, request, redirect
from flask_session import Session
from os import environ, urandom
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# App and Session
app = Flask(__name__)
app.config['SECRET_KEY'] = urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

# Load .env
load_dotenv()
# Define scopes
scope = "user-library-read user-read-currently-playing playlist-modify-private user-top-read"

# TODO Implement login screen
# SEE ./example/app.py
# sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
#                                                client_secret=CLIENT_SECRET,
#                                                redirect_uri=REDIRECT_URI,
#                                                scope=scope))


def check_auth():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify


@app.route('/')
def index():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope,
                                               cache_handler=cache_handler,
                                               show_dialog=True
                                               )

    if request.args.get("code"):
        # Step 2. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 1. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 3. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return f'<h2>Hi {spotify.me()["display_name"]}, ' \
           f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
           f'<a href="/saved">saved songs</a> | ' \
           f'<a href="/top_tracks">my top tracks</a> | ' \
        # f'<a href="/current_user">me</a>' \


@app.route('/sign_out')
def sign_out():
    session.pop("token_info", None)
    return redirect('/')


@ app.route("/saved")
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


@ app.route("/top_tracks")
def top_tracks():
    sp = check_auth()
    results = sp.current_user_top_tracks(5, 0, "medium_term")
    table = []
    for idx, track in enumerate((results['items'])):
        obj = {
            "index": idx + 1,
            "artist": track['artists'][0]['name'],
            "track_name": track['name']
        }
        table.append(obj)
    return jsonify(table)


@ app.route("/hello_world")
def hello_world():
    return "<p>Hello, World!</p>"
