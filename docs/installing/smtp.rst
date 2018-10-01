SMTP Config
===========

To set up smtp, you need to declare some envrioment inside server-app

+---------------+-------------------------+------------------------------------------------------+
| SMTP_PORT     | 465                     |                                                      |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_HOST     | smtp.gmail.com          |                                                      |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_SENDER   | 'maestrosmtp@gmail.com' |                                                      |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_USERNAME | 'maestrosmtp'           |                                                      |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_PASSWORD | 'XXXX'                  |                                                      |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_USETSL   | true|false              | Enable TLS connect                                   |
+---------------+-------------------------+------------------------------------------------------+
| SMTP_IGNORE   | true|false              | During the connection, validate security connection? |
+---------------+-------------------------+------------------------------------------------------+

Example

.. code-block:: yaml

    version: '2'

    services:
    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - SMTP_PORT=465
        - SMTP_HOST=smtp.gmail.com
        - SMTP_SENDER='mysender@gmail.com'
        - SMTP_USERNAME=myusername
        - SMTP_PASSWORD=mysecret
        - SMTP_USETSL=true

-------

Services
--------

- Server App