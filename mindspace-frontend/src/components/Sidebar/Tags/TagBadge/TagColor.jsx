export const TagColor = {
  colors: [
    'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'
  ],

  getColorScheme: (colorId) => {
    return colorId || 'gray';
  },

  getBg: (colorId) => {
    const color = colorId || 'gray';
    switch(color) {
      case 'red': return 'red.100';
      case 'orange': return 'orange.100';
      case 'yellow': return 'yellow.100';
      case 'green': return 'green.100';
      case 'teal': return 'teal.100';
      case 'blue': return 'blue.100';
      case 'cyan': return 'cyan.100';
      case 'purple': return 'purple.100';
      case 'pink': return 'pink.100';
      default: return 'gray.100';
    }
  },

  getColor: (colorId) => {
    const color = colorId || 'gray';
    switch(color) {
      case 'red': return 'red.800';
      case 'orange': return 'orange.800';
      case 'yellow': return 'yellow.800';
      case 'green': return 'green.800';
      case 'teal': return 'teal.800';
      case 'blue': return 'blue.800';
      case 'cyan': return 'cyan.800';
      case 'purple': return 'purple.800';
      case 'pink': return 'pink.800';
      default: return 'gray.800';
    }
  },

  getHoverBg: (colorId) => {
    const color = colorId || 'gray';
    switch(color) {
      case 'red': return 'red.200';
      case 'orange': return 'orange.200';
      case 'yellow': return 'yellow.200';
      case 'green': return 'green.200';
      case 'teal': return 'teal.200';
      case 'blue': return 'blue.200';
      case 'cyan': return 'cyan.200';
      case 'purple': return 'purple.200';
      case 'pink': return 'pink.200';
      default: return 'gray.200';
    }
  },
  getColorForTag: (tagName) => {
    const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];
    let hash = 0;
    for (let i = 0; i < tagName.length; i++) {
      hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  },
};