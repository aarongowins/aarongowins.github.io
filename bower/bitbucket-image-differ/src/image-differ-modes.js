/**
 * An enum of diffing modes - different ways to diff an image
 * @readonly
 * @enum {string}
 */
export default {
    /**
     * Display the images side by side for visual comparison
     */
    TWO_UP: 'two-up',
    /**
     * Blend the images together, using a slider to change the relative opacity of each image.
     */
    BLEND: 'blend',
    /**
     * Split the images vertically showing the old image on one side and the new image on the other.
     * Mouse position determines where the vertical split occurs.
     */
    SPLIT: 'split',
    /**
     * Combines the two images to calculate which pixels have changed between versions.
     * Shows changed pixels.
     */
    PIXEL_DIFF: 'pixeldiff'
};