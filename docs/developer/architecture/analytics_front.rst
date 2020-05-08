Analytics Front
---------------

Analytics Front Application is responsable to expose diagrams to the user:

- Public/private authorization
- Expose svgs diagrams
- Upload private SVGs

.. Warning::
	This service need to expose an external access

----------

We use DDD approach to organize a code, they have an infra, repositories, entities (values objects), interfaces, application, and domain folders. `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_ 

.. image:: ../../_static/screen/fluxo_data.png

Analytics is made with `KrakenJs <http://krakenjs.com/>`_.

Follow a module flow diagram:

.. image:: ../../_static/screen/analytics_front.png
   :alt: Maestro Server - Analytics front architecture

----------

**Installing node**

    - Nodejs >=8
    - MongoDB >=3.4
    - RabbitMQ
    - AWS S3 (To use as a external storage)

To Download the repository, go to:

.. code-block:: bash

    git clone https://github.com/maestro-server/analytics-front.git

----------

**Installing dependencies**

.. code-block:: bash

    cd analytics-front
    npm install

----------

**Configure env variables**

create .env file

.. code-block:: bash

    MAESTRO_PORT=9999
    MAESTRO_MONGO_URI='localhost'
    MAESTRO_MONGO_DATABASE='maestro-client'

and

.. code-block:: bash

    npm run server

----------

**Multiple env**

Every config can be pass by env variables, but if you like, can be organize by .env files,

=================== ================================
       Name                     Desc                                             
=================== ================================
 .env                Default
 .env.test           Used on run test
 .env.development    node_env is setted development
 .env.production     node_env is setted prodcution
=================== ================================

**Migrate setup data**

create .env file

.. code-block:: bash

    npm run migrate

----------

We use PM2 to handle multiple threads, following the configuration.

PM2:

.. code-block:: bash

    npm install -g pm2

    # Create a file pm2.json

    {
    "apps": [{
        "name": "analytics-front",
        "script": "./server.js",
        "env": {
            "production": true,
            "NODE_ENV": "production",
            "PORT": 9999
        }
    }]
    }

.. code-block:: bash

    pm2 start --json pm2.json
