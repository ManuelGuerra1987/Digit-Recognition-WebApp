from flask import Flask, render_template, request, jsonify
import numpy as np
import sys
import tensorflow as tf
import os

# Check command-line arguments
if len(sys.argv) != 2:

    sys.exit("Usage: python app.py model.h5")

#Loads the pre-trained CNN model    
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
        
        #Reshape the input into a 4D array: 1 batch, 28x28 img, 1 channel (grayscale)
        data_4D = np.array(data).reshape(1, 28, 28, 1)

        #Prediction using the pre-trained CNN model
        classification = model.predict([data_4D])

        #Finds the index of the highest probability in the model's output
        prediction = int(classification.argmax())

        return jsonify({"message": "Matriz recibida correctamente", "data": prediction})

    except Exception as e:
        
        return jsonify({"error": f"Error procesando los datos: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="10000", debug=True)