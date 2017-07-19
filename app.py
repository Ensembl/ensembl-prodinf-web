from flask import Flask, request, jsonify
from ensembl_prodinf import HiveInstance
import json
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

hive = HiveInstance(app.config["HIVE_URI"])
analysis = app.config["HIVE_ANALYSIS"]

@app.route('/submit', methods=['POST'])
def submit():

    if request.headers['Content-Type'] == 'application/json':
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
