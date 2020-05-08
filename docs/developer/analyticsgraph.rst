Graphs Analytics Algorithm 
==========================

This section will describe about analytics graph algorithm.

 - The analytics work flow

.. image:: ../_static/screen/analytics_internal.png
   :alt: Maestro Server - Analytics maestro architecture

----------

Making graph lookup on the mongodb
----------------------------------

The graph lookup creates a python dict using mongodb graph lookup feature, they use the ``application id`` on ``dependency field``.

.. image:: ../_static/analytics_graphs/ana_mongo.jpg

----------

Creating a networkX graph
-------------------------

The next step is to create a networkX object based on graph lookup.

We have a recursive function inside each leaf on the tree, the order will be applied using a well defined rules, the results will be a new graph tree and a position matrix for each leaf, this result fixed sorts, duplication and conflicts issues.

.. image:: ../_static/analytics_graphs/ana_recursive.jpg
   :alt: Maestro Server - Analytics Recursive

An example of code example showing a recursive function

.. code-block:: python

    def _recursive_draw(self, app, i=0, OHelper=HelperOrderedSuccers):
        if i > 30:
            return

        for item in app:
            if not self._grid.in_index(item):
                node = self._graph.nodes[item]
                helper = self.add_pos_grid(node)

                succ = OHelper(helper).get_succers()
                self._recursive_draw(succ, i + 1)


-----


Rules
-----

Follow all rules with can be applied during the create of a new tree. Those rules can be overread each other.

**Growing node**

	- **When:** If the node have more than one child, growing the node to be equal of the number of child
	- **Transform:** Set the node size to be equal to the number of child

**Child Balance**

	- **When:** If the parent node have more than two child.
	- **Transform:** Create a dummy item beside to node parent.

**Chess Pawn**

	- **When:** If the app is an entry point and have parent.
	- **Transform:** Skipped one column

.. image:: ../_static/analytics_graphs/ana_analytics.png
   :alt: Maestro Server - Analytics

**Chess horse**

	- **When:** If the node have a top obstacle which other nodes point out to a common dependency.
	- **Transform:** First push back the dependency to a clear column, and then create a dummy path to the new column.

.. image:: ../_static/analytics_graphs/ana_chess.png
   :alt: Maestro Server - Analytics chess rules

**Clear rows**

	- **When:** If a whole column was empty.
	- **Transform:** Delete these column and rebalance the grid.

.. image:: ../_static/analytics_graphs/ana_clear.png
   :alt: Maestro Server - Analytics clear system


----------

Enrichment data phase
---------------------

Next step is an enrichment data layer. To filled with a data server information.

The enrichment step gets two dataset the first one is a json python dict represent as a graph tree, and the second one is a matrix position grid. 

.. image:: ../_static/analytics_graphs/ana_enri.jpg
   :alt: Maestro Server - Analytics Enrichment

----------

Draw phase
-----------

The last but not least, it is the dra step, they get the graph tree, matrix position and servers data to make the svgs.

.. image:: ../_static/analytics_graphs/ana_rotation.png
   :alt: Maestro Server - Analytics Rotation

.. image:: ../_static/analytics_graphs/ana_vertical.png
   :alt: Maestro Server - Analytics Vertical