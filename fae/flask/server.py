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

warnings.filterwarnings("ignore")

app = Flask(__name__)

@app.route('/chatResponse', methods=['POST'])
def chatResponse():
    try:
        data = request.get_json()
        text_input = data.get('messageList', '')
        
        return jsonify({'reply': "Hi there"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/getDoctors', methods=['POST'])
def upload_file():
    try:
        data = request.get_json()
        text_input = data.get('messageList', '')
        
        return jsonify({'doc':[{"name":"anishka","email":"iloveyou@gmail.com"},{"name":"atharva","email":"badmintonpro@gmail.com"},{"name":"devansh","email":"designgod@gmail.com"},{"name":"tashi","email":"meow@gmail.com"}]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/test')
def test():
    
    return {"test" : ["hi","bye"]}
    # return json_result


if __name__ == '__main__':
    app.run(debug=True) 
