Reports App
-------------

.. image:: ../../_static/screen/microservice_arq.png

Reports using `Flask <http://flask.pocoo.org>`_,  and python >3.6, used Celery Beat feature to call tasks, have strong dependences with discovery app and server app, reports use a standalone MongoDB (only reports app see this db).

.. image:: ../../_static/screen/reports.png

**Important topics**

- Controller used factory task to organize the workflow report generetaion.

- The process is divided in 4 parts

    - **general/pivot:** prepare and select result (communicate with discovery api)

    - **notification:** notificate any message (use discovery app to do)

    - **upload:** control flow data (throttle inserets)

    - **webhook:** insert/update data in mongodb or an y endpoint