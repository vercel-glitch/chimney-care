/**
 * Injects Google Tag Manager or analytics scripts into document head
 * @param {string} scripts - HTML string containing script tag(s)
 * @returns {boolean} - Success status of the operation
 */
export function injectGTMScript(scripts) {
  if (typeof window === 'undefined' || !scripts?.trim()) {
    return false;
  }
  
  try {
    const container = document.createElement('div');
    container.innerHTML = scripts;
    
    const scriptElements = container.querySelectorAll('script');
    
    if (scriptElements.length === 0) {
      console.error('No script elements found in the provided script');
      return false;
    }
    
    scriptElements.forEach(scriptEl => {
      const script = document.createElement('script');
      
      // Copy all attributes (src, async, etc.)
      Array.from(scriptEl.attributes).forEach(attr => {
        script.setAttribute(attr.name, attr.value);
      });
      
      // Copy inline script content if present
      if (scriptEl.textContent) {
        script.textContent = scriptEl.textContent;
      }
      
      document.head.appendChild(script);
    });
    
    return true;
  } catch (error) {
    console.error('Error injecting scripts:', error);
    return false;
  }
}

/**
 * Injects Google Tag Manager noscript element into document body
 * @param {string} bodyScript - HTML string containing noscript tag
 * @returns {boolean} - Success status of the operation
 */
export function injectGTMBodyScript(bodyScript) {
  if (typeof window === 'undefined' || !bodyScript?.trim()) {
    return false;
  }
  
  try {
    const container = document.createElement('div');
    container.innerHTML = bodyScript;
    
    const noscriptElement = container.querySelector('noscript');
    
    if (!noscriptElement) {
      console.error('No noscript element found in the provided body script');
      return false;
    }
    
    const noscript = document.createElement('noscript');
    noscript.innerHTML = noscriptElement.innerHTML;
    
    document.body.appendChild(noscript);
    return true;
  } catch (error) {
    console.error('Error injecting body script:', error);
    return false;
  }
}
