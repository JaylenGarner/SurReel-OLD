import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    print('~~~ UPLOAD FILE TO S3 FUNCTION ~~~')
    print('~~~ BUCKET NAME ~~~', BUCKET_NAME)
    print('~~~ S3 LOCATION ~~~', S3_LOCATION)
    print('---- S3 ----', s3)

    print('FILE!', file)

    try:
        print("ATTEMPTING UPLOAD")
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            # ExtraArgs={
            #     "ACL": acl,
            #     "ContentType": file.content_type
            # }
        )
        print("COMPLETED UPLOAD")
    except Exception as e:
        print('ERROR UPLOADING')
        # in case the our s3 upload fails
        # print({"errors": str(e)}, 'ERRORS!!!!')
        return {"errors": str(e)}

    print("MADE IT PAST UPLOAD")
    print("URL!!", f"{S3_LOCATION}{file.filename}")

    return {"url": f"{S3_LOCATION}{file.filename}"}
