


export function downloadCanvasAsImage(canvas: HTMLCanvasElement, filename: string) {
		/** https://enjeck.com/blog/download-canvas-image/ */

		// Grab the canvas element
		// const canvas = document.getElementById('debug-canvas') as HTMLCanvasElement;

		/* Create a PNG image of the pixels drawn on the canvas using the toDataURL method. PNG is the preferred format since it is supported by all browsers
		 */
		let dataURL;

		if (canvas?.toDataURL) {
			dataURL = canvas?.toDataURL?.('image/png');
		}

		if (!dataURL) {
			return;
		}

		// Create a dummy link text
		const a = document.createElement('a');
		// Set the link to the image so that when clicked, the image begins downloading
		a.href = dataURL;
		// Specify the image filename
		a.download = filename;
		// Click on the link to set off download
		a.click();
	}