import json
import base64
import cv2
import sys
import os


def ndarray_to_base64(ext, dst):
    res, data = cv2.imencode(ext, dst)
    data_base64 = base64.b64encode(data).decode('utf-8')
    return data_base64


def grayscale(ext, img):
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray_base64 = ndarray_to_base64(ext, gray)
    return gray, gray_base64


def binarization(ext, img, detail_process='Binary', threshold=127, max=255):
    cv2_process = {
        'Binary': cv2.THRESH_BINARY,
        'ToZero': cv2.THRESH_TOZERO,
        'Otsu': cv2.THRESH_OTSU
    }
    b_process = cv2_process[detail_process]
    ret, binary = cv2.threshold(img, threshold, max, b_process)

    binary_base64 = ndarray_to_base64(ext, binary)
    return binary, binary_base64

# TODO: pipeline Parser -> Class


args = sys.argv
pipelineInfoString = args[1]
pipelineInfo = json.loads(pipelineInfoString)


imageFilePath = pipelineInfo.get('imageFilePath')

resultHeader = {'code': '000'}
# print(json.dumps(result))
if imageFilePath is None:
    resultHeader['code'] = '001'
    result = {'header': resultHeader}
    print(json.dumps(result))
else:
    result = {'resultList': []}
    inputImg = cv2.imread(imageFilePath)
    img = inputImg

    p, ext = os.path.splitext(imageFilePath)

    for process in pipelineInfo.get('pipeline'):
        pId = process['processId']
        if pId == 1:
            img, b64 = grayscale(ext, img)
            # b64 = 'data:image/jpeg;base64,' + b64
            this_result = {'blockId': process['blockId'], 'base64': b64}
            result['resultList'].append(this_result)

        if pId == 2:
            # parameters
            img, b64 = binarization(ext, img)
            # b64 = 'data:image/jpeg;base64,' + b64
            this_result = {'blockId': process['blockId'], 'base64': b64}
            result['resultList'].append(this_result)

        else:
            pass

    result['header'] = resultHeader
    print(json.dumps(result))
