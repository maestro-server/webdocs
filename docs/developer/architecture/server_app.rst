Server App
----------

Server App main application, some responsibility is 

- Authentication and authorization
- Validate and create entities (crud ops)
- Proxy to others services

.. Warning::
	This service can be external access

----------

We using DDD to organize the code, has infra, repositories, entities (values objects), interfaces, application, and domain, if like to learn read this article is very cool `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_ 

.. image:: ../../_static/screen/fluxo_data.png
   :alt: Maestro Server - NodeJS DDD

Server its have constructed with `KrakenJs <http://krakenjs.com/>`_, we create a lot of middleware and organize by domain.

**Setup dev env**

.. code-block:: bash

    cd devtool/

    docker-compose up -d

Will be setup mongodb and fake smtp server

----------

**Installation with node**

    - Nodejs 8 or above
    - Npm
    - MongoDB
    - Gcc + python (bcrypt package, if need be compilate)

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/server-app.git

----------

**Install  dependences**

.. code-block:: bash

    cd server-app
    npm install

----------

**Configure some env variable**

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

For production environment, need to use pm2 or forever lib.

Like (PM2):

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
