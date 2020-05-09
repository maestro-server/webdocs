Reports App
-------------

Reports app, generate reports

- Parse complex queries and generate reports
- Manage storage and control each technical flow
- Transform in artifact pdf, csv or json

----------

.. image:: ../../_static/screen/microservice_arq.png
   :alt: Maestro Server - Microservice

Reports app use `Flask <http://flask.pocoo.org>`_,  on python >3.5.

**Highlights**

.. image:: ../../_static/screen/reports_arch.png

- Controller used factory task to organize the workflow report generetaion.

- The process is divided

    - **general/pivot:** prepare and select result (communicate with discovery api)

    - **notification:** notificate any message (use discovery app to do)

    - **upload:** control flow data (throttle inserets)

    - **webhook:** insert/update data in mongodb or any endpoint

    - **aggregation** - Execute aggregation tasks and save in report collections

    - **notify** - Notify status task to websocket and audit services


----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/report-app.git

----------

**Running**

.. code-block:: bash

    python -m flask run.py --port 5005 

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run --port 5005 

    or 

    npm run server

----------

**Running workers**

.. code-block:: bash

    celery -A app.celery worker -E -Q report --hostname=report@%h --loglevel=info

    or 

    npm run celery

----------

.. Warning::

    On production we use gunicorn to handle requests.

    .. code-block:: python

        # gunicorn_config.py

        import os

        bind = "0.0.0.0:" + str(os.environ.get("MAESTRO_PORT", 5005))
        workers = os.environ.get("MAESTRO_GWORKERS", 2)
