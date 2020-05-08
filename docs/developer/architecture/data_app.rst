
Data APP
---------------

Data app is a gateway connection to the mongodb.

- CRUD database operations

Data app use `Flask <http://flask.pocoo.org>`_,  on python >3.5.

---------------

.. image:: ../../_static/screen/data.png
   :alt: Maestro Server - Data architecture

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

It setup a mongodb

----------

**Installation with python 3**

    - Python >3.4
    - MongoDB

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/data-app.git

----------

**Install  run api**

.. code-block:: bash

    python -m flask run.py --port 5010 

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run --port 5010 

    or 

    npm run server

----------

.. Warning::

    On production we use gunicorn to handle requests.

.. code-block:: python

	# gunicorn_config.py

	import os

	bind = "0.0.0.0:" + str(os.environ.get("MAESTRO_PORT", 5010))
	workers = os.environ.get("MAESTRO_GWORKERS", 2)

