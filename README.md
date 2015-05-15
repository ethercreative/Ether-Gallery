# Ether Gallery
A gallery plugin for jQuery

### Example HTML Markup
```html
<ul class="gallery">
    <li>
        <a href="image1.jpg" data-gallery="first_gallery" title="First Image">First Image</a>
        <a href="image2.jpg" data-gallery="first_gallery"><img src="image2.jpg" alt="Second Image" /></a>
        <a href="image3.jpg" data-gallery="first_gallery"><img src="image3.jpg" alt="Third Image" /></a>
        <a href="image4.jpg" data-gallery="first_gallery">Fourth Image</a>
        <a href="image5.jpg" data-gallery="first_gallery"><img src="image5.jpg" alt="Fifth Image" /></a>
        <a href="image6.jpg" data-gallery="first_gallery">Sixth Image</a>
    </li>
</ul>

<div class="gallery">
    <a href="image1.jpg" data-gallery="gallery_2">First Image</a>
    <a href="image2.jpg" data-gallery="gallery_2"><img src="image2.jpg" alt="Second Image" /></a>
    <a href="image3.jpg" data-gallery="gallery_2"><img src="image3.jpg" alt="Third Image" /></a>
    <a href="image4.jpg" data-gallery="gallery_2">Fourth Image</a>
    
    <a href="image5.jpg" data-gallery="1" title="Fifth Image"><img src="image5.jpg" alt="Fifth Image" /></a>
    <a href="image6.jpg" data-gallery="1" title="Sixth Image"></a>
    <a href="image7.jpg" data-gallery="1" title="Seventh Image"></a>
    <a href="image8.jpg" data-gallery="1" title="Eighth Image"></a>
</div>
```

### JavaScript Setup
```js
$('.gallery').etherGallery({
    keys: true, // Enables keyboard controls (left/right arrows, escape)
    swipe: true // Enables swipe controls on touch devices
});
```

### Classes
- `.egal-overlay` An overlay div
- `.egal-ul` The list
- `.egal-active` The active list item
- `.egal-prev` The previous list item
- `.egal-next` The next list item
- `.egal-after-next` All list items after the next list item


### Lazy Loading
The images are loaded in as their list item becomes the `.egal-next`. This means we only load in images as we need them.


### Todo
- Add option to toggle lazy loading on images.