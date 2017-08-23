from flask import Flask, render_template, request
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/get_variations', methods=['POST'])
def get_variations():
    #take string and parse/loads into json object
    data = json.loads(request.get_data())
    #print(data)
    #print(type(data))
    variations = {"Bench": ['Bench Press', 'Incline Bench', 'Dumbbell Press'],
                  "Deadlift": ["American Deadlift", "Conventional Deadlift",
                               "Sumo Deadlift", "Romanian Deadlift", "Single Leg RDL",
                               "Stiff Leg", "Straight Leg"],
                  "Squat": ["Bulgarian Split", "High Bar", "Low Bar"]}
    for v in variations:
        for k in data:
            if data[k] == v:
                res = {v: variations[v]}
                # turns json back into str
                return json.dumps(res)
    return "none"
    #return json.dumps(data)


@app.route('/')
def index():
    lifts = ['Bench', 'Deadlift', 'Squat'];
    return render_template('layout.html', lifts=lifts)

@app.route('/click_variation', methods=['POST'])
def click_variation():
    print ("/click_variation")
    return "clicked stuff"




if __name__ == '__main__':
    app.run()

