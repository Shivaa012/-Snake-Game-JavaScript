from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Render the Snake game page

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Bind to 0.0.0.0 to make the server accessible from other devices
