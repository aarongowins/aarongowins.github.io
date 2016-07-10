/**
 * Image Differ Mode.
 * Use this class to create an Image Differ Mode instance with a
 * setup and destroy method. Used for switching between modes.
 */
class ImageDifferMode {

    /**
     * @param {Function} [setup]
     * @param {Function} [destroy]
     */
    constructor (setup, destroy) {
        if (setup) {
            this.setup = setup;
        }
        if (destroy) {
            this.destroy = destroy;
        }
    }

    /**
     * A setup method for the mode
     */
    setup () {}

    /**
     * A destroy method for the mode where it cleans up after itself
     */
    destroy () {}
}

export default ImageDifferMode;
