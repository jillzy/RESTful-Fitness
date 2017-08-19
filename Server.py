from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/')
def index():
    lifts = ['Bench', 'Deadlift', 'Squat'];
    benchVariations = ['Bench, Incline Bench, Dumbbell Press']
    return render_template('layout.html', lifts = lifts, benchV = benchVariations)




if __name__ == '__main__':
    app.run()

