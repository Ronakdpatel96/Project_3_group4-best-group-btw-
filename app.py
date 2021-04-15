import os
import requests
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

# For testing purposes, remember to update this later
class Person(DB.Model):
    ''' Defines what a person is '''
    __table_args__ = {'extend_existing': True}
    username = DB.Column(DB.String(15), primary_key=True)
    email = DB.Column(DB.String(64), primary_key=True)
    win = DB.Column(DB.Integer, nullable=False)
    loss = DB.Column(DB.Integer, nullable=False)
    tie = DB.Column(DB.Integer, nullable=False)
    rank = DB.Column(DB.Integer, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
        
DB.create_all()

#new_user = Person(username="Bill", email="bill355@website.com", win=5, loss=2, tie=1, rank=52)
#DB.session.add(new_user)
#DB.session.commit()
# End of testing code

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
def on_statistics(name):
    ''' When stats button is clicked, it will display mock database info '''
    print(name)
    d = requests.get('https://my-json-server.typicode.com/krojas64/490-test-db/users')
    data = d.json()
    print(str(data))
    SOCKETIO.emit('statistics', data, broadcast=True, include_self=False)
    
# Event that will update the two users' databases after a game has ended
@SOCKETIO.on('game-end')
def on_win():
    print('The game has ended')
    
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )