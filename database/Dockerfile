# Use the official PostgreSQL 14 image from Docker Hub.
# 'alpine' is a lightweight version.
FROM postgres:14-alpine

# Copy the initialization script into a special directory in the container.
# The postgres image automatically runs any .sql files in /docker-entrypoint-initdb.d
# when the database is first created.
COPY init.sql /docker-entrypoint-initdb.d/
