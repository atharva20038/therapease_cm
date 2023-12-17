from collections import OrderedDict
import json
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import IPython
import wave
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
import time
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, matthews_corrcoef, roc_auc_score
import librosa
from io import BytesIO
import base64
import warnings
from openai import OpenAI
import ast
from dotenv import load_dotenv

load_dotenv("../.env")

## Get the API key from the environment variable
# os.environ['OPENAI_API_KEY'] = environ.get('OPENAI_API_KEY')

client = OpenAI()
doctor_list_json = ""

warnings.filterwarnings("ignore")

app = Flask(__name__)

@app.route('/chatResponse', methods=['POST'])
def chatResponse():
    try:
        data = request.get_json()
        text_input = data.get('messageList', '')

        print(text_input)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=text_input
        )

        output = response.choices[0].message.content
        
        return jsonify({'reply': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/getDoctors', methods=['POST'])
def upload_file():
    try:
        data = request.get_json()
        text_input = data.get('messageList', '')

        print(text_input)

        messageHistory = ""

        for message in text_input : 
            if message["role"] == "user" : 
                messageHistory += message["role"] + ": " + message["content"] + "\n" 

        prompt = "Message History : \n" + messageHistory + "\n" + """
        Classes for classification : 
        
        Addiction,Alzheimer's,Anger Management,Anxiety,
        Behavioral Change,Career Counseling,Children & Adolescents,
        Counseling Fundamentals,Depression,Diagnosis,
        Domestic Violence,Eating Disorders,Family Conflict,
        Grief and Loss,Human Sexuality,Intimacy,LGBTQ,
        Legal & Regulatory,Marriage,Military Issues,Parenting,
        Professional Ethics,Relationship Dissolution,
        Relationships,Self-esteem,Self-harm,Sleep Improvement,
        Social Relationships,Spirituality,Stress,
        Substance Abuse,Trauma,Workplace Relationships.
        
        
        Given the message history classify the message into 1 or more classes as appropriate.

        Output the classes in a list in the following format : 
        []

        example : 

        ["Relationships","Anxiety"]
        """

        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt
        )

        output = response.choices[0].text

        # Extracting the portion inside the square brackets
        start = output.find('[') + 1  # +1 to exclude the '['
        bracket_content = output[start:-1]

        parsed_list = ast.literal_eval(bracket_content)

        # Remove leading/trailing whitespaces and double quotes from each element
        classes = [item.strip().strip('"') for item in parsed_list]

        print(type(doctor_list_json))

        doctor_dict = {}
        
        for disease in doctor_list_json.keys() : 
            if disease in classes : 
                ## extract list of doctors
                # print(disease)
                for doctor in doctor_list_json[disease].keys() : 
                    # print(doctor_list_json[disease][doctor])
                    # print("----------------------")
                    if doctor in doctor_dict : 
                        doctor_dict[doctor] += doctor_list_json[disease][doctor]

                    else : 
                        # print(doctor)
                        doctor_dict[doctor] = doctor_list_json[disease][doctor]

        # print("Hello")

        order_dict = OrderedDict(sorted(doctor_dict.items()))

        # print(order_dict)

        doctor_list = []

        for i in range(order_dict) : 
            doctor_list.append({"name" : order_dict.__getitem__(i),"email" : order_dict.__getitem__(i)+"@gmail.com"})
        
        return jsonify({'doc':doctor_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/test')
def test():
    
    return {"test" : ["hi","bye"]}
    # return json_result


if __name__ == '__main__':
    
    with open("therapist_topic_dict.json",'r') as f : 
        doctor_list_json = json.load(f)

    print(type(doctor_list_json))
    app.run(debug=True) 
