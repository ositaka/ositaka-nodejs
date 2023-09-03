        <form id="contact-form" method="post" action="contact-form/contact.php" role="form">

            <div class="messages"></div>

            <div class="controls">

                <h3 id="contat-form-heading">Leave your message here</h3>
                <div class="row no-gutters">
                    <div class="form-group">
                        <label class="sr-only" for="form_name">Name *</label>
                        <input id="form_name" type="text" name="name" class="form-control" placeholder="Name" required="required" data-error="Firstname is required.">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="form-group">
                        <label class="sr-only" for="form_email">Email *</label>
                        <input id="form_email" type="email" name="email" class="form-control" placeholder="E-Mail" required="required" data-error="Valid email is required.">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="form-group">
                        <label class="sr-only" for="form_phone">Phone</label>
                        <input id="form_phone" type="tel" name="phone" class="form-control" placeholder="Phone">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="form-group">
                        <label class="sr-only" for="form_message">Message *</label>
                        <textarea id="form_message" name="message" class="form-control" placeholder="How can we help you? Write here your message." rows="4" required="required" data-error="Please,leave us a message."></textarea>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="form-group">
                        <input type="submit" class="btn btn-exotic btn-send" value="Send message">
                    </div>
                </div>
            </div>

        </form>

        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="contact-form/validator.js"></script>
        <script src="contact-form/contact.js"></script>