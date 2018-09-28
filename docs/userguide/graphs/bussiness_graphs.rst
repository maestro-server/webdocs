Bussiness Graphs
================

You can create an architecture of one or more systems, relation of each application can be made in application single page on dependency field, or fast way using dependency maker page.

To create a graph, go to Analytics > Bussiness Graph > New Graph

------------

.. image:: ../../_static/screen/analytics_enter.png


On create graph modal, have three options, create by System, by Client or by App


.. image:: ../../_static/screen/analytics_modal1.png

================  ============================================================
by System          Will use all entry apps registered on selected system.
by Client          Will use all entry apps registered in all client systems.
by App             Will use these applications as entry application.
================  ============================================================

------------

Entries applications
--------------------

Maestro use a entry applications to start create a graph tree based on deps links. Can be one and more.

.. figure:: ../../_static/screen/entry_app.png

    In this example, app4 its a entry applications.


.. Note::

    Except a entry applications, only linked apps will be drawed.

.. Note::

    You can choose with applications can be used as entry point on each system. (It's a endpoint tab).

------------

Filled graph name field, and starting to figure out all applications you like to set as entry point application.

.. figure:: ../../_static/screen/analytics_modal2.png

    We choose to set only app4 as entry point.

------------

After some seconds all map its create, you can see density, total conections, histograms, all clients, systems and applications linked and the graph inself.

* **Density** - The density for undirected graphs is \[d = \frac{m}{n(n-1)},\] where \(n\) is the number of nodes and \(m\) is the number of edges in \(G\).

The density is 0 for a graph without edges and 1 for a complete graph. The density of multigraphs can be higher than 1.

Self loops are counted in the total number of edges so graphs with self loops can have density higher than 1.

More details - `NetworkX Graph - Density <https://networkx.github.io/documentation/latest/reference/generated/networkx.classes.function.density.html/>`_.

* **Histogram** - Total by deep dependency.

.. figure:: ../../_static/screen/analytics_single.png

    If you like, can expand the graph.

------------

Expanded graph, you can export svg, png or shared this graph. Also, you can see each connection with mouse hover in each line.

.. image:: ../../_static/screen/analytics_graph.png

------------

On shared modal, click in "see public link", this will be generate a shared link, it´s possible to embed on external tools, like Confluence.

.. image:: ../../_static/screen/modal_public.png