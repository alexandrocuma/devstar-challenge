from flask import Flask
from flask_cors import CORS
from graphql_server.flask import GraphQLView

from schema import schema
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

# @app.route('/graphql', methods=['OPTIONS'])
# def options_handler():
#     return '', 200, {
#         'Access-Control-Allow-Origin': '*',
#         'Access-Control-Allow-Headers': 'Content-Type',
#         'Access-Control-Allow-Methods': 'POST, OPTIONS'
#     }

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3001)

