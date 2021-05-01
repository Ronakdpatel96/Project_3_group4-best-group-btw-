''' File that contains person, but is not used in app.py '''
from app import DB

class Person(DB.Model):
    ''' Defines what a person is '''
    __table_args__ = {'extend_existing': True}
    username = DB.Column(DB.String(15), primary_key=True)
    email = DB.Column(DB.String(64), primary_key=True)
    win = DB.Column(DB.Integer, nullable=False)
    loss = DB.Column(DB.Integer, nullable=False)
    tie = DB.Column(DB.Integer, nullable=False)
    points = DB.Column(DB.Integer, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username