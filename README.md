# Handwritten Digit Recognition WebApp

live demo: https://digit-recognition-webapp.onrender.com/

## Project Description

This project demonstrates the development of a deep learning-based web application using Flask and TensorFlow for handwritten digit recognition. The application involves two main components:

1. **Model Training (training.py):**

The project trains a Convolutional Neural Network (CNN) on the MNIST dataset, a widely used benchmark for handwritten digit recognition. The key features of the training script include: A convolutional layer with 32 filters and ReLU activation, A max-pooling layer for dimensionality reduction and an output layer with a softmax activation for multi-class classification of digits (0–9).

2. **Web Application (app.py):**

The Flask web application serves as an interface for real-time digit prediction using the trained model. Accepts JSON input containing a 28x28 grayscale image matrix. Reshapes the matrix into a format compatible with the CNN (1x28x28x1). Performs prediction using the trained model and returns the predicted digit as JSON response.

## Requirements

```pip install flask```
```pip install numpy```
```pip install tensorflow```

## Usage

Train the model using the command:

```python training.py model.h5```

Run the web application with the trained model:

```python app.py model.h5```

and then access http://localhost:10000/

![demo](https://github.com/ManuelGuerra1987/Digit-Recognition-WebApp/blob/main/demo.jpg)
