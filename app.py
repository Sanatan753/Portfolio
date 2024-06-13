from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)

# Load your model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('project2.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = [float(x) for x in request.form.values()]
    prediction = model.predict([np.array(data)])
    output = round(prediction[0], 2)
    return render_template('project2.html', prediction_text=f'Predicted Value: {output}')

if __name__ == "__main__":
    app.run(debug=True)
