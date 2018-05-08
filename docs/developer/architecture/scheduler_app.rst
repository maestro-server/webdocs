
Scheduler App
-------------

Scheduler use celery beat to control scheduler jobs, customized scheduler class based at `Zmap CeleryBeat Mongo <https://github.com/zmap/celerybeat-mongo>`_.

.. image:: ../../_static/screen/scheduler.png

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