Databases
---------
`Inventory > Database`

Databases are it all with data persistence responsibility, can be relational, norelational, in memory, distribuited storage and etc.

We have some specific database, in this case, can have exclusive form

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Oracle       You can register ASM DB, CDBs, configurations like Rac, grid system and golden gate backups
MySQL        Register some features like Master/Slave, Cluster with Aurora, backups services and more.
============ ======================================================================================================================================================================================================== 

**Oracle**

Support version 10g, 11g and 12g

.. figure:: ../../../_static/screen/db_oracle_types.png

    Choose how Oracle will be storage data, can be local disk, networks disk or ASM.

------------

.. image:: ../../../_static/screen/db_oracle_cluster.png
   :alt: Maestro Server - Database Oracle Cluster


Choose how Oracle will be run, single node, RAC/Grid mode.

------------

.. image:: ../../../_static/screen/db_oracle_cbds.png
   :alt: Maestro Server - Database Oracle CDBS

Which CDBS run in oracle database. 

------------

.. figure:: ../../../_static/screen/db_oracle_server.png

Which servers this db run, if is single node, its only one server, but if is rac setup, will be run in multiple servers.

**MySQL**

Support MySQL, AWS Aurora, MariaDB, Percona and etc

.. image:: ../../../_static/screen/db_mysql_type.png
   :alt: Maestro Server - Database MYSQL

Version and mode to run.


**Other databases**

Partial support whitch all bases

.. figure:: ../../../_static/screen/db_other_type.png
   :alt: Maestro Server - Database NoSQL

Version and mode to run.

------------

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Spec         Point information like endpoint, port, commands, health check, its good for doc.
Datacenters  Provider, (only by third party services)
Server       Servers deployed by db.
CDBS         Used only by Oracle DB
System       Systems related it.      
============ ======================================================================================================================================================================================================== 