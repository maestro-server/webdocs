==========
User Guide
==========

In this section we will cover how the maestro server works from the user's point of view, if you want to install and configure the Maestro server you should go to the installation section, if you would like to develop a new functionality or a new service, you should go to the developer section.

Maestro is an inventory system for multi platform environments, multi-cloud for enterprise companies. It aim to organize in a single dashboard with relation between servers, applications, systems and clients.

The dashboard was divided into three parts:

- **Cloud inventory:** The first part you will figure out the whole inventory, such as servers, applications and systems as well as the relationship between them. In this area you can also connect third-party providers to self-discover and self-update.

- **Analytics:** In the second part you can view the relationships between applications, systems architecture, a map of dependencies and can even share these information in third-party applications as Confluence, GitHub and more.

- **Reports:** In this area you can generate advanced reports such as the list of servers for a given client.

.. figure:: ../_static/screen/intro.png

Cloud Inventory
===============

We can use to organize each part of our architecture by:

.. toctree::
   :maxdepth: 2

   cloud_inventory/inventory/index
   cloud_inventory/confsettings
   cloud_inventory/history_track

Auto Discovery
==============

Maestro can connect in multiples cloud providers. You can track in a single dashboard, everything was created on multi-cloud and multi-region architecture.

To set up a new connection, you should follow three steps.

.. image:: ../_static/screen/connection.gif
   :alt: Maestro Server - Connections

------

1 - Create datacenter on Maestro (select all regions used on that provider)

2 - Create a new connection on a given datacenter. - Go to inventory > connections.

.. image:: ../_static/screen/conn_p.png
   :alt: Maestro Server - Create connection

3 - Allowing Maestro server to reach out a third provider using a readonly cloud credential such as aws access/secret key, azure subscription and more.

------------

.. toctree::
   :maxdepth: 2

   autodiscovery/index

Graphs - Architecture maps
==========================

Visualize your cloud architecture

.. toctree::
   :maxdepth: 2

   graphs/bussiness_graphs
   graphs/gpdependencies


Reports - Generate advanced reports
===================================

.. toctree::
   :maxdepth: 2

   reports/reports
   reports/scheduler

ACLs - Users and Teams
======================

.. toctree::
   :maxdepth: 2

   users/accessauth
