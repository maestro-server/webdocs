Audit App
---------


Audit App is a single application to track and record resources change:

- Track resources changes
- Create a change tree
- Store those data

----------

We use DDD approach to organize a code, they have an infra, repositories, entities (values objects), interfaces, application, and domain folders. `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_ 

.. image:: ../../_static/screen/fluxo_data.png
   :alt: Maestro Server - NodeJS DDD

Audit is made with `KrakenJs <http://krakenjs.com/>`_.

Follow a module flow diagram:

.. image:: ../../_static/screen/audit_arch.png

----------

**Installing node**

    - Nodejs 8 or above
    - MongoDB 3.x

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/audit-app.git

----------

**Installing dependencies**

.. code-block:: bash

    cd audit-app
    npm install

----------

**Configure env variables**

create .env file

.. code-block:: bash

    MAESTRO_PORT=10900
    MAESTRO_MONGO_URI='localhost'
    MAESTRO_MONGO_DATABASE='maestro-audit'
    MAESTRO_DATA_URI="localhost:5005"

and

.. code-block:: bash

    npm run server

----------

**Multiple env**

You can use .env files the set configurations

=================== ====================================
       Name                     Desc                                             
=================== ====================================
 .env                Default
 .env.test           Used on tests
 .env.development    node_env was setted ``development``
 .env.production     node_env was setted ``prodcution``
=================== ====================================

----------

We use PM2 to handle multiple threads, following the configuration.

PM2:

.. code-block:: bash

    npm install -g pm2

    # Create a file pm2.json

    {
    "apps": [{
        "name": "audit-app",
        "script": "./server.js",
        "env": {
            "production": true,
            "NODE_ENV": "production",
            "PORT": 10900
        }
    }]
    }

.. code-block:: bash

    pm2 start --json pm2.json

