from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

#@app.route('/')
#def hello_world():
#    return 'hello, world!

@app.route('/')
def webprint():
    return render_template('FitnessApp.html')


if __name__ == '__main__':
    app.run()

