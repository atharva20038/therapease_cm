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
from datetime import datetime
import gpt_2_simple as gpt2
from transformers import GPT2Tokenizer

warnings.filterwarnings("ignore")

app = Flask(__name__)

@app.route('/chatResponse', methods=['POST'])
def chatResponse():
    file_name = "/counsellor/train.txt"
    checkpoint_dir = '/Users/tanishqashitalsingh/Downloads/cmcm/fae/flask/counsellor'
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, run_name='runf')
    try:
        data = request.get_json()
        
        text_input = data.get('messageList', '')
        pref = "question: "+text_input+" context:"
        outputtext=gpt2.generate(sess,
                prefix= pref,
                top_k=10, 
                top_p=0.7,
                temperature = 0.8,
                nsamples=1,
                batch_size=1,
                run_name='runf',
                truncate=' <|endoftext|>',
                include_prefix=False,
                checkpoint_dir=checkpoint_dir
                )
        return jsonify({'reply': outputtext})
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
