from flask import Flask, render_template, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='build/static', template_folder='build')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return render_template('index.html')

# Mock API endpoints for development
@app.route('/api/team-members')
def get_team_members():
    return jsonify({
        'teamMembers': [
            {'id': '1', 'name': 'John Doe', 'email': 'john.doe@example.com', 'avatarUrl': 'https://i.pravatar.cc/150?img=1'},
            {'id': '2', 'name': 'Jane Smith', 'email': 'jane.smith@example.com', 'avatarUrl': 'https://i.pravatar.cc/150?img=2'},
            {'id': '3', 'name': 'Bob Johnson', 'email': 'bob.johnson@example.com', 'avatarUrl': 'https://i.pravatar.cc/150?img=3'},
            {'id': '4', 'name': 'Alice Williams', 'email': 'alice.williams@example.com', 'avatarUrl': 'https://i.pravatar.cc/150?img=4'},
            {'id': '5', 'name': 'Charlie Brown', 'email': 'charlie.brown@example.com', 'avatarUrl': 'https://i.pravatar.cc/150?img=5'},
        ]
    })

if __name__ == '__main__':
    app.run(debug=True)
