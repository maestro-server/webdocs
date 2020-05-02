Tests
====================

This section describe, how you can test each service.

Server APP
----------

Testing use Mocha + Chai and Sinon, test coverage with Istambul

.. code-block:: bash

    npm run test

    npm run e2e

    npm run unit

    #you can use a tdd approach to test the code
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

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/discovery-api/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/discovery-api?branch=master
================  ================================================================================================================================================================================== 



Reports APP
-------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/report-app/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/report-app?branch=master
================  ================================================================================================================================================================================== 


Data Layer APP
--------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/data-app/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/data-app?branch=master
================  ================================================================================================================================================================================== 


Analytics Apps
--------------

Testing use pytest

.. code-block:: bash

    npm run test

    python -m unittest discover

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/analytics-maestro/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/analytics-maestro?branch=master
================  ================================================================================================================================================================================== 


Analytics Front
---------------

Testing use pytest

.. code-block:: bash

    npm run e2e

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/analytics-front/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/analytics-front?branch=master
================  ================================================================================================================================================================================== 



Audit App
---------------

Testing use pytest

.. code-block:: bash

    npm run e2e

================  ================================================================================================================================================================================== 
Coveralls         .. image:: https://coveralls.io/repos/github/maestro-server/audit-app/badge.svg?branch=master
                        :target: https://coveralls.io/github/maestro-server/audit-app?branch=master
================  ================================================================================================================================================================================== 

