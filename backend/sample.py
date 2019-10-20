import json
import base64
import cv2

def NdarrayToBase64(ext, dst):
    result, dst_data = cv2.imencode(ext, dst)
    dst_base64 = base64.b64encode(dst_data)

    return dst_base64

img = cv2.imread('/Users/hirotoshi/projects/ml/HPC/opencv-samples/images/shogi.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

base64 = NdarrayToBase64('.jpg', gray)

result = {'blockId': 1, 'base64': base64.decode('utf-8')}

print(json.dumps(result))
