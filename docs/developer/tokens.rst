JWT Tokens
==========

Some endpoint needs to be authenticated, Maestro use JWT token to authenticate a user and two or more systems, each system has own secret token shared between concerned services.
Example, WebSocket only accept a request if another service uses a specific jwt (maestro_secretjwt_socket).

Follow an architecture of switch tokens

------------

.. image:: ../_static/screen/tokens.png