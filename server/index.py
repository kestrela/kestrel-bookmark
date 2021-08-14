#!/usr/bin/env python
# -*- coding:utf-8 -*-
from flask import Flask,render_template, request, send_from_directory,jsonify, redirect
import os
from bs4 import BeautifulSoup
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = os.getcwd()
download_floder = app.config['UPLOAD_FOLDER'] + '/upload'
def allow_file(filename):
    allow_list = ['png', 'PNG', 'jpg', 'doc', 'docx', 'txt', 'pdf', 'PDF', 'xls', 'rar', 'exe', 'md', 'zip','html'] 
    a = filename.split('.')[1]
    if a in allow_list:
        return True
    else:
        return False

@app.route('/upload', methods=['POST', 'GET'])
def upload():
    file = request.files['file']
    if not file:
        return render_template('index.html', status='null')
   #print(file)
    
    if allow_file(file.filename):
        Soup = BeautifulSoup(file,'lxml');    #将要解析的文件传入
        #print(Soup);    #打印读入Soup中的内容
        types = Soup.select('DL > p > DT > H3');
        hrefs = Soup.select('DL > p > DT > DL > p > DT > A');
        print(types,hrefs)
        file.save(os.path.join(app.config['UPLOAD_FOLDER']+'/upload/', file.filename))
        return render_template('index.html', status='OK')
    else:
        return 'NO'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')