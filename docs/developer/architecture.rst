Architecture
====================

Macro Map
---------

Services relation, each service comunite by `rest` (http) calls.

.. image:: ../_static/screen/arch_1.png


Server App
----------

We using DDD to organize the code, has infra, repositories, entities (values objects), interfaces, application, and domain, if like to learn read this article is very cool `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_ 

.. image:: ../_static/screen/fluxo_data.png

Server its have constructed with `KrakenJs <http://krakenjs.com/>`_, we create a lot of middleware and organize by domain.

Discovery App
-------------

.. image:: ../_static/screen/discovery.png

Discovery using Flask <http://flask.pocoo.org/>,  and python >3.5, has api rest, and tasks.

Scheduler App
-------------

.. image:: ../_static/screen/scheduler.png

Discovery using Flask <http://flask.pocoo.org/>,  and python >3.5, used Celery Beat feature to call tasks.

