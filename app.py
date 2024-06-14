from flask import Flask, request, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load your model
with open('linear_regression_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            data = [float(x) for x in request.form.values()]
            prediction = model.predict([np.array(data)])
            output = round(prediction[0], 2)
            return render_template('project2.html', prediction_text=f'Predicted Value: {output}')
        except Exception as e:
            return render_template('project2.html', prediction_text=f'Error: {e}')
    else:
        return render_template('project2.html', prediction_text='Please submit a POST request.')

if __name__ == "__main__":
    app.run(debug=True)
