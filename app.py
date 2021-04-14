import os
import requests
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    
@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    ''' Gets the html file used for this function '''
    return send_from_directory('./build', filename)


@SOCKETIO.on('connect')
def on_connect():
    ''' When a client connects from this Socket connection, this function is run '''
    print('User connected!')


@SOCKETIO.on('disconnect')
def on_disconnect():
    ''' When a client disconnects from this Socket connection, this function is run '''
    print('User disconnected!')
    
@SOCKETIO.on('statistics')
def on_statistics():
    ''' When stats button is clicked, it will display database info '''
    data = requests.get('https://my-json-server.typicode.com/krojas64/490-test-db/users')
    print(str(data))
    SOCKETIO.emit('statistics', data, broadcast=True, include_self=False)
    
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )