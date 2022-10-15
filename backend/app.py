from flask import Flask, render_template, request
import sqlite3 as sql
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('my_event')
def handle_my_custom_event(arg1, arg2, arg3):
    print('received args: ' + arg1 + arg2 + arg3)


@ socketio.on('json')
def handle_json(json):
    send(json, json=True)


@ socketio.on('my event')
def handle_my_custom_event(json):
    emit('my response', json)


@ app.route('/addrec', methods=['POST', 'GET'])
def addrec():
    if request.method == 'POST':
        msg = ''
        print('nm')

        try:
            request_data = request.get_json()
            nm = request_data['nm']
            print(nm)

            addr = request_data['add']
            city = request_data['city']
            pin = request_data['pin']

            with sql.connect("database.db") as con:
                cur = con.cursor()
                print(nm)
                cur.execute(
                    "INSERT INTO students(name, addr, city, pin)  VALUES(?, ?, ?, ?)", (nm, addr, city, pin))

                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"

        finally:
            return {'msg': msg}
            con.close()
    if request.method == 'GET':
        return 'get'


@ app.route('/list')
def list():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cursor = con.cursor().execute("select * from students")
    columns = [column[0] for column in cursor.description]
    print(columns)

    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))

    print(results)
    return {'rows': results}


if __name__ == '__main__':
    socketio.run(app)
