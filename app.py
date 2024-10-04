import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)

from models import User, Post, Category

with app.app_context():
    db.create_all()

from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
