		</div>
		<!-- /#main -->

		<div class="row no-gutters" id="footer">

			<div class="col-sm-12 col-lg-4">
				<ul class="menu-footer text-sm-center text-lg-left">
					<li><a href="#">Credits</a></li>
					<li><a href="#">Terms & Conditions</a></li>
					<li><a href="#">Be a Member</a></li>
				</ul>
			</div>
			<div class="col-sm-12 col-lg-4">
				<p class="text-center social">
					<a href="#" target="_blank" alt="Trip Advisor"><i class="fa fa-tripadvisor" aria-hidden="true"></i></a>
					<a href="#" target="_blank" alt="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
					<a href="#" target="_blank" alt="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
					<a href="#" target="_blank" alt="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
				</p>
			</div>
			<div class="col-sm-12 col-lg-4">
				<p class="text-sm-center text-lg-right">2018 © The Exotic Garden</p>
			</div>
			
		</div>

		<!-- JavaScript -->
		<script src="js/jquery-2.1.4.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
		<script src="js/jquery.mobile.custom.min.js"></script>
		<script src="js/exotic-garden.js"></script>
		<script src="js/slider.js"></script>
		<script src="js/timeline.js"></script>
		<script src="js/modalbox.js"></script>
		<script src="js/modalbox.js"></script>
		<script src="js/pignose.calendar.full.min.js"></script>
		
		<script type="text/javascript">
			$(function() {

				function onClickHandler(date, obj) {
					/**
					 * @date is an array which be included dates(clicked date at first index)
					 * @obj is an object which stored calendar interal data.
					 * @obj.calendar is an element reference.
					 * @obj.storage.activeDates is all toggled data, If you use toggle type calendar.
					 * @obj.storage.events is all events associated to this date
					 */

					var $calendar = obj.calendar;
					var $box = $calendar.parent().siblings('.box').show();
					var text = 'You choose date ';

					if(date[0] !== null) {
						text += date[0].format('YYYY-MM-DD');
					}

					if(date[0] !== null && date[1] !== null) {
						text += ' ~ ';
					} else if(date[0] === null && date[1] == null) {
						text += 'nothing';
					}

					if(date[1] !== null) {
						text += date[1].format('YYYY-MM-DD');
					}

					$box.text(text);
				}

				// Default Calendar
				$('.calendar').pignoseCalendar({
					select: onClickHandler
				});
				
			});
		</script>

	</body>
</html>