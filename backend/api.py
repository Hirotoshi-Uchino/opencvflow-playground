from flask import Flask, escape, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/sum', methods=['GET'])
def sum():
    #print("Hello")
    #return "Hello"
    aNum = request.args.get('aNum')
    bNum = request.args.get('bNum')
    result = int(aNum) + int(bNum)
    return str(result)

if __name__ == "__main__":
    print('start Flask app.')
    app.run(host="localhost", port=9999)
