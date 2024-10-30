class DOMHelper {
	createHTMLElement(tagName, attributes = {}, parent = document.body, content = '', prepend = false) {
		const element = document.createElement(tagName);
		for (const key in attributes) {
			if (attributes.hasOwnProperty(key)) element.setAttribute(key, attributes[key]);
		}

		if(tagName === 'input') element.value = content
		else if (content instanceof HTMLElement) element.appendChild(content)
		else if(typeof content === 'string') {
			if(content.trim().startsWith('<svg')) element.appendChild(this.createSVGElement(content))
			else element.textContent = content
		} else element.textContent = String(content);

		if (prepend) parent.prepend(element);
		else parent.appendChild(element);

		return element;
	}

	createSVGElement(svgString) {
		const parser = new DOMParser();
		const svgDocument = parser.parseFromString(svgString, 'image/svg+xml');
		return svgDocument.documentElement;
	}

	deleteHTMLElement(elementID) {
		const element = document.getElementById(elementID);
		if(!element) return false;

		element.remove();
		return true;
	}
}
export const domHelper = new DOMHelper();