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
from create_playlist_custom import create_playlist_custom_bp

# App and Blueprints
app = Flask(__name__)
CORS(app)
app.register_blueprint(saved_bp)
app.register_blueprint(top_tracks_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(auto_recommend_bp)
app.register_blueprint(create_playlist_bp)
app.register_blueprint(create_playlist_custom_bp)
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
    auth_header = request.headers.get('Authorization')
    sp = check_auth(auth_header)
    try:
        user_data = sp.me()
        return jsonify(user_data)
    except spotipy.SpotifyException:
        return jsonify(error='Not logged in'), 401


@app.route('/redirect')  # after being redirected from Spotify Auth page
def redirect_page():
    auth_manager.get_access_token(request.args.get("code"))
    token_info = auth_manager.get_cached_token()
    fe = environ.get("CLIENT_URL")
    redirect_url = fe + '/dashboard?access_token={}'.format(
        token_info['access_token'])
    return redirect(redirect_url)


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
