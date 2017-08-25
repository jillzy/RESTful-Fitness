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
    variations = {"Bench": ['Bench Press', 'Incline Bench', 'Dumbbell Press'],
                  "Deadlift": ["American", "Conventional",
                               "Romanian", "Single Leg RDL",
                               "Stiff Leg", "Straight Leg", "Sumo"],
                  "Squat": ["Bulgarian Split", "High Bar", "Low Bar"]}
    for v in variations:
        #if name of the exercise passed in matches with name in the dict
        if data["name"] == v:
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
    data = json.loads(request.get_data())
    content_data =  {   "Bench Press": [''],
                        "Incline Bench": [''],
                        "Dumbbell Press": [''],
                        "American": [''],
                        "Conventional": ['u6UgD1H_AXw'],
                        "Romanian": [''],
                        "Single Leg RDL": [''],
                        "Stiff Leg": [''],
                        "Straight Leg": [''],
                        "Sumo": [''],
                        "Bulgarian Split": [''],
                        "High Bar": [''],
                        "Low Bar": ['']}
    for cd in content_data:
        if data["name"] == cd:
            res = {"videoURLs": content_data[cd]}
            return json.dumps(res)
    return "none"






if __name__ == '__main__':
    app.run()

