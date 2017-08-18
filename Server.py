from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()

