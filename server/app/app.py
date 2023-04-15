from flask import Flask, jsonify, session, request, redirect
from flask_cors import CORS
from flask_session import Session
import os
from os import environ, urandom
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
# Routes
from check_auth import check_auth
# Import Blueprint
from saved import saved_bp
from top_tracks import top_tracks_bp
from recommend import recommend_bp
from auto_recommend import auto_recommend_bp
from create_playlist import create_playlist_bp

# App and Blueprints
app = Flask(__name__)
CORS(app)
app.register_blueprint(saved_bp)
app.register_blueprint(top_tracks_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(auto_recommend_bp)
app.register_blueprint(create_playlist_bp)
# Environment/Session Variables
app.config['SECRET_KEY'] = urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

# Load .env
load_dotenv()
# Define scopes and auth stuff
scope = "user-library-read user-read-currently-playing playlist-modify-private user-top-read playlist-modify-public"
cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope,
                                           cache_handler=cache_handler,
                                           show_dialog=True
                                           )


@app.route('/login')
def login():
    auth_url = auth_manager.get_authorize_url()
    return jsonify(auth_url)


@app.route('/logout')
def logout():
    session.pop("token_info", None)
    return jsonify(message='Logged out'), 200


@app.route('/user')
def get_user():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth())
    try:
        user_data = sp.me()
        return jsonify(user_data)
    except spotipy.SpotifyException:
        return jsonify(error='Not logged in'), 401

@app.route('/redirect')
def redirect_page():
    auth_manager.get_access_token(request.args.get("code"))
    token_info = auth_manager.get_cached_token()
    redirect_url = 'http://localhost:3000/dashboard?access_token={}'.format(
        token_info['access_token'])
    return redirect(redirect_url)


@app.route('/')
def index():
    # TODO Integrate with Front-End
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope,
                                               cache_handler=cache_handler,
                                               show_dialog=True
                                               )

    if request.args.get("code"):
        # Step 2. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    red = os.getenv('SPOTIPY_REDIRECT_URL')
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 1. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in {red}</a></h2>'

    # Step 3. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return f'<h2>Hi {spotify.me()["display_name"]}, ' \
        f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
        f'<a href="/saved">saved songs</a> | ' \
        f'<a href="/recommend">standard recommend</a> | ' \
        f'<a href="/auto_recommend">auto recommend</a> | ' \
        f'<a href="/top_tracks">my top tracks</a> | ' \
        f'<a href="/create_playlist">create playlist</a> | ' \
        f'<span><br/>Note: "standard recommend" is currently hardcoded. Please test the other features.</span>' \
        f'<span><br/>"create playlist" generates a playlist, tracks recommended based on user top items</span>'
    # f'<a href="/current_user">me</a>' \


@app.route('/sign_out')
def sign_out():
    session.pop("token_info", None)
    return redirect('/')


@ app.route("/hello_world")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    # app.run()
    app.run(host="localhost", port=8080)

'''
Flow:
FE Login -> BE Auth URL -> FE Get URL -> Redirect to Spotify ->
Spotify redirect to BE with auth code -> BE processes code and stores in Flask session ->
BE generates access token for FE upon redirect -> FE stores access token ->
FE sends access token in request header -> BE uses access token for auth: sp = spotipy.Spotify(auth=auth_token)
'''