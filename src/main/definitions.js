export let processDefinitions = [
  {
    processId: 0,
    label: '画像ファイル入力',
    name: 'Input',
    icon: 'In',
    parameters: {
      imageFilePath: '',
      imageData: '',
    }
  },
  {
    processId: 1,
    label: 'グレースケール',
    name: 'GrayScale',
    icon: 'GS'
  },
  {
    processId: 2,
    label: '二値化',
    name: 'Binarization',
    icon: 'Bi',
    parameters: [
      {
        parameterName: 'threshold',
        parameterType: 'Number', // Numberの場合、max, min, step を決めたほうがよいか
        parameterValue: 0.1
      }
    ]
  },
  {
    processId: 3,
    label: 'ガウシアンフィルタ',
    name: 'GaussianFilter',
    icon: 'GF'
  },
  {
    processId: 4,
    label: 'プーリング',
    name: 'Pooling',
    icon: 'Po'
  }
]
