from flask import Flask, render_template, request
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/action_page', methods=['POST'])
def action():
    #take string and parse/loads into json object
    data = json.loads(request.get_data())
    print(data)
    print(type(data))
    benchVariations = ['Bench, Incline Bench, Dumbbell Press']
    #turns json back into str
    return json.dumps(data)


@app.route('/')
def index():
    lifts = ['Bench', 'Deadlift', 'Squat'];
    return render_template('layout.html', lifts=lifts)




if __name__ == '__main__':
    app.run()

