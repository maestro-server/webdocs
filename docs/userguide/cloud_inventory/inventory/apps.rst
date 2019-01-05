Apps
----
`Inventory > Application`

Apps are it all services with is a business responsibility, normally it is an application made by the developer and deploys.

Some fields:

============ =============================================================================================================================
Field        Functional 
============ ============================================================================================================================= 
Name         Hostname, accept duplicate hostname per team, but the inveotry will warning about this.
Environment  Production | Development | Stage
Language
Cluster mode
============ =============================================================================================================================


Specification

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Role         Point information like endpoint, commands, health check, its good for doc.
System       Systems related it.
Server       Servers deployed by app.
Deploy       List of ways to deploy this app.
============ ======================================================================================================================================================================================================== 

------------

.. image:: ../../../_static/screen/app_language.png
   :alt: Maestro Server - App Language

Choose language like node or php.

------------

Add dependency

.. Note::

        Dependency is a relation between two or more applications, example its database its a dependency of app4, and app4 its dependency of loadbalance.

.. image:: ../../../_static/screen/server_deps.png
   :alt: Maestro Server - Dependecy

Add outers applications with dependency.