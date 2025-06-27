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

class Query():
    def __init__(self):
        self.joins = []
        self.select_parts = []
        self.group_by_parts = []
        self.where_parts = []
    
    def add_trip_count(self):
        self.select_parts.append('COUNT(*)')
        self.table = "TRIP t"

    def add_trip_duration(self):
        self.select_parts.append('AVG(t.duration) AS duration')
        self.table = "TRIP t"

    def add_trip_distance(self):
        self.select_parts.append('AVG(t.distance) AS distance')
        self.table = "TRIP t"
    
    def aggregate_by_hours(self):
        self.select_parts.append('EXTRACT(HOUR FROM date) AS hour')
        self.group_by_parts.append('hour')
    
    def aggregate_by_payout(self):
        self.select_parts.append('t.payout AS payout')
        self.group_by_parts.append('payout')

    def aggregate_by_day_of_week(self):
        self.select_parts.append('TO_CHAR(date, \'Day\') AS day_of_week_name')
        self.group_by_parts.append('day_of_week_name')
    
    def aggregate_by_month(self):
        self.select_parts.append('DATE_TRUNC(\'month\', date) AS month')
        self.group_by_parts.append('month')

    def join_person(self):
        query = 'JOIN PERSON p ON t.idPerson = p.idPerson'
        if self.joins.count(query) > 0:
            return
        
        self.joins.append(query)

    def aggregate_by_week(self):
        self.select_parts.append('DATE_TRUNC(\'week\', date) AS week')
        self.group_by_parts.append('week')
    
    def aggregate_by_gender(self):
        self.select_parts.append('p.gender AS gender')
        self.group_by_parts.append('gender')
        self.join_person()

    def aggregate_by_race(self):
        self.select_parts.append('p.race AS race')
        self.group_by_parts.append('race')
        self.join_person()
    
    def build_query(self):
        query_string = f"SELECT {', '.join(self.select_parts)} FROM {self.table}"

        if self.joins:
            query_string += ' ' + '\n'.join(self.joins)

        if self.where_parts:
            query_string += ' WHERE ' + ' AND '.join(self.where_parts)
        
        if self.group_by_parts:
            query_string += ' GROUP BY ' + ', '.join(self.group_by_parts)
            query_string += ' ORDER BY ' + ', '.join(self.group_by_parts)

        query_string += ';'

        print(query_string)

        return query_string

    def execute(self):
        cursor = get_cursor()
        cursor.execute(self.build_query())
        data = cursor.fetchall()
        cursor.close()
        return data
