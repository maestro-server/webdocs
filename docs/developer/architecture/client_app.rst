Client App
----------

The front end is written with:

====================== ===========================================================================
Vue2                   Main framework, using by react and manager views, routes and temaplates, 
                       use vue-loader with webpack                                   
Webpack2               bundler generate                                                                                                                       
Bootue                 All micro components, like buttons, tables, forms and etc, 
                       its 100% Bootstrap3 components built with Vue2, 100% standalone, no query.  
Nginx                  Using for proxy reverse                                                                                                                
Mocha / Chai / Sinon   Test, asserts and mock library.                                                                                                        
====================== ===========================================================================

----------

**Vue2 Macro Architecture**

.. image:: ../../_static/screen/client_arch.png

**Important topics**

- Front end application is divided in:

	- **src/pages:** templates and bussiness rules (domain layer)

	- **resources:** factories, modals, and cache managers (infrastructure layer)

----------

A single folder structure components normally use:

.. image:: ../../_static/screen/client_component.png