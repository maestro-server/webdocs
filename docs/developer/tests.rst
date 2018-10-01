Tests
====================

Each service need to be testing.

Server APP
----------

Testing use Mocha + Chai and Sinon, test coverage with Istambul

.. code-block:: bash

    npm run test

    npm run e2e

    npm run unit

    #if you like to code and testing in the same time
    npm run tdd 


.. code-block:: bash

    gulp test_e2e

--------

**Coverage**

.. code-block:: bash

    istanbul cover ./node_modules/mocha/bin/_mocha test/**/*js


================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/server-app/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/server-app?branch=master
================  ================================================================================================================================================================================== 


Discovery APP
-------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover


Reports APP
-------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

Data Layer APP
--------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

Analytics Apps
--------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

Analytics Front
---------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover
