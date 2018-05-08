
Data APP
---------------

Data app, database gateway micro service
- Request and response database operations

Simple Rest API using `Flask <http://flask.pocoo.org>`_ (python) + pymongo.

**Setup dev env**

.. code-block:: bash

    pip install

	FLASK_APP=run.py FLASK_DEBUG=1 flask run --port=5010

	or

	npm run server

---------------

Mongo service

.. code-block:: bash

    cd devtool/

    docker-compose up -d

Will be setup mongodb
