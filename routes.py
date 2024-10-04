from flask import render_template, request, redirect, url_for, flash
from app import app, db
from models import User, Post, Category
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from urllib.parse import urlparse

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    posts = Post.query.order_by(Post.date_posted.desc()).limit(5).all()
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/admin', methods=['GET', 'POST'])
@login_required
def admin():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        category_id = request.form['category']
        new_post = Post(title=title, content=content, category_id=category_id)
        db.session.add(new_post)
        db.session.commit()
        flash('New post created!', 'success')
        return redirect(url_for('admin'))
    
    categories = Category.query.all()
    return render_template('admin.html', categories=categories)

@app.route('/search')
def search():
    query = request.args.get('query')
    posts = Post.query.filter(Post.title.contains(query) | Post.content.contains(query)).all()
    return render_template('search.html', posts=posts, query=query)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            next_page = request.args.get('next')
            if not next_page or urlparse(next_page).netloc != '':
                next_page = url_for('index')
            return redirect(next_page)
        flash('Invalid username or password', 'error')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))
