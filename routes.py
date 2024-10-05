from flask import render_template, request, redirect, url_for, flash
from app import app, db
from models import Post, Tag
from sqlalchemy import desc, extract
from datetime import datetime

@app.route('/')
def index():
    posts = Post.query.order_by(Post.date_posted.desc()).limit(5).all()
    print(f"Number of posts retrieved: {len(posts)}")
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        return render_template('post.html', post=post)
    except Exception as e:
        app.logger.error(f"Error accessing post {post_id}: {str(e)}")
        return render_template('error.html', error_message="Unable to load the requested post."), 500

@app.route('/search')
def search():
    query = request.args.get('query')
    posts = Post.query.filter(
        (Post.title.contains(query)) |
        (Post.content.contains(query)) |
        (Post.tags.any(Tag.name.contains(query)))
    ).all()
    return render_template('search.html', posts=posts, query=query)

@app.route('/archive')
def archive():
    posts = Post.query.order_by(Post.date_posted.desc()).all()
    posts_by_year = {}
    for post in posts:
        year = post.date_posted.year
        if year not in posts_by_year:
            posts_by_year[year] = []
        posts_by_year[year].append(post)
    return render_template('archive.html', posts_by_year=posts_by_year)

@app.route('/tags')
def tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)

@app.route('/tag/<string:tag_name>')
def tag(tag_name):
    tag = Tag.query.filter_by(name=tag_name).first_or_404()
    posts = tag.posts
    return render_template('tag.html', tag=tag, posts=posts)

@app.route('/faq')
def faq():
    return render_template('faq.html')
