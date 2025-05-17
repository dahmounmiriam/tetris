from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='web/static', template_folder='web/templates')

# Serve the original Tetris game
@app.route('/classic')
def classic():
    return render_template('index.html')

# Serve the React app for enhanced 3D Tetris
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join('web/static/react-build', path)):
        return send_from_directory('web/static/react-build', path)
    return send_from_directory('web/static/react-build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
