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
Spectators = []
Players = []
LoginName = []
LoginEmail = []
userName = []
                    
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
    
def database_check(user,email_address):
    check = Person.query.filter_by(username=user).first()
    if check is None:
        new_user = Person(username=user, email=email_address, win=0, loss=0, tie=0, rank=0)
        DB.session.add(new_user)
        DB.session.commit()
        return new_user
    return check
    
@SOCKETIO.on('login')
def on_login(data):
    ''' When a client logs in, check if user is in database and send relevant info '''
    stats = database_check(data['user'], data['email'])
    stats_info = []
    stats_info.append(stats.username)
    stats_info.append(stats.email)
    stats_info.append(stats.win)
    stats_info.append(stats.loss)
    stats_info.append(stats.tie)
    stats_info.append(stats.rank)
    print(stats)
    print(stats_info)
    SOCKETIO.emit('statistics', stats_info, broadcast=True, include_self=True)
    
@SOCKETIO.on('joined')
def players(data):
    global LoginName
    global LoginEmail
    global Players
    global userName
    global Spectators
    
    email = data['email']
    user = email.split('@')[0]
    
    if user not in userName:
        userName.append(user)
        LoginEmail.append(str(data['email']))
        LoginName.append(str(data['user']))
        if len(Players) < 2:
            Players.append(str(data['user']))
        else:
            Spectators.append((str(data['user'])))
            
            
    print(Players)
    print(Spectators)
    #print(LoginName)
    
    SOCKETIO.emit('LoggedIn', LoginName, broadcast=True, include_self=False)
    SOCKETIO.emit('Players', Players, broadcast=True, include_self=True)
    SOCKETIO.emit('Spectators', Spectators, broadcast=True, include_self=True)


    
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