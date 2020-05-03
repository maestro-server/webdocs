
Scheduler App
-------------

Scheduler App service to manage and execute jobs

- Schedule jobs, interval or crontab
- Requests chain jobs
- Modules
    - Webhook: Call URL request
    - Connections: Call Crawler task

----------   

Scheduler use apscheduler to control scheduler jobs, `Apscheduler documentation <https://apscheduler.readthedocs.io/en/latest/>`_

.. image:: ../../_static/screen/scheduler.png
   :alt: Maestro Server - Scheduler

----------    

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/scheduler-app.git

**Important topics**

- Celery Beat consult schedulers collection in mongodb every 5 seconds and updated time to call the tasks.

- Have 2 tasks called by beat

	- **webhook:** Call HTTP request accordly arguments. 

	- **connection:** Consulting connection data, after call webhook.

- Have support tasks called by outhers tasks.

	- **chain and chain_exec:** Called by webhook, this create another job after the first finish.

	- **depleted_job:** If any job recevied something wrong, this taks is called e depleted that job.

    - **notify_event:** Send notification event. 


----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/scheduler-app.git

----------

**Install  run celery beat**

.. code-block:: bash

    celery -A app.celery beat -S app.schedulers.MongoScheduler --loglevel=info

    or 

    npm run beat

----------

**Install  run rabbit workers**

.. code-block:: bash

    celery -A app.celery worker -E --hostname=scheduler@%h --loglevel=info

    or 

    npm run celery
    