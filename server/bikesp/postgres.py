from flask import g
import psycopg2

def get_cursor():
    if 'db' not in g:
        g.db = psycopg2.connect(
            host="postgres",
            database="bikesp_science",
            user="postgres",
            password="postgres"
        )
    return g.db.cursor()

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
