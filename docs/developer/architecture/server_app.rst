Server App
----------

Server App is the main application:

- Authentication and authorization
- Validate and create entities (crud ops)
- Proxy to others services

.. Warning::

	This service need to be expose externally

----------

We use DDD approach to organize a code, they have an infra, repositories, entities (values objects), interfaces, application, and domain folders. `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_ 

.. image:: ../../_static/screen/fluxo_data.png
   :alt: Maestro Server - NodeJS DDD

Server is made with `KrakenJs <http://krakenjs.com/>`_.

**Setup dev env**

.. code-block:: bash

    cd devtool/

    docker-compose up -d

It will run a mongodb and a fake stmp server

----------

**Installing node**

    - Nodejs >=8
    - MongoDB
    - Gcc + python (bcrypt package)

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/server-app.git

----------

**Installing dependencies**

.. code-block:: bash

    cd server-app
    npm install

----------

**Configure env variables**

create .env file

.. code-block:: bash

    SMTP_PORT=1025
    SMTP_HOST=localhost
    SMTP_SENDER='maestro@gmail.com'
    SMTP_IGNORE=true

    MAESTRO_PORT=8888
    MAESTRO_MONGO_URI='localhost'
    MAESTRO_MONGO_DATABASE='maestro-client'

    MAESTRO_DISCOVERY_URI=http://localhost:5000 // list and get status connection
    MAESTRO_REPORT_URI=http://localhost:5005 // create and get reports data
    MAESTRO_ANALYTICS_URI=http://analytics:5020 // create analytics report
    MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999 // get analytics html
    MAESTRO_AUDIT_URI=http://audit:10900 // notify audit update event and get history track

and run the app

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

**Database migration**

Run the migration command.

.. code-block:: bash

    npm run migrate

    # to rollback the migration, run
    npm run down_migration

----------

We use PM2 to handle multiple threads, following the configuration.

PM2:

.. code-block:: bash

    npm install -g pm2

    # Create a file pm2.json

    {
    "apps": [{
        "name": "server-maestro",
        "script": "./server.js",
        "env": {
        "production": true,
        "PORT": 8888
        }
    }]
    }

.. code-block:: bash

    pm2 start --json pm2.json
