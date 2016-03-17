<?php
/**
 * @file
 * Default implementation to print out a child pages listing.
 */
?>

<!-- This HTML has a lot of nested divs to allow us to style the coloured arrows
     on the coloured-label pages. -->
<li class="child-page-outer child-page-<?php print $child_page['counter'] ?>">
  <div class="child-page colour-<?php print $child_page['colour'] ?> <?php print $child_page['class'] ?>">
    <div class="inside inside-full-height">
      <div class="child-page-title">
        <div class="child-page-title-outer">
          <div class="child-page-title-inner">
            <h3><a href="<?php print $child_page['path'] ?>"><?php print $child_page['title'] ?></a></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>
