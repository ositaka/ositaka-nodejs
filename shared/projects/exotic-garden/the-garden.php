<?php include("header.php"); ?>

		<!--Garden Slider -->
		<div class="row no-gutters" id="garden-slider">
			<div class="slideshow">
				<div class="slideshow-item slide1"></div>
				<div class="slideshow-item slide2"></div>
				<div class="slideshow-item slide3"></div>
				<div class="slideshow-item top vertical-center col-sm-8 offset-sm-2 col-md-6 offset-md-3">
					<div id="intro-content">
						<h1>The Garden</h1>
					</div>
				</div>
			</div>
		</div>

        <!-- Events -->
        <div class="row no-gutters" id="events">
			<h3><img src="img/book-icon-black.svg" style="width: 36px; margin-right: 15px; margin-top: -8px;" /> Past Events</h3>
			<?php include("events.php"); ?>
        </div>

        <!-- Subscribe Newsletter -->
        <?php include("newsletter.php"); ?>

<?php include("footer.php"); ?>