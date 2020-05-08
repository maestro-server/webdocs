Analytics Maestro
-----------------

Analytics App are responsable to get the dependency tree and do a diagram: 

- Create bussiness diagram
- Drawing

----------

.. image:: ../../_static/screen/analytics_internal.png
   :alt: Maestro Server - Analytics maestro architecture

Analytics app use `Flask <http://flask.pocoo.org>`_,  on python >3.5.

**Setup dev env**

.. code-block:: bash

    cd devtool/

    docker-compose up -d

It will be set a rabbitmq and a redis

**Highlights**

- The diagram lookup and draw process are compound by:

    - **entry:** The first task, they get all entries application and send to graphlookup.

    - **graphlookup:** Request for ``Data App`` a application lookup using a MongoDB $graphLookup feature.

    - **network bussiness:** Do a grid tree, and then send to ``enrichment task`` and ``info task``.

    - **enrichment:** Request for ``Data App`` more data abouts servers.

    - **info bussiness:** Calculate histogram, counts, density and connections.

    - **network client:** Request for ``Data App`` all clients information.

    - **draw bussiness:** Draw svgs.

    - **notification:** Send updates to ``Data App``.

    - **send front app:** Send the svg to ``Analytics Front app``.


- The configuration are managed by env variables

----------

**Flower - Debbug Celery**

Real-time monitoring using Celery Events

- Task progress and history
- Ability to show task details (arguments, start time, runtime, and more)
- Graphs and statistics

.. code-block:: bash

    pip install flower

    flower -A app.celery

    npm run flower

----------

**Installation guide**

    - Python >3.4
    - RabbitMQ

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/discovery-api.git

----------

**Installing dependencies**

.. code-block:: bash

    pip install -r requeriments.txt

----------

**Running**

.. code-block:: bash

    python -m flask run.py

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run

    or 

    npm run server

----------

**Running workers**

.. code-block:: bash

    celery -A app.celery worker -E -Q analytics --loglevel=info

    or 

    npm run celery

----------

.. Warning::

    On production we use gunicorn to handle requests.

    .. code-block:: python

        # gunicorn_config.py

        import os

        bind = "0.0.0.0:" + str(os.environ.get("MAESTRO_PORT", 5020))
        workers = os.environ.get("MAESTRO_GWORKERS", 2)

