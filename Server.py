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
    import httplib2
    import os
    import sys

    from apiclient.discovery import build
    from apiclient.errors import HttpError

    dict = {"videoIDs": []}

    # Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
    # tab of
    #   https://cloud.google.com/console
    # Please ensure that you have enabled the YouTube Data API for your project.
    DEVELOPER_KEY = "AIzaSyBX96eQC_wopXcHZJLguVn1ypqAPZ2eoQU"
    YOUTUBE_API_SERVICE_NAME = "youtube"
    YOUTUBE_API_VERSION = "v3"

    #def youtube_search(options):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # Call the search.list method to retrieve results matching the specified
    # query term.
    search_response = youtube.search().list(
        q='cat',#options.q,
        part="id,snippet",
        maxResults=5#options.max_results
    ).execute()

    videos = []
    channels = []
    playlists = []

    # Add each result to the appropriate list, and then display the lists of
    # matching videos, channels, and playlists.
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            dict["videoIDs"].append(search_result["id"]["videoId"])
            videos.append("%s (%s)" % (search_result["snippet"]["title"],
                                       search_result["id"]["videoId"]))
        elif search_result["id"]["kind"] == "youtube#channel":
            channels.append("%s (%s)" % (search_result["snippet"]["title"],
                                         search_result["id"]["channelId"]))
        elif search_result["id"]["kind"] == "youtube#playlist":
            playlists.append("%s (%s)" % (search_result["snippet"]["title"],
                                          search_result["id"]["playlistId"]))

    print "Videos:\n", "\n".join(videos), "\n"
    print "Channels:\n", "\n".join(channels), "\n"
    print "Playlists:\n", "\n".join(playlists), "\n"
    print()
    print json.dumps(dict)

    return json.dumps(dict)

            # data = json.loads(request.get_data())
    # content_data =  {   "Bench Press": [''],
    #                     "Incline Bench": [''],
    #                     "Dumbbell Press": [''],
    #                     "American": [''],
    #                     "Conventional": ['u6UgD1H_AXw','u6UgD1H_AXw'],
    #                     "Romanian": [''],
    #                     "Single Leg RDL": [''],
    #                     "Stiff Leg": [''],
    #                     "Straight Leg": [''],
    #                     "Sumo": [''],
    #                     "Bulgarian Split": [''],
    #                     "High Bar": [''],
    #                     "Low Bar": ['']}
    # for cd in content_data:
    #     if data["name"] == cd:
    #         res = {"Tags": content_data[cd]}
    #         return json.dumps(res)
    # return "none"



if __name__ == '__main__':
    app.run()

