Databases
---------
`Inventory > Database`

Databases can be relational, no relational, in memory, distribuited storage and etc.

The database inventory have a exclusive form for Oracle and MySQL, otherwise the generic form are able to fit on all databases types.

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Oracle       You can register ASM DB, CDBs, RAC, grid system and/or golden gate backups
MySQL        It able to register features as Master/Slave, Aurora cluster, backups setups and more.
============ ======================================================================================================================================================================================================== 

**Oracle**

Support version 10g, 11g and 12g

.. figure:: ../../../_static/screen/db_oracle_types.png

    Choose how Oracle will be storage the data, as a local disk, ASM or distributed storage system.

------------

.. image:: ../../../_static/screen/db_oracle_cluster.png
   :alt: Maestro Server - Database Oracle Cluster


Choose how Oracle will be run, single node, RAC/Grid mode.

------------

.. image:: ../../../_static/screen/db_oracle_cbds.png
   :alt: Maestro Server - Database Oracle CDBS

Which CDBS run on oracle database. 

------------

.. figure:: ../../../_static/screen/db_oracle_server.png

Which servers this db ran, if is a single node, a rac or it running on multiple servers.

-----

**MySQL**

Support MySQL, AWS Aurora, MariaDB, Percona and etc

.. image:: ../../../_static/screen/db_mysql_type.png
   :alt: Maestro Server - Database MYSQL

Which version and mode.


**Generic database**

Partial support for all databases

.. figure:: ../../../_static/screen/db_other_type.png
   :alt: Maestro Server - Database NoSQL

Which version and mode.

------------

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Spec         Specification as a endpoint, port, commands, health check and more.
Datacenters  Provider
Server       Where this database are deployed.
CDBS         CDBS used by Oracle DB
System       The system on which this database    
============ ======================================================================================================================================================================================================== 