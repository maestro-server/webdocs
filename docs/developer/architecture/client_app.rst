FrontEnd - Client App
---------------------

The front end application, made using Vue2.

- Html and Js client
- Single page app (SPA)
- Cache layer

----------

**Vue2 Macro Architecture**

.. image:: ../../_static/screen/client_arch.png

**Important topics**

- Front end application are divided on:

	- **src/pages:** templates and business rules (domain layer)

	- **resources:** factories, modals, and cache managers (infrastructure layer)

----------

A single component structure:

.. image:: ../../_static/screen/client_component.png
   :alt: Maestro Server - Vue architecture

----------

**Installing node**

    - Nodejs >= 7.4

Download the repository

.. code-block:: bash

    git clone https://github.com/maestro-server/client-app.git

----------

**Installing  dependencies**

.. code-block:: bash

    npm install

----------

**Build**

.. code-block:: bash

    npm run build

----------

**Dev server**

.. code-block:: bash

    npm run serve

