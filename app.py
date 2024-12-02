from flask import Flask, render_template, request, jsonify
import numpy as np
import sys
import tensorflow as tf
import os

# Check command-line arguments
if len(sys.argv) != 2:
    sys.exit("Usage: python recognition.py model.h5")
model = tf.keras.models.load_model(sys.argv[1])
classification = None

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():

    try:
        
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON received"}), 400

        classification = model.predict(
            [np.array(data).reshape(1, 28, 28, 1)]
        ).argmax()

        print(classification)
        classification = int(classification)

        return jsonify({"message": "Matriz recibida correctamente", "data": classification})

    except Exception as e:
        
        return jsonify({"error": f"Error procesando los datos: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)