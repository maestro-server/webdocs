Themes
======

You can change the maestro theme, its a variable environment into client app

.. code-block:: yaml

    client:
        image: maestroserver/client-maestro
        ports:
        - "80:80"
        environment:
        - "API_URL=http://localhost:8888"
        - "THEME=gold"

There are fill options to choose.

Default
-------

.. image:: ../_static/screen/theme_default.png
   :alt: Maestro Server - Lotus theme

THEME=lotus

Gold
-------

.. image:: ../_static/screen/theme_gold.png
   :alt: Maestro Server - Gold theme

THEME=gold

Wine
-------

.. image:: ../_static/screen/theme_wine.png
   :alt: Maestro Server - Wine theme

THEME=wine


Blue
-------

.. image:: ../_static/screen/theme_blue.png
   :alt: Maestro Server - Blue theme

THEME=blue

Dark
-------

.. image:: ../_static/screen/theme_dark.png
   :alt: Maestro Server - Dark theme

THEME=dark


Green
-------

.. image:: ../_static/screen/theme_green.png
   :alt: Maestro Server - Green theme

THEME=green

Orange
-------

.. image:: ../_static/screen/theme_orange.png
   :alt: Maestro Server - Orange theme

THEME=orange


