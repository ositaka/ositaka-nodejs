<?php include("header.php"); ?>

		<!-- Tours -->
        <div class="cd-slider-wrapper" id="tours">
            <ul class="cd-slider">

                <li class="is-visible">
                    <div class="cd-half-block image" id="tours-slideshow-01">
                        <div class="slideshow">
                            <div class="slideshow-item slide1"></div>
                            <div class="slideshow-item slide2"></div>
                            <div class="slideshow-item slide3"></div>
                        </div>
                    </div>
                    <div class="cd-half-block content">
                        <div>
                            <h2><i>Public Tour</i></h2>
                            <p>Lorem ipsum dolor sit amit. Repeatum tenetur aatae.</p>
                            <a class="btn-slide cd-btn cd-modal-trigger modal-open" id="tour-details-01">
                                <img src="img/book-icon.svg" /> 
                                Tour Details
                            </a>
                        </div>
                    </div>
                </li>
    
                <li>
                    <div class="cd-half-block image" id="tours-slideshow-02">
                        <div class="slideshow">
                            <div class="slideshow-item slide1"></div>
                            <div class="slideshow-item slide2"></div>
                            <div class="slideshow-item slide3"></div>
                        </div>
                    </div>
                    <div class="cd-half-block content light-bg">
                        <div>
                            <h2><i>Professional Tour</i></h2>
                            <p>Consectetur adipisicing em voluptatum tenetur on beatae.</p>
                            <a class="btn-slide cd-btn cd-modal-trigger modal-open" id="tour-details-02">
                                <img src="img/book-icon.svg" /> 
                                Tour Details
                            </a>
                        </div>
                    </div>
                </li>
    
                <li>
                    <div class="cd-half-block image" id="tours-slideshow-03">
                        <div class="slideshow">
                            <div class="slideshow-item slide1"></div>
                            <div class="slideshow-item slide2"></div>
                            <div class="slideshow-item slide3"></div>
                        </div>
                    </div>
                    <div class="cd-half-block content light-bg">
                        <div>
                            <h2><i>Custom Tour</i></h2>
                            <p>Lorem ipsum doloat. Vallam voluptatum beatae.</p>
                            <a class="btn-slide cd-btn cd-modal-trigger modal-open" id="tour-details-03">
                                <img src="img/book-icon.svg" /> 
                                Tour Details
                            </a>
                        </div>
                    </div>
                </li>

            </ul> <!-- .cd-slider -->
        </div> <!-- .cd-slider-wrapper -->

        <!-- Subscribe Newsletter -->
        <?php include("newsletter.php"); ?>

		<!-- Modalboxes -->
		<?php include("_modalbox-tour-details.php"); ?>

<?php include("footer.php"); ?>