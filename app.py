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

from models import Post, Tag

def create_sample_data():
    # Check if there are any existing posts
    if Post.query.count() == 0:
        # Create sample tags
        tag1 = Tag(name="algebra")
        tag2 = Tag(name="calculus")
        tag3 = Tag(name="geometry")

        # Create sample posts
        post1 = Post(
            title="Introduction to Linear Algebra",
            content="Linear algebra is the branch of mathematics concerning linear equations such as:\n\n$$a_1x_1 + \cdots + a_nx_n = b,$$\n\nlinear maps such as:\n\n$$(x_1, \ldots, x_n) \mapsto a_1x_1 + \cdots + a_nx_n,$$\n\nand their representations in vector spaces and through matrices.",
            tags=[tag1]
        )
        post2 = Post(
            title="The Fundamentals of Calculus",
            content="Calculus is the mathematical study of continuous change. The two major branches of calculus are differential calculus and integral calculus.\n\nDifferential calculus concerns instantaneous rates of change and the slopes of curves.\n\nIntegral calculus concerns accumulation of quantities and the areas under and between curves.",
            tags=[tag2]
        )
        post3 = Post(
            title="Exploring Euclidean Geometry",
            content="Euclidean geometry is a mathematical system attributed to the Alexandrian Greek mathematician Euclid. Euclid's method consists in assuming a small set of intuitively appealing axioms, and deducing many other propositions from these.\n\nFor example, the Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides:\n\n$$a^2 + b^2 = c^2$$",
            tags=[tag3]
        )

        # Add posts to the database
        db.session.add_all([post1, post2, post3])
        db.session.commit()
        print("Sample data created successfully!")

with app.app_context():
    db.drop_all()  # Drop all existing tables
    db.create_all()  # Create new tables
    create_sample_data()

from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
