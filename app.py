from flask import Flask, render_template, request, jsonify

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

        print(data)  

        return jsonify({"message": "Matriz recibida correctamente", "data": data})

    except Exception as e:
        
        return jsonify({"error": f"Error procesando los datos: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)