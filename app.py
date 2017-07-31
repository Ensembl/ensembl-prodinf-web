from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from ensembl_prodinf import HiveInstance
import json
import logging
import re

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

cors = CORS(app)

hive = HiveInstance(app.config["HIVE_URI"])
analysis = app.config["HIVE_ANALYSIS"]

# use re to support different charsets
json_pattern = re.compile("application/json")

@app.route('/submit', methods=['POST'])
def submit():

    print request.headers['Content-Type']
    if json_pattern.match(request.headers['Content-Type']):
        job = hive.create_job(analysis, request.json)
        return jsonify({"job_id":job.job_id});
    else:
        return "Could not handle input of type "+request.headers['Content-Type'], 415


@app.route('/results/<int:job_id>', methods=['GET'])
def results(job_id):
    try:
        logging.info("Retrieving job with ID "+str(job_id))
        return jsonify(hive.get_result_for_job_id(job_id))
    except ValueError:
        return "Job "+str(job_id)+" not found", 404

@app.route('/list_databases', methods=['GET'])
def list_databases():
    try:
        db_uri = request.args.get('db_uri')
        query = request.args.get('query')
        logging.info("Looking up "+str(query)+" on "+str(db_uri))
        engine = create_engine(db_uri)
        s = text("select schema_name from information_schema.schemata where schema_name rlike :q")
        noms = []
        with engine.connect() as con:
            noms = [str(r[0]) for r in con.execute(s, {"q":query}).fetchall()]
        return jsonify(noms)
    except ValueError:
        return "Job "+str(job_id)+" not found", 404
