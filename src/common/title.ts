interface Element {
    href?: string;
  }
  const defaultLink: Element = {
    href: '',
  };
  /**
   * 修改网站Favicon 
   * @param newIconPath Favicon 地址
   */
  export function changeFavicon(newIconPath: string) {
    if (!newIconPath) {
      return false;
    }
    let link: Element = defaultLink;
    link = document.querySelector('link[rel="shortcut icon"]') as Element;
    if (link && link.href) {
      link.href = newIconPath;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'shortcut icon';
      newLink.href = newIconPath;
      document.head.appendChild(newLink);
    }
  }
  /**
   * 修改网站标题
   * @param title
   */
//   icon: string
  export function changeTitle(title: string) {
    if (title) {
      document.title = title;
    }
    // if (icon) {
    //   changeFavicon(icon);
    // }
  }
  
  