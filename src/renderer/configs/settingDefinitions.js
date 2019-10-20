export default {
  Input: {
    imageFileName: '',
    imageFilePath: '',
    imageData: ''
  },

  GrayScale: {},

  Binarization: {
    Binary : [
      {
        paramName: 'threshold',
        paramDefault: 127,
        paramType: 'Number',
        step: 1
      },
      {
        paramName: 'max',
        paramDefault: 255,
        paramType: 'Number',
        step: 1
      },
    ],
    ToZero: [
      {
        paramName: 'threshold',
        paramDefault: 127,
        paramType: 'Number',
        step: 1
      },
      {
        paramName: 'max',
        paramDefault: 255,
        paramType: 'Number',
        step: 1
      },
    ],
    Otsu: [
      {
        paramName: 'max',
        paramDefault: 255,
        paramType: 'Number',
        step: 1
      },
    ]
  }
}


// TODO: python 側と定義を共通化する
