from flask import Flask, render_template, request , redirect , url_for , send_from_directory, session,jsonify
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_restful import Api, Resource, reqparse
from werkzeug.utils import secure_filename
from AutoGenerate import AutoGenerate

##TODO: create custom name timestamp on filename
app = Flask(__name__)
api = Api(app)

# app.secret_key = b'f_alfa4Q8z\n\xec]/'
photos = UploadSet('photos', IMAGES)

app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
app.config['CHANGED_PHOTOS_DEST'] = 'static/trans/'
configure_uploads(app, photos)

#send with POST request and photo 
#response with json

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST' and 'photo' in request.files:
        thisfile = request.files['photo']
        filename = photos.save(thisfile, name = secure_filename(thisfile.filename) )
        AutoGenerate(inputpath = app.config['UPLOADED_PHOTOS_DEST']+'/'+filename,outputpath = app.config['CHANGED_PHOTOS_DEST']+'/'+filename)
            # def AutoGenerate(inputpath ='static/img/importfile.jpg',outputname = 'static/trans/outputfile.bmp',threshhold = 0,brightness=0,contrast = 0,widthheightratio = 1.307,outputpixelWidth=133,outputpixelHeight=114 ):
        return jsonify({ "success": True ,'id':filename ,'url': url_for('transformed_file',filename=filename)})
        # except:
        #     return jsonify({ "success": False })

        # return jsonify({'url': url_for('uploaded_file',filename=filename))})
        # return filename
    return render_template('upload.html')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    print (send_from_directory(app.config['UPLOADED_PHOTOS_DEST'], filename))
    return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'], filename)

@app.route('/transformed/<filename>')
def transformed_file(filename):
    print (send_from_directory(app.config['CHANGED_PHOTOS_DEST'] , filename))
    return send_from_directory(app.config['CHANGED_PHOTOS_DEST'] , filename)

class ShowResult(Resource):
    def patch(self, id):
        
        parser = reqparse.RequestParser()
        parser.add_argument("id", required=True,help="id cannot be blank!")
        parser.add_argument("contrast")
        parser.add_argument("brightness")
        parser.add_argument("threshold")
        args = parser.parse_args()
        flag = AutoGenerate(inputpath = app.config['UPLOADED_PHOTOS_DEST']+'/'+id,outputpath = app.config['CHANGED_PHOTOS_DEST']+'/'+id,threshhold = args['threshold'],brightness=args['brightness'],contrast = args['contrast'])
        
        if flag:
            response = {
            "id": id,
            "success": True,
            "url": url_for('transformed_file',filename=id)
            }
            return response, 200
        else:
            response = {
            "id": id,
            "success": False
            }
            return response, 500
    def post(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument("id", required=True,help="id cannot be blank!")
        parser.add_argument("flag")
        args = parser.parse_args()
        parser.add_argument("url")
        args = parser.parse_args()
        #send this to the machine

        return response, 201
        
        

api.add_resource(ShowResult, "/<string:id>")

if __name__ == '__main__':
	app.run(debug=True)







# UPLOAD_FOLDER = ''
# app = Flask(__name__)
# # app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in IMAGES

# @app.route('/', methods=['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#         # check if the post request has the file part
#         if 'file' not in request.files:
#             flash('No file part')
#             return redirect(request.url)
#         file = request.files['file']
#         # if user does not select file, browser also
#         # submit an empty part without filename
#         if file.filename == '':
#             flash('No selected file')
#             return redirect(request.url)
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             return redirect(url_for('uploaded_file',filename=filename))
#     return 
    
# @app.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# if __name__ == '__main__':
# 	app.run(debug=True)


