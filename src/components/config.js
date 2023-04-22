export const config = {
  gradient1: {
    direction: 'left-right',
    // isPausedWhenNotInView: true,
    image: {
      source: 'https://zhanhongzhu.top/bg.jpg',
      position: ['center', 'bottom'],
      stretchMode: ['stretch', 'stretch-if-bigger'],
      blendingMode: 'multiply'
    },
    states: {
      'default-state': {
        gradients: [
          [
            { color: '#833ab4', pos: 0.2 },
            { color: '#fd1d1d', pos: 0.8 },
            { color: '#38ef7d', pos: 1 }
          ],
          [
            { color: '#40e0d0', pos: 0 },
            { color: '#ff8c00', pos: 0.2 },
            { color: '#ff0080', pos: 0.75 }
          ]
        ]
      }
    }
  },
  gradient2: {
    direction: 'left-right',
    opacity: [1, 1],
    // isPausedWhenNotInView: true,
    image: {
      source: 'https://zhanhongzhu.top/bg.jpg',
      position: ['center', 'bottom'],
      stretchMode: ['stretch', 'stretch-if-bigger'],
      blendingMode: 'multiply'
    },
    states: {
      'default-state': {
        gradients: [
          ['#AA076B', '#61045F'],
          ['#02AAB0', '#00CDAC'],
          ['#DA22FF', '#9733EE']
        ]
      }
    }
  },
  gradient3: {
    direction: 'left-right',
    // isPausedWhenNotInView: true,
    image: {
      source: 'https://zhanhongzhu.top/bg.jpg',
      position: ['center', 'bottom'],
      stretchMode: ['stretch', 'stretch-if-bigger'],
      blendingMode: 'multiply'
    },
    states: {
      'default-state': {
        gradients: [
          ['#ff9966', '#ff5e62'],
          ['#00F260', '#0575E6'],
          ['#e1eec3', '#f05053']
        ]
      }
    }
  },
  gradient4: {
    direction: 'top-bottom',
    // isPausedWhenNotInView: true,
    image: {
      source: 'https://zhanhongzhu.top/bg.jpg',
      position: ['center', 'bottom'],
      stretchMode: ['stretch', 'stretch-if-bigger'],
      blendingMode: 'multiply'
    },
    states: {
      'default-state': {
        gradients: [
          ['#29323c', '#485563'],
          ['#FF6B6B', '#556270'],
          ['#80d3fe', '#7ea0c4'],
          ['#f0ab51', '#eceba3']
        ],
        transitionSpeed: 7000
      }
    }
  }
}
