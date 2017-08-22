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
    #print(data)
    #print(type(data))
    variations = {"Bench": ['Bench', 'Incline Bench', 'Dumbbell Press'],
                  "Deadlift": ["all the lifts"],
                  "Squat": ["all the squats"]}
    for v in variations:
        for k in data:
            if data[k] == v:
                return json.dumps(variations[v])
    return "none"
    #turns json back into str
    #return json.dumps(data)


@app.route('/')
def index():
    lifts = ['Bench', 'Deadlift', 'Squat'];
    return render_template('layout.html', lifts=lifts)




if __name__ == '__main__':
    app.run()

