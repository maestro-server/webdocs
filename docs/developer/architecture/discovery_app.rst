Discovery App
-------------

.. image:: ../../_static/screen/discovery.png

Discovery using `Flask <http://flask.pocoo.org>`_,  and python >3.5, has api rest, and tasks.

**Setup dev env**

.. code-block:: bash

    cd devtool/

    docker-compose up -d

Will be setup rabbitmq and redis

**Windows Env**

If you use windows, celery havent support for windows, the last version is 3.1.25.

.. code-block:: bash

    pip3 install celery==3.1.25

    npm run powershell

**Important topics**

- Controller used factory dc abstract to create easy way to make CRUD in mongodb

- The crawler is divided in 3 parts

	- **api:** connect in api provider and get result

	- **translate:** normalize the data

	- **insert:** insert/update data in mongodb

	Each step have unique task.

- Config is managed by env variables, need to be, because in production env like k8s is easier to manager the pods.

- Repository has pymongo objects.

----------

**Flower - Debbug Celery**

You can install a flower, it's a control panel to centralize results throughout rabbitMQ, very useful to troubleshooting producer and consumers.

.. code-block:: bash

    pip install flower

    flower -A app.celery

    npm run flower